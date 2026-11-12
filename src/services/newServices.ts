// File: src/services/newServices.ts
import { NewsResponse } from "../types/news";

// Ganti dengan API Key dari dashboard finlight Anda (sebaiknya simpan di .env)
const API_KEY = "sk_7f4b49410f25b5b8695d2ab811a5e137cd3ba5753d075b2e1fda329073c5e01c";

export function getFinancialNews(query: string = "market", pageSize: number = 10): Promise<NewsResponse> {
  return new Promise((resolve, reject) => {
    const url = "https://api.finlight.me/v2/articles";

    fetch(url, {
      method: "POST", // finlight v2 wajib menggunakan metode POST
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY, // Header autentikasi wajib
      },
      body: JSON.stringify({
        query: query,       // Kata kunci pencarian (misal: "NVDA", "crypto", "economy")
        language: "en",     // Filter bahasa Inggris
        order: "DESC",      // Urutkan dari berita terbaru
        pageSize: pageSize, // Jumlah berita yang diambil (maksimal 100)
        page: 1
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject(`Gagal mengambil data dari server (Status: ${response.status}).`);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        reject("Terjadi kesalahan jaringan.");
      });
  });
}
