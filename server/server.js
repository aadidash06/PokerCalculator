const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const calculateChipValue = (chips) => {
  return (chips.white * 10) + 
         (chips.blue * 25) + 
         (chips.red * 50) + 
         (chips.green * 100) + 
         (chips.black * 1000);
};

const calculatePayouts = (players, potAmount, startingChipValue, buyInAmount, payoutMethod) => {
  const playersWithValues = players.map(player => ({
    ...player,
    chipValue: calculateChipValue(player.chips)
  }));

  playersWithValues.sort((a, b) => b.chipValue - a.chipValue);

  let results = [];

  if (payoutMethod === 'percentage') {
    const totalChipValue = playersWithValues.reduce((sum, player) => sum + player.chipValue, 0);
    
    results = playersWithValues.map((player, index) => {
      const payout = totalChipValue > 0 ? (player.chipValue / totalChipValue) * potAmount : 0;
      return {
        name: player.name,
        chipValue: player.chipValue,
        rank: index + 1,
        payout: payout,
        chipGainLoss: player.chipValue - startingChipValue,
        profitLoss: payout - buyInAmount
      };
    });
  } else {
    const payoutPercentages = [0.5, 0.3, 0.2];
    
    results = playersWithValues.map((player, index) => {
      const payout = index < 3 ? potAmount * payoutPercentages[index] : 0;
      return {
        name: player.name,
        chipValue: player.chipValue,
        rank: index + 1,
        payout: payout,
        chipGainLoss: player.chipValue - startingChipValue,
        profitLoss: payout - buyInAmount
      };
    });
  }

  return results;
};

app.post('/api/calculate', (req, res) => {
  try {
    const { players, potAmount, startingChipValue, buyInAmount, payoutMethod } = req.body;

    if (!players || !Array.isArray(players) || players.length < 2 || players.length > 8) {
      return res.status(400).json({ error: 'Invalid number of players. Must be between 2 and 8.' });
    }

    if (!potAmount || potAmount <= 0) {
      return res.status(400).json({ error: 'Invalid pot amount. Must be greater than 0.' });
    }

    if (!payoutMethod || !['percentage', 'fixed'].includes(payoutMethod)) {
      return res.status(400).json({ error: 'Invalid payout method. Must be "percentage" or "fixed".' });
    }

    for (const player of players) {
      if (!player.name || player.name.trim() === '') {
        return res.status(400).json({ error: 'All players must have names.' });
      }

      if (!player.chips || typeof player.chips !== 'object') {
        return res.status(400).json({ error: 'Invalid chip data for player: ' + player.name });
      }

      const chipTypes = ['white', 'blue', 'red', 'green', 'black'];
      for (const chipType of chipTypes) {
        if (player.chips[chipType] === undefined || player.chips[chipType] < 0) {
          return res.status(400).json({ error: `Invalid ${chipType} chip count for player: ${player.name}` });
        }
      }
    }

    const results = calculatePayouts(players, potAmount, startingChipValue || 0, buyInAmount || 0, payoutMethod);

    res.json({ 
      success: true, 
      results,
      totalPot: potAmount,
      payoutMethod
    });

  } catch (error) {
    console.error('Error calculating payouts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});