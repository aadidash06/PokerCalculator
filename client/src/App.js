import React, { useState, useEffect } from 'react';
import './App.css';
import GameSetup from './components/GameSetup';
import PlayerInput from './components/PlayerInput';
import Results from './components/Results';

function App() {
  const [numPlayers, setNumPlayers] = useState(2);
  const [potAmount, setPotAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('percentage');
  const [players, setPlayers] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    initializePlayers(numPlayers);
  }, []);

  const initializePlayers = (num) => {
    const newPlayers = [];
    for (let i = 0; i < num; i++) {
      newPlayers.push({
        name: '',
        chips: {
          white: 0,
          blue: 0,
          red: 0,
          green: 0,
          black: 0
        }
      });
    }
    setPlayers(newPlayers);
  };

  const handleNumPlayersChange = (num) => {
    setNumPlayers(num);
    initializePlayers(num);
    setResults(null);
  };

  const updatePlayer = (index, field, value) => {
    const newPlayers = [...players];
    if (field === 'name') {
      newPlayers[index].name = value;
    } else {
      newPlayers[index].chips[field] = parseInt(value) || 0;
    }
    setPlayers(newPlayers);
  };

  const calculateResults = async () => {
    setError('');
    
    if (!potAmount || parseFloat(potAmount) <= 0) {
      setError('Please enter a valid pot amount');
      return;
    }

    const allPlayersHaveNames = players.every(p => p.name.trim() !== '');
    if (!allPlayersHaveNames) {
      setError('All players must have names');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          players,
          potAmount: parseFloat(potAmount),
          payoutMethod
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error calculating results');
        return;
      }

      setResults(data.results);
    } catch (err) {
      setError('Error connecting to server. Make sure the server is running.');
    }
  };

  const resetGame = () => {
    setResults(null);
    setPotAmount('');
    initializePlayers(numPlayers);
    setError('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Poker Calculator</h1>
        <p>Calculate chip values and distribute winnings</p>
      </header>

      <main className="App-main">
        <GameSetup
          numPlayers={numPlayers}
          onNumPlayersChange={handleNumPlayersChange}
          potAmount={potAmount}
          onPotAmountChange={setPotAmount}
          payoutMethod={payoutMethod}
          onPayoutMethodChange={setPayoutMethod}
        />

        {players.length > 0 && (
          <PlayerInput
            players={players}
            onUpdatePlayer={updatePlayer}
          />
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button 
            className="calculate-btn"
            onClick={calculateResults}
            disabled={!potAmount || players.length === 0}
          >
            Calculate Payouts
          </button>
          
          {results && (
            <button className="reset-btn" onClick={resetGame}>
              New Game
            </button>
          )}
        </div>

        {results && <Results results={results} potAmount={parseFloat(potAmount)} />}
      </main>
    </div>
  );
}

export default App;
