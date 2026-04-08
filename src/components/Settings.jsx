import React from 'react';

function Settings({ maps, backgroundIndex, setBackgroundIndex }) {
  return (
    <div className="settings">
      <h2>⚙️ Settings</h2>

      {/* Смена фона */}
      <div>
        <p><strong>Select Background:</strong></p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginTop: '10px'
        }}>
          {maps.map((map, index) => (
            <button
              key={index}
              onClick={() => setBackgroundIndex(index)}
              style={{
                padding: 0,
                border: backgroundIndex === index ? '3px solid #ff6b6b' : '1px solid #444',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                height: '60px',
                background: 'none',
                opacity: backgroundIndex === index ? 1 : 0.7,
                transform: backgroundIndex === index ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.2s ease'
              }}
              aria-label={`Select background ${index + 1}`}
            >
              <img
                src={map}
                alt={`Background ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Кнопка сброса (по желанию) */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to reset all
