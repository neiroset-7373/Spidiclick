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
  const [oneTimeUpgrades, setOneTimeUpgrades] = React.useState({
    doubleClick: false,
    tripleClick: false,
    instantBoost: false,
    fasterAutoClickers: false
  });

  React.useEffect(() => {
    const saved = localStorage.getItem('spidi-upgrades');
    if (saved) {
      setOneTimeUpgrades(JSON.parse(saved));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('spidi-upgrades', JSON.stringify(oneTimeUpgrades));
  }, [oneTimeUpgrades]);

  const buyUpgrade = (cost, onBuy) => {
    if (points >= cost) {
      setPoints(p => p - cost);
      onBuy();
    }
  };

  const cost = (base, owned) => Math.floor(base * Math.pow(1.15, owned));

  const coinIcon = (
    <img
      src="https://imgfy.ru/ib/cM6e9y89ckXWZYi_1775668474.webp"
      alt="Coin"
      style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginLeft: '3px' }}
    />
  );

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
          {coinIcon}
        </button>

        <button
          onClick={() => buyUpgrade(cost(50, autoClickers), () => setAutoClickers(a => a + 1))}
          disabled={points < cost(50, autoClickers)}
          className="upgrade-btn"
        >
          +1 Auto Clicker<br/>
          <small>Cost: {cost(50, autoClickers)} </small>
          {coinIcon}
        </button>

        <button
          onClick={() => buyUpgrade(cost(100, criticalChance * 100), () => setCriticalChance(c => Math.min(c + 0.01, 0.25)))}
          disabled={points < cost(100, criticalChance * 100)}
          className="upgrade-btn"
        >
          +1% Critical Chance<br/>
          <small>Max 25%</small><br/>
          <small>Cost: {cost(100, criticalChance * 100)} </small>
          {coinIcon}
        </button>

        <button
          onClick={() => {
            if (!oneTimeUpgrades.doubleClick) {
              buyUpgrade(50, () => {
                setClickPower(p => p * 2);
                setOneTimeUpgrades(u => ({ ...u, doubleClick: true }));
              });
            }
          }}
          disabled={points < 50 || oneTimeUpgrades.doubleClick}
          className="upgrade-btn special"
        >
          🚀 x2 Click Power!<br/>
          <small>One-time upgrade</small><br/>
          <small>Cost: 50 </small>
          {coinIcon}
        </button>

        <button
          onClick={() => {
            if (!oneTimeUpgrades.tripleClick) {
              buyUpgrade(100, () => {
                setClickPower(p => p * 3);
                setOneTimeUpgrades(u => ({ ...u, tripleClick: true }));
              });
            }
          }}
          disabled={points < 100 || oneTimeUpgrades.tripleClick}
          className="upgrade-btn special"
        >
          💥 x3 Click Power!<br/>
          <small>One-time upgrade</small><br/>
          <small>Cost: 100 </small>
          {coinIcon}
        </button>
      </div>
    </div>
  );
}

export default Upgrades;
export default Upgrades;
