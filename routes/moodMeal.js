const express = require("express");
const router = express.Router();
const { getRecipe } = require("../controllers/moodMealController");

router.route("/:mood").get(getRecipe);

module.exports = router;
