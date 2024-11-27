const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Create/connect to SQLite database
const db = new sqlite3.Database('./database/recipes.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the recipes database.');
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mood TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL
  )`);

  // Insert some initial data if table is empty
  db.get("SELECT COUNT(*) as count FROM recipes", [], (err, row) => {
    if (row.count === 0) {
      const initialRecipes = [
        ['Colorful African Salad(Abacha)', 'happy', 'Raw cassava, garden eggs, ugba, titus fish, ogiri, ehuru, omuanya, crayfish, Palm oil', 'Mix all ingredients in a bowl. Add your favorite dressing!'],
        ['Cold watermelon juice', 'happy', 'Watermelon, Ice', 'Blend watermelon, add ice and serve.'],
        ['Nigerian Fried Rice', 'sad', 'Basmati rice, Chicken, Onions, Carrots, Green peas', 'Cook rice, make sauce, combine and cook on low heat covered with foil then serve.'],
        ['Sweet pineapple juice', 'sad', 'fresh ripe pineapple, Ice', 'Blend pineapple, add ice and serve.'],
        ['Calming Chamomile Tea Cake', 'stressed', 'Flour, Chamomile tea bags, Honey, Butter, Eggs', 'Infuse milk with tea, mix ingredients, bake for 25 minutes.'],
        ['Lavender Shortbread', 'stressed', 'Butter, Sugar, Flour, Dried lavender, Vanilla', 'Mix ingredients, chill dough, cut shapes, bake until golden.'],
        ['Power Protein Bowl', 'energetic', 'Quinoa, Grilled chicken, Kale, Sweet potato, Almonds', 'Cook quinoa, grill chicken, combine with vegetables and nuts.'],
        ['Energy Balls', 'energetic', 'Dates, Oats, Peanut butter, Chia seeds, Dark chocolate', 'Blend ingredients, form balls, chill for 30 minutes.']
      ];

      const stmt = db.prepare('INSERT INTO recipes (name, mood, ingredients, instructions) VALUES (?, ?, ?, ?)');
      initialRecipes.forEach(recipe => stmt.run(recipe));
      stmt.finalize();
    }
  });
});

// Serve static files
app.use(express.static('public'));

// API endpoint to get recipes by mood
app.get('/api/recipes/:mood', (req, res) => {
  const mood = req.params.mood;
  db.all('SELECT * FROM recipes WHERE mood = ?', [mood], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 