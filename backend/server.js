const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const USDA_API_KEY = "2NNBrpjZhuGdXhx98EnbZaNsTBTqG5F6SX8OsmtT";

const MEALS = {
  muscle: "chicken breast",
  fatloss: "grilled chicken salad",
  balanced: "chicken rice bowl"
};

app.get("/meal", async (req, res) => {
  const goal = req.query.goal || "balanced";
  const query = MEALS[goal];

  try {
    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${USDA_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, pageSize: 1 })
      }
    );

    const data = await response.json();
    const food = data.foods[0];

    const nutrients = {};
    food.foodNutrients.forEach(n => {
      nutrients[n.nutrientName] = n.value;
    });

    res.json({
      name: food.description,
      calories: nutrients["Energy"],
      protein: nutrients["Protein"]
    });
  } catch (err) {
    res.status(500).json({ error: "USDA fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
