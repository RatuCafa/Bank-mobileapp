
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:8081"
}));

app.use(express.json());

const API_KEY = process.env.API_KEY;

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
        url.searchParams.set("api_key", API_KEY);

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

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Backend berjalan di port 3000");
});
