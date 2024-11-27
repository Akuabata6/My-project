import React from 'react';

const RecipeDisplay = ({ recipe, onNewRecipe }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-display">
      <h2>{recipe.name}</h2>
      
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>

      <button onClick={onNewRecipe} className="new-recipe-button">
        Try Another Recipe
      </button>
    </div>
  );
};

export default RecipeDisplay; 