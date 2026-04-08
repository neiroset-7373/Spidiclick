import React from 'react';

function Upgrades({
  points,
  setPoints,
  clickPower,
  setClickPower,
  autoClickers,
  setAutoClickers,
  criticalChance,
  setCriticalChance
}) {
  const buyUpgrade = (cost, onBuy) => {
    if (points >= cost) {
      setPoints(p => p - cost);
      onBuy();
    }
  };

  const cost = (base, owned) => Math.floor(base * Math.pow(1.15, owned));

  return (
    <div className="upgrades">
      <h2>Upgrades</h2>
      <div className="upgrade-grid">
        <button
          onClick={() => buyUpgrade(cost(10, clickPower), () => setClickPower(p => p + 1))}
          disabled={points < cost(10, clickPower)}
          className="upgrade-btn"
        >
          +1 Click Power<br/>
          <small>Cost: {cost(10, clickPower)} </small>
          <img src="/Spidi_photo/Spidi_Coin.jpg" alt="Coin" style="width: 16px; height: 16px; vertical-align: middle; margin-left: 3px;" />
        </button>

        <button
          onClick={() => buyUpgrade(cost(50, autoClickers), () => setAutoClickers(a => a + 1))}
          disabled={points < cost(50, autoClickers)}
          className="upgrade-btn"
        >
          +1 Auto Clicker<br/>
          <small>Cost: {cost(50, autoClickers)} </small>
          <img src="/Spidi_photo/Spidi_Coin.jpg" alt="Coin" style="width: 16px; height: 16px; vertical-align: middle; margin-left: 3px;" />
        </button>

        <button
          onClick={() => buyUpgrade(cost(100, criticalChance * 100), () => setCriticalChance(c => Math.min(c + 0.01, 0.25)))}
          disabled={points < cost(100, criticalChance * 100)}
          className="upgrade-btn"
        >
          +1% Critical Chance<br/>
          <small>Max 25%</small><br/>
          <small>Cost: {cost(100, criticalChance * 100)} </small>
          <img src="/Spidi_photo/Spidi_Coin.jpg" alt="Coin" style="width: 16px; height: 16px; vertical-align: middle; margin-left: 3px;" />
        </button>

        <button
          onClick={() => buyUpgrade(50, () => setClickPower(p => p * 2))}
          disabled={points < 50}
          className="upgrade-btn special"
        >
          🚀 x2 Click Power!<br/>
          <small>One-time upgrade</small><br/>
          <small>Cost: 50 </small>
          <img src="/Spidi_photo/Spidi_Coin.jpg" alt="Coin" style="width: 16px; height: 16px; vertical-align: middle; margin-left: 3px;" />
        </button>

        <button
          onClick={() => buyUpgrade(100, () => setClickPower(p => p * 3))}
          disabled={points < 100}
          className="upgrade-btn special"
        >
          💥 x3 Click Power!<br/>
          <small>One-time upgrade</small><br/>
          <small>Cost: 100 </small>
          <img src="/Spidi_photo/Spidi_Coin.jpg" alt="Coin" style="width: 16px; height: 16px; vertical-align: middle; margin-left: 3px;" />
        </button>
      </div>
    </div>
  );
}

export default Upgrades;