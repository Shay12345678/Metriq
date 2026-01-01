const express = require("express");
const app = express();
const PORT = 3000;

app.get("/meal", (req, res) => {
  res.json({
    name: "Chicken Burrito Bowl",
    calories: 650,
    protein: 45
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
