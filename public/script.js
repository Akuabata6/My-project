let currentMood = null;
let currentRecipes = [];
let currentRecipeIndex = 0;

document.querySelectorAll(".mood-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    currentMood = button.dataset.mood;
    const response = await fetch(`/api/v1/recipes/${currentMood}`);
    currentRecipes = await response.json();
    currentRecipeIndex = 0;
    displayRecipe();
  });
});

document.getElementById("new-recipe").addEventListener("click", () => {
  currentRecipeIndex = (currentRecipeIndex + 1) % currentRecipes.length;
  displayRecipe();
});

function displayRecipe() {
  const recipe = currentRecipes[currentRecipeIndex];
  const recipeDisplay = document.getElementById("recipe-display");

  if (recipe) {
    document.getElementById("recipe-name").textContent = recipe.name;
    document.getElementById("ingredients-list").innerHTML = recipe.ingredients
      .split(",")
      .map((i) => `<li>${i.trim()}</li>`)
      .join("");
    document.getElementById("instructions").textContent = recipe.instructions;
    recipeDisplay.classList.remove("hidden");
  }
}

document
  .getElementById("add-recipe-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const recipe = {
      name: formData.get("name"),
      mood: formData.get("mood"),
      ingredients: formData.get("ingredients"),
      instructions: formData.get("instructions"),
    };

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        alert("Recipe added successfully!");
        e.target.reset();
      } else {
        alert("Failed to add recipe");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding recipe");
    }
  });
