const fs = require("fs");
const path = require("path");
const db = require("../config/db");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

//desc                  GET a recipe
//route                 /api/v1/recipe
//access                Public

exports.getRecipe = asyncHandler(async (req, res, next) => {
  const mood = req.params.mood;
  const query = `SELECT * FROM recipes WHERE mood = ?;`;
  db.all(query, [mood], (err, rows) => {
    if (!rows) {
      return next(
        new ErrorResponse(
          `Recipe not found with id of ${req.params.mood}`,
          404,
        ),
      );
    }
    res.status(200).json({
      success: true,
      data: rows,
    });
  });
});
