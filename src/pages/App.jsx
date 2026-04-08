import React, { useState, useEffect } from 'react';
import Clicker from '../components/Clicker';
import Upgrades from '../components/Upgrades';
import Stats from '../components/Stats';
import Settings from '../components/Settings';
import AudioPlayer from '../components/AudioPlayer';
import '../styles/main.css';

// Все 10 фонов из твоих ссылок
const MAPS = [
  'https://imgfy.ru/ib/GtCJuc8FZTS6rHP_1775668358.webp',
  'https://imgfy.ru/ib/KExDLsmPdi6S69l_1775668353.webp',
  'https://imgfy.ru/ib/I3Y7S4fw60NCXG6_1775668356.webp',
  'https://imgfy.ru/ib/Q0tS8jbc3nBw3HD_1775668355.webp',
  'https://imgfy.ru/ib/MyczLaOBlcaN8mB_1775668356.webp',
  'https://imgfy.ru/ib/CesmqooWrkeKIrQ_1775668355.webp',
  'https://imgfy.ru/ib/9qIh8pdmiCKVGII_1775668355.webp',
  'https://imgfy.ru/ib/ieqT6ZfHDxmCXc2_1775668355.webp',
  'https://imgfy.ru/ib/fQVN18ewyaM4V0w_1775668355.webp',
  'https://imgfy.ru/ib/zuzqivMLnYIp6L4_1775668355.webp'
];

function App() {
  const [points, setPoints] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [criticalChance, setCriticalChance] = useState(0.05);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

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
            <img src="https://imgfy.ru/ib/cM6e9y89ckXWZYi_1775668474.webp" alt="Coin" style={{ width: '20px', height: '20px', verticalAlign: 'middle', marginLeft: '5px' }} />
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
