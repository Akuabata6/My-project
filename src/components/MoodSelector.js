import React from 'react';

const MoodSelector = ({ onMoodSelect }) => {
  const moods = ['happy', 'sad', 'stressed', 'energetic'];

  return (
    <div className="mood-selector">
      <h2>How are you feeling today?</h2>
      <div className="mood-buttons">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => onMoodSelect(mood)}
            className="mood-button"
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector; 