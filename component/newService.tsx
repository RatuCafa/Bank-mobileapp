import { NewsResponse } from "../types";

const API_KEY = "API KEY";

export function getFinancialNews(
  query: string = "market",
  pageSize: number = 10,
): Promise<NewsResponse> {
  return new Promise((resolve, reject) => {
    const url = "https://api.finlight.me/v2/articles";

    fetch(url, {
      method: "POST", // finlight v2 wajib menggunakan metode POST
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY, // Header autentikasi wajib
      },
      body: JSON.stringify({
        query: query, // Kata kunci pencarian (misal: "NVDA", "crypto", "economy")
        language: "en", // Filter bahasa Inggris
        order: "DESC", // Urutkan dari berita terbaru
        pageSize: pageSize, // Jumlah berita yang diambil (maksimal 100)
        page: 1,
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject(
            `Gagal mengambil data dari server (Status: ${response.status}).`,
          );
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        reject("Terjadi kesalahan jaringan.");
      });
  });
}