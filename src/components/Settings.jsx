import React from 'react';

function Settings() {
  const resetGame = () => {
    if (window.confirm('Are you sure you want to reset your progress?')) {
      localStorage.removeItem('spidi-clicker');
      window.location.reload();
    }
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <button onClick={resetGame} className="reset-btn">
        Reset Progress
      </button>
    </div>
  );
}

export default Settings;