const express = require("express");
const morgan = require("morgan");
const Recipie = require("./routes/moodMeal");
const dotenv = require("dotenv");
const colors = require("colors");
const db = require("./config/db");

dotenv.config({ path: "./config/config.env" });

const app = express();
const port = process.env.PORT || 3030;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Serve static files
app.use(express.static("public"));

// API endpoint to get recipes by mood
app.use("/api/v1/recipes/", Recipie);

app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} on http://localhost:${process.env.PORT}`
      .yellow.bold,
  ),
);
