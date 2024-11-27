import React, { useState } from 'react';
import MoodSelector from './components/MoodSelector';
import RecipeDisplay from './components/RecipeDisplay';
import { recipes } from './data/recipes';
import './App.css';

function App() {
  const [currentMood, setCurrentMood] = useState(null);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const handleMoodSelect = (mood) => {
    setCurrentMood(mood);
    setCurrentRecipeIndex(0);
  };

  const handleNewRecipe = () => {
    setCurrentRecipeIndex((prevIndex) => 
      (prevIndex + 1) % recipes[currentMood].length
    );
  };

  return (
    <div className="App">
      <h1>Mood Food</h1>
      <MoodSelector onMoodSelect={handleMoodSelect} />
      {currentMood && (
        <RecipeDisplay
          recipe={recipes[currentMood][currentRecipeIndex]}
          onNewRecipe={handleNewRecipe}
        />
      )}
    </div>
  );
}

export default App; 