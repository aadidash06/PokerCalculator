import React from 'react';

function PlayerInput({ players, onUpdatePlayer }) {
  const chipTypes = [
    { name: 'white', value: 10, color: '#FFFFFF' },
    { name: 'blue', value: 25, color: '#2196F3' },
    { name: 'red', value: 50, color: '#F44336' },
    { name: 'green', value: 100, color: '#4CAF50' },
    { name: 'black', value: 1000, color: '#000000' }
  ];

  const calculatePlayerTotal = (chips) => {
    return chipTypes.reduce((total, chip) => {
      return total + (chips[chip.name] * chip.value);
    }, 0);
  };

  return (
    <div className="player-input">
      <h2>Player Information</h2>
      
      <div className="chip-legend">
        <h3>Chip Values:</h3>
        <div className="chip-values">
          {chipTypes.map(chip => (
            <div key={chip.name} className="chip-info">
              <span 
                className="chip-icon" 
                style={{ backgroundColor: chip.color, border: chip.name === 'white' ? '1px solid #ccc' : 'none' }}
              ></span>
              <span>{chip.name.charAt(0).toUpperCase() + chip.name.slice(1)}: {chip.value} points</span>
            </div>
          ))}
        </div>
      </div>

      <div className="players-grid">
        {players.map((player, index) => (
          <div key={index} className="player-card">
            <h3>Player {index + 1}</h3>
            
            <div className="player-field">
              <label>Name:</label>
              <input
                type="text"
                value={player.name}
                onChange={(e) => onUpdatePlayer(index, 'name', e.target.value)}
                placeholder="Enter player name"
              />
            </div>

            <div className="chips-grid">
              {chipTypes.map(chip => (
                <div key={chip.name} className="chip-input">
                  <label>
                    <span 
                      className="chip-icon-small" 
                      style={{ backgroundColor: chip.color, border: chip.name === 'white' ? '1px solid #ccc' : 'none' }}
                    ></span>
                    {chip.name}:
                  </label>
                  <input
                    type="number"
                    value={player.chips[chip.name]}
                    onChange={(e) => onUpdatePlayer(index, chip.name, e.target.value)}
                    min="0"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>

            <div className="player-total">
              Total: {calculatePlayerTotal(player.chips).toLocaleString()} points
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerInput;