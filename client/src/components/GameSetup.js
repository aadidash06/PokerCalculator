import React from 'react';

function GameSetup({ numPlayers, onNumPlayersChange, potAmount, onPotAmountChange, startingChipValue, onStartingChipValueChange, buyInAmount, onBuyInAmountChange, payoutMethod, onPayoutMethodChange }) {
  return (
    <div className="game-setup">
      <h2>Game Setup</h2>
      
      <div className="setup-group">
        <label htmlFor="numPlayers">Number of Players:</label>
        <select 
          id="numPlayers"
          value={numPlayers} 
          onChange={(e) => onNumPlayersChange(parseInt(e.target.value))}
        >
          {[2, 3, 4, 5, 6, 7, 8].map(n => (
            <option key={n} value={n}>{n} Players</option>
          ))}
        </select>
      </div>

      <div className="setup-group">
        <label htmlFor="potAmount">Total Pot Amount ($):</label>
        <input
          id="potAmount"
          type="number"
          value={potAmount}
          onChange={(e) => onPotAmountChange(e.target.value)}
          placeholder="Enter pot amount"
          min="0"
          step="0.01"
        />
      </div>

      <div className="setup-group">
        <label htmlFor="startingChipValue">Starting Chip Value (per player):</label>
        <input
          id="startingChipValue"
          type="number"
          value={startingChipValue}
          onChange={(e) => onStartingChipValueChange(e.target.value)}
          placeholder="Enter starting chip value"
          min="0"
          step="1"
        />
        <small style={{display: 'block', marginTop: '0.25rem', color: '#6b7280'}}>
          The chip point value each player started with
        </small>
      </div>

      <div className="setup-group">
        <label htmlFor="buyInAmount">Buy-in Amount per Player ($):</label>
        <input
          id="buyInAmount"
          type="number"
          value={buyInAmount}
          onChange={(e) => onBuyInAmountChange(e.target.value)}
          placeholder="Enter buy-in amount"
          min="0"
          step="0.01"
        />
        <small style={{display: 'block', marginTop: '0.25rem', color: '#6b7280'}}>
          Used only for profit/loss tracking - doesn't affect payouts
        </small>
        {buyInAmount && numPlayers && (
          <small style={{display: 'block', marginTop: '0.25rem', color: '#6b7280'}}>
            Total buy-ins: ${(parseFloat(buyInAmount) * numPlayers).toFixed(2)}
          </small>
        )}
      </div>

      <div className="setup-group">
        <label>Payout Method:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="percentage"
              checked={payoutMethod === 'percentage'}
              onChange={(e) => onPayoutMethodChange(e.target.value)}
            />
            Percentage-based (proportional to chip value)
          </label>
          <label>
            <input
              type="radio"
              value="fixed"
              checked={payoutMethod === 'fixed'}
              onChange={(e) => onPayoutMethodChange(e.target.value)}
            />
            Fixed split (50%-30%-20%)
          </label>
        </div>
      </div>
    </div>
  );
}

export default GameSetup;