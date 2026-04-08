import React, { useState, useEffect } from 'react';
import Clicker from '../components/Clicker';
import Upgrades from '../components/Upgrades';
import Stats from '../components/Stats';
import Settings from '../components/Settings';
import AudioPlayer from '../components/AudioPlayer';
import '../styles/main.css';

// Список всех карт
const MAPS = [
  '/Spidi_photo/Maps/372678d4-ab5e-49c2-855c-a45234de13ee.png',
  '/Spidi_photo/Maps/67cdf8b2-6750-4fb1-bdaf-667528c2650e.png',
  '/Spidi_photo/Maps/ad927475-06b8-4e7b-8081-46d9554e9e20.png',
  '/Spidi_photo/Maps/b5369044-6fdf-431b-9bbe-f9c74efca694.png',
  '/Spidi_photo/Maps/c40598d3-b021-4dc3-ad14-1edb6de1e6d4.png',
  '/Spidi_photo/Maps/c7942eda-721c-46d0-b87f-7291c0d32314.png',
  '/Spidi_photo/Maps/d6d46483-20cd-467b-896c-567dab904f11.png',
  '/Spidi_photo/Maps/dc16ccab-6170-450e-9663-5bd075093e57.png',
  '/Spidi_photo/Maps/ea8fec50-6128-409c-bd85-0e02f33141c9.png',
  '/Spidi_photo/Maps/f07d6849-89f7-4000-94a5-42e27605be99.png'
];

function App() {
  const [points, setPoints] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [criticalChance, setCriticalChance] = useState(0.05);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [backgroundIndex, setBackgroundIndex] = useState(0); // индекс активной карты

  // Загрузка сохранённых данных
  useEffect(() => {
    const saved = localStorage.getItem('spidi-clicker');
    if (saved) {
      const data = JSON.parse(saved);
      setPoints(data.points || 0);
      setClickPower(data.clickPower || 1);
      setAutoClickers(data.autoClickers || 0);
      setCriticalChance(data.criticalChance || 0.05);
      setTotalClicks(data.totalClicks || 0);
      setTotalEarned(data.totalEarned || 0);
    }

    const savedBg = localStorage.getItem('spidi-background');
    if (savedBg !== null) {
      const index = parseInt(savedBg, 10);
      if (!isNaN(index) && index >= 0 && index < MAPS.length) {
        setBackgroundIndex(index);
      }
    }
  }, []);

  // Сохранение прогресса
  useEffect(() => {
    localStorage.setItem('spidi-clicker', JSON.stringify({
      points, clickPower, autoClickers, criticalChance, totalClicks, totalEarned
    }));
  }, [points, clickPower, autoClickers, criticalChance, totalClicks, totalEarned]);

  // Сохранение фона
  useEffect(() => {
    localStorage.setItem('spidi-background', backgroundIndex.toString());
  }, [backgroundIndex]);

  // Авто-клик
  useEffect(() => {
    if (autoClickers > 0) {
      const interval = setInterval(() => {
        const earned = autoClickers * clickPower;
        setPoints(prev => prev + earned);
        setTotalEarned(prev => prev + earned);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClickers, clickPower]);

  const handleClick = () => {
    let earned = clickPower;
    if (Math.random() < criticalChance) earned *= 3;
    setPoints(prev => prev + earned);
    setTotalEarned(prev => prev + earned);
    setTotalClicks(prev => prev + 1);
  };

  return (
    <div className="app-wrapper" style={{
      backgroundImage: `url(${MAPS[backgroundIndex]})`
    }}>
      <AudioPlayer />
      <div className="app">
        <header className="header">
          <h1>Spidi Clicker</h1>
          <p>{points.toLocaleString()} 
            <img src="/Spidi_photo/Spidi_Coin.jpg" alt="Coin" style={{ width: '20px', height: '20px', verticalAlign: 'middle', marginLeft: '5px' }} />
          </p>
        </header>
        <main>
          <Clicker onClick={handleClick} />
          <Upgrades
            points={points}
            setPoints={setPoints}
            clickPower={clickPower}
            setClickPower={setClickPower}
            autoClickers={autoClickers}
            setAutoClickers={setAutoClickers}
            criticalChance={criticalChance}
            setCriticalChance={setCriticalChance}
          />
          <Stats totalClicks={totalClicks} totalEarned={totalEarned} />
          <Settings
            maps={MAPS}
            backgroundIndex={backgroundIndex}
            setBackgroundIndex={setBackgroundIndex}
          />
        </main>
        <footer className="footer">
          <small>Spidi Clicker © Wintozo Corporation</small>
        </footer>
      </div>
    </div>
  );
}

export default App;
