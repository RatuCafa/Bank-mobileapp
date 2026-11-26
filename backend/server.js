const express = require("express");
const cors = require("cors");
const path = require("path");

// Load .env baik saat dijalankan dari root maupun folder backend/
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(cors({
  origin: "http://localhost:8081"
}));

app.use(express.json());

const ALLRATES_API = process.env.ALLRATES_API || process.env.API_KEY;
const FINLIGHT_API_KEY =
  process.env.NEWS_FINLIGHT_API ||
  process.env.NEWS_FINFLIGHT_API;

// Endpoint mengambil beberapa nilai kurs
app.get("/api/rates", async (req, res) => {
  try {
    const source = (req.query.source || "USD").toUpperCase();
    const targets = (req.query.targets || "IDR,EUR,JPY")
      .split(",")
      .map(code => code.trim().toUpperCase());

    if (!/^[A-Z]{3}$/.test(source) ||
        targets.some(code => !/^[A-Z]{3}$/.test(code))) {
      return res.status(400).json({
        error: "Kode mata uang tidak valid"
      });
    }

    const results = await Promise.all(
      targets.map(async (target) => {
        if (target === source) return null;

        const url = new URL(
          "https://allratestoday.com/api/v1/rates"
        );

        url.searchParams.set("source", source);
        url.searchParams.set("target", target);
        url.searchParams.set("api_key", ALLRATES_API);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`API ${target}: HTTP ${response.status}`);
        }

        const data = await response.json();

        // Respons API berbentuk array
        const item = Array.isArray(data) ? data[0] : data;

        if (!item || !Number.isFinite(Number(item.rate))) {
          return null;
        }

        return {
          source: item.source || source,
          target: item.target || target,
          rate: Number(item.rate),
          time: item.time
        };
      })
    );

    const validRates = results.filter(Boolean);

    res.json(validRates);

  } catch (error) {
    console.error("Error:", error.message);

    res.status(500).json({
      error: "Gagal mengambil data nilai tukar"
    });
  }
});

// Endpoint mengambil berita finansial (Finlight v2)
app.get("/api/news", async (req, res) => {
  try {
    if (!FINLIGHT_API_KEY) {
      return res.status(500).json({
        error: "Server configuration error: NEWS_FINLIGHT_API environment variable is not set.",
      });
    }

    const query = (req.query.query || "market").toString();
    const pageSize = Math.min(Math.max(Number(req.query.pageSize) || 10, 1), 100);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const language = (req.query.language || "en").toString();
    const order = (req.query.order || "DESC").toString().toUpperCase() === "ASC" ? "ASC" : "DESC";

    const response = await fetch("https://api.finlight.me/v2/articles", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": FINLIGHT_API_KEY,
      },
      body: JSON.stringify({
        query,
        language,
        order,
        pageSize,
        page,
      }),
    });

    if (!response.ok) {
      let errorDetails = `HTTP ${response.status}`;
      try {
        const errJson = await response.json();
        errorDetails = errJson.message || errJson.error || errorDetails;
      } catch (_) {}

      return res.status(response.status).json({
        error: `Finlight API error: ${errorDetails}`,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching financial news:", error.message);
    res.status(500).json({
      error: "Gagal mengambil data berita finansial",
    });
  }
});

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Backend berjalan di port 3000");
});
