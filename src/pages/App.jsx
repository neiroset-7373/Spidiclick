import React, { useState, useEffect } from 'react';
import Clicker from '../components/Clicker';
import Upgrades from '../components/Upgrades';
import Stats from '../components/Stats';
import Settings from '../components/Settings';
import AudioPlayer from '../components/AudioPlayer';
import '../styles/main.css';

function App() {
  const [points, setPoints] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [criticalChance, setCriticalChance] = useState(0.05);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);

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

  // Сохранение
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
  }, []);

  useEffect(() => {
    localStorage.setItem('spidi-clicker', JSON.stringify({
      points, clickPower, autoClickers, criticalChance, totalClicks, totalEarned
    }));
  }, [points, clickPower, autoClickers, criticalChance, totalClicks, totalEarned]);

  const handleClick = () => {
    let earned = clickPower;
    if (Math.random() < criticalChance) earned *= 3; // x3 на крит

    setPoints(prev => prev + earned);
    setTotalEarned(prev => prev + earned);
    setTotalClicks(prev => prev + 1);
  };

  return (
    <>
      <AudioPlayer />
      <div className="app">
        <header className="header">
          <h1>Spidi Clicker</h1>
          <p>{points.toLocaleString()} <img src="/Spidi_photo/Spidi_Coin.jpg" alt="Coin" style="width: 20px; height: 20px; vertical-align: middle; margin-left: 5px;" /></p>
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
          <Settings />
        </main>
        <footer className="footer">
          <small>Spidi Clicker © Wintozo Corporation</small>
        </footer>
      </div>
    </>
  );
}

export default App;