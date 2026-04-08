import React, { useRef, useEffect, useState } from 'react';

function AudioPlayer() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Уменьшаем громкость
      audio.muted = isMuted;
      audio.play().catch(e => console.log("Автовоспроизведение заблокировано", e));
      
      // Возобновляем при клике, если воспроизведение было заблокировано
      const handleInteraction = () => {
        audio.play().catch(e => console.log("Воспроизведение не удалось", e));
      };
      document.addEventListener('click', handleInteraction, { once: true });
      
      return () => {
        document.removeEventListener('click', handleInteraction);
      };
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
      <button
        onClick={toggleMute}
        style={{
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
      <audio ref={audioRef} loop>
        <source src="/Music/XKJXWJ4jVXL8X30vvA8m-H-7WqoFnEAg.mp3" type="audio/mpeg" />
        Ваш браузер не поддерживает аудио.
      </audio>
    </div>
  );
}

export default AudioPlayer;