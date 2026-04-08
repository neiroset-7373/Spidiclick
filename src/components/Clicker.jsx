import React, { useState } from 'react';

function Clicker({ onClick }) {
  const [animation, setAnimation] = useState('');
  const [showEffect, setShowEffect] = useState(false);
  const [effectValue, setEffectValue] = useState(0);

  const handleClick = () => {
    setAnimation('scale-90');
    setTimeout(() => setAnimation(''), 100);

    const value = Math.random() < 0.2 ? 5 : 1;
    setEffectValue(value);
    setShowEffect(true);
    setTimeout(() => setShowEffect(false), 800);

    onClick();
  };

  return (
    <div className="clicker-container">
      {showEffect && (
        <div className="click-effect">+{effectValue}</div>
      )}
      <button
        className={`clicker-button ${animation}`}
        onClick={handleClick}
        aria-label="Click to earn points"
      >
        <img src="/Spidi_photo/Spidi_click.jpg" alt="Spidi Click" style="width: 100px; height: 100px;" />
      </button>
    </div>
  );
}

export default Clicker;