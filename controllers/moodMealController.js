const fs = require("fs");
const path = require("path");
const db = require("../config/db");

//desc                  GET a recipe
//route                 /api/v1/recipe
//access                Public

exports.getRecipe = (req, res, next) => {
  const mood = req.params.mood;
  const query = `SELECT * FROM recipes WHERE mood = ?;`;
  try {
    db.all(query, [mood], (err, rows) => {
      if (!rows) {
        res.status(200).json({
          success: true,
          message: "emptydb",
        });
      }
      res.json(rows);
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
