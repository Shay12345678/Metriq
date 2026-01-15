const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const USDA_API_KEY = "2NNBrpjZhuGdXhx98EnbZaNsTBTqG5F6SX8OsmtT";

// Search endpoint
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Query required" });

  try {
    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${USDA_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, pageSize: 10 })
      }
    );

    const data = await response.json();
    const foods = (data.foods || []).map((f) => ({
      id: f.fdcId,
      name: f.description,
      nutrients: f.foodNutrients.map((n) => ({
        name: n.nutrientName,
        value: n.value,
        unit: n.unitName,
      })),
    }));

    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "USDA fetch failed" });
  }
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
