import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/atc-price", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.hibt0.com/open-api/v1/market/ticker/price",
      {
        params: { symbol: "ATC/USDT" },
        headers: {
          "User-Agent": "Mozilla/5.0"
        },
        timeout: 5000
      }
    );

    res.json({
      success: true,
      price: response.data.data.tickerPrice,
      symbol: "ATC/USDT",
      source: "Hibt Spot",
      time: Date.now()
    });

  } catch (error) {
    console.error("HIBT ERROR:", error.response?.status, error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch ATC price",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
