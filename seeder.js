const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const color = require("colors");

//Initialize the database
const db = new sqlite3.Database("./database/recipes.db");

//seed the database with initial recipes from the json file
const seedDatabase = () => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./_data/Recipe.json"), "utf-8"),
  );
  const stmt = db.prepare(
    "INSERT INTO recipes (name, mood, ingredients, instructions) VALUES (?, ?, ?, ?)",
  );
  data.forEach((recipe) => {
    stmt.run(recipe.name, recipe.mood, recipe.ingredients, recipe.instructions);
  });
  stmt.finalize(() => {
    console.log("Database imported successfully".green.inverse);
    db.close();
  });
};

//create the table if it doesnt exit
const createTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mood TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL
);`;
  db.run(query, (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
      return;
    }
    seedDatabase();
  });
};

createTable();
