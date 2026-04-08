import React, { useState } from 'react';

function Clicker({ onClick }) {
  const [clickEffect, setClickEffect] = useState(null);
  const [animation, setAnimation] = useState(false);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setClickEffect({ x, y, id: Date.now() });
    setAnimation(true);

    onClick();

    setTimeout(() => setAnimation(false), 100);
  };

  return (
    <div className="clicker-container">
      <button
        className={`clicker-button ${animation ? 'scale-90' : ''}`}
        onClick={handleClick}
        style={{
          backgroundImage: `url('https://imgfy.ru/ib/qfhH92yeYwxMxoP_1775668449.webp')`,
          backgroundSize: 'cover',
          border: 'none',
          color: 'transparent'
        }}
        aria-label="Click me!"
      >
        Click!
      </button>

      {clickEffect && (
        <div
          className="click-effect"
          style={{
            left: `${clickEffect.x}px`,
            top: `${clickEffect.y}px`
          }}
          key={clickEffect.id}
        >
          +{1}
        </div>
      )}
    </div>
  );
}

export default Clicker;
