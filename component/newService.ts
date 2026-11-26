import type { NewsResponse, Article } from "../types";

export interface GetFinancialNewsOptions {
  query?: string;
  pageSize?: number;
  page?: number;
  language?: string;
  order?: "ASC" | "DESC";
  apiKey?: string;
  useBackend?: boolean;
  backendUrl?: string;
  timeoutMs?: number;
}

const FINLIGHT_API_URL = "https://api.finlight.me/v2/articles";

/**
 * Normalisasi URL backend:
 * Menambahkan skema http:// jika belum ada, serta membuang trailing slash.
 */
function normalizeBackendUrl(rawUrl?: string): string {
  const url = (
    rawUrl ||
    (typeof process !== "undefined" && process.env
      ? process.env.EXPO_PUBLIC_BACKEND_URL || process.env.BACKEND_URL
      : "") ||
    "http://127.0.0.1:3000"
  ).trim();

  const withProtocol = /^https?:\/\//i.test(url) ? url : `http://${url}`;
  return withProtocol.replace(/\/+$/, "");
}

/**
 * Mengambil API key dari options atau environment variables native (Node / Expo).
 * Tidak ada hardcoded API key.
 */
function resolveApiKey(customApiKey?: string): string {
  if (customApiKey && customApiKey.trim()) {
    return customApiKey.trim();
  }

  if (typeof process !== "undefined" && process.env) {
    const envKey =
      process.env.NEWS_FINLIGHT_API ||
      process.env.EXPO_PUBLIC_NEWS_FINLIGHT_API ||
      process.env.NEWS_FINFLIGHT_API ||
      process.env.EXPO_PUBLIC_NEWS_FINFLIGHT_API;

    if (envKey && envKey.trim()) {
      return envKey.trim();
    }
  }

  return "";
}

/**
 * Fetcher khusus backend server (/api/news).
 * Jika useBackend ditentukan, pemanggilan dilakukan HANYA ke backend tanpa fallback silang.
 */
async function fetchFromBackend(
  options: {
    query: string;
    pageSize: number;
    page: number;
    language: string;
    order: "ASC" | "DESC";
    backendUrl: string;
    timeoutMs: number;
  },
): Promise<NewsResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs);

  try {
    const url = new URL(`${options.backendUrl}/api/news`);
    url.searchParams.set("query", options.query);
    url.searchParams.set("pageSize", options.pageSize.toString());
    url.searchParams.set("page", options.page.toString());
    url.searchParams.set("language", options.language);
    url.searchParams.set("order", options.order);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      let serverError = `HTTP ${response.status} ${response.statusText}`;
      try {
        const errorJson = await response.json();
        if (errorJson && typeof errorJson === "object") {
          serverError = errorJson.error || errorJson.message || serverError;
        }
      } catch {
        // Biarkan pesan status bawaan
      }
      throw new Error(`Backend server error: ${serverError}`);
    }

    const data: NewsResponse = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(`Permintaan ke backend timeout setelah ${options.timeoutMs}ms.`);
    }
    throw error instanceof Error
      ? error
      : new Error("Gagal mengambil berita finansial dari backend.");
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetcher langsung ke Finlight API v2.
 */
async function fetchFromFinlight(
  options: {
    query: string;
    pageSize: number;
    page: number;
    language: string;
    order: "ASC" | "DESC";
    apiKey: string;
    timeoutMs: number;
  },
): Promise<NewsResponse> {
  if (!options.apiKey) {
    throw new Error(
      "Finlight API key belum dikonfigurasi. Pastikan variabel NEWS_FINLIGHT_API atau EXPO_PUBLIC_NEWS_FINLIGHT_API telah diatur di file .env.",
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs);

  try {
    const response = await fetch(FINLIGHT_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": options.apiKey,
      },
      body: JSON.stringify({
        query: options.query,
        language: options.language,
        order: options.order,
        pageSize: options.pageSize,
        page: options.page,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      let errorMsg = `HTTP ${response.status} ${response.statusText}`;
      try {
        const errJson = await response.json();
        if (errJson && typeof errJson === "object") {
          errorMsg = errJson.message || errJson.error || errorMsg;
        }
      } catch {
        // Fallback status
      }
      throw new Error(`Finlight API error: ${errorMsg}`);
    }

    const data: NewsResponse = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(`Permintaan ke Finlight API timeout setelah ${options.timeoutMs}ms.`);
    }
    throw error instanceof Error
      ? error
      : new Error("Terjadi kesalahan jaringan saat mengambil berita finansial.");
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Mengambil berita finansial terkini.
 * Mendukung pemanggilan client-side (langsung Finlight) maupun server-side / via backend.
 *
 * @param queryOrOptions Kata kunci pencarian ATAU options object (GetFinancialNewsOptions)
 * @param pageSize Jumlah artikel per halaman (default: 10)
 * @param page Nomor halaman (default: 1)
 * @param apiKey Kunci API kustom (opsional)
 */
export async function getFinancialNews(
  queryOrOptions: string | GetFinancialNewsOptions = "market",
  pageSize: number = 10,
  page: number = 1,
  apiKey?: string,
): Promise<NewsResponse> {
  const isOptionsObject =
    typeof queryOrOptions === "object" && queryOrOptions !== null;

  const resolvedQuery = isOptionsObject
    ? queryOrOptions.query ?? "market"
    : queryOrOptions || "market";

  const resolvedPageSize = isOptionsObject
    ? queryOrOptions.pageSize ?? 10
    : pageSize;

  const resolvedPage = isOptionsObject
    ? queryOrOptions.page ?? 1
    : page;

  const resolvedLanguage = isOptionsObject
    ? queryOrOptions.language ?? "en"
    : "en";

  const resolvedOrder = isOptionsObject
    ? queryOrOptions.order ?? "DESC"
    : "DESC";

  const resolvedTimeoutMs = isOptionsObject
    ? queryOrOptions.timeoutMs ?? 10000
    : 10000;

  const useBackend = isOptionsObject ? !!queryOrOptions.useBackend : true;

  // Jika useBackend aktif, arahkan seluruh permintaan HANYA ke backend
  if (useBackend) {
    const backendUrl = normalizeBackendUrl(
      isOptionsObject ? queryOrOptions.backendUrl : undefined,
    );
    return fetchFromBackend({
      query: resolvedQuery,
      pageSize: resolvedPageSize,
      page: resolvedPage,
      language: resolvedLanguage,
      order: resolvedOrder,
      backendUrl,
      timeoutMs: resolvedTimeoutMs,
    });
  }

  // Jika tidak menggunakan backend, fetch langsung ke Finlight API
  const resolvedApiKey = resolveApiKey(
    isOptionsObject ? queryOrOptions.apiKey : apiKey,
  );

  return fetchFromFinlight({
    query: resolvedQuery,
    pageSize: resolvedPageSize,
    page: resolvedPage,
    language: resolvedLanguage,
    order: resolvedOrder,
    apiKey: resolvedApiKey,
    timeoutMs: resolvedTimeoutMs,
  });
}
