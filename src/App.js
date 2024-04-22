import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const App = () => {
  const [expression, setExpression] = useState('');
  const [plotData, setPlotData] = useState([]);

  const handleCalculate = async () => {
    try {
      const response = await axios.get(`/api/calculate/?expression=${encodeURIComponent(expression)}`);
      setPlotData(response.data.data);
    } catch (error) {
      console.error('Error calculating:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter a mathematical expression"
      />
      <button onClick={handleCalculate}>Plot Graph</button>
      <Plot
        data={[{
          x: plotData.map(point => point.x),
          y: plotData.map(point => point.y),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        }]}
        layout={{ width: 800, height: 400, title: 'Graph' }}
      />
    </div>
  );
};

export default App;
