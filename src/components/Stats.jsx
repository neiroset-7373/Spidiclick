import React from 'react';

function Stats({ totalClicks, totalEarned }) {
  return (
    <div className="stats">
      <h2>Statistics</h2>
      <ul>
        <li>Total Clicks: <strong>{totalClicks.toLocaleString()}</strong></li>
        <li>Total Earned: <strong>{totalEarned.toLocaleString()}</strong></li>
      </ul>
    </div>
  );
}

export default Stats;