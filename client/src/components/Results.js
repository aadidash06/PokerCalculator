import React from 'react';

function Results({ results, potAmount, startingChipValue, buyInAmount }) {
  return (
    <div className="results">
      <h2>Results</h2>
      <div className="total-pot">Total Pot: ${potAmount.toFixed(2)}</div>
      
      <table className="results-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Chip Value</th>
            <th>Payout</th>
            {startingChipValue > 0 && <th>Chip +/-</th>}
            {buyInAmount > 0 && <th>Money +/-</th>}
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className={`rank-${result.rank}`}>
              <td>
                {result.rank === 1 && '🥇'}
                {result.rank === 2 && '🥈'}
                {result.rank === 3 && '🥉'}
                {result.rank > 3 && result.rank}
              </td>
              <td>{result.name}</td>
              <td>{result.chipValue.toLocaleString()} points</td>
              <td className="payout-amount">${result.payout.toFixed(2)}</td>
              {startingChipValue > 0 && result.chipGainLoss !== undefined && (
                <td className={result.chipGainLoss >= 0 ? "profit" : "loss"}>
                  {result.chipGainLoss >= 0 ? '+' : ''}{result.chipGainLoss.toLocaleString()} pts
                </td>
              )}
              {buyInAmount > 0 && result.profitLoss !== undefined && (
                <td className={result.profitLoss >= 0 ? "profit" : "loss"}>
                  {result.profitLoss >= 0 ? '+' : ''}${result.profitLoss.toFixed(2)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="total-distributed">
        Total Distributed: ${results.reduce((sum, r) => sum + r.payout, 0).toFixed(2)}
      </div>
    </div>
  );
}

export default Results;