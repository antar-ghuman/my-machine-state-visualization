// OperatingLoadLineChart.js

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getHourlyAverages, getMovingAverage, formatTimestamp } from './utils';

// Utility function to calculate moving average
const calculateMovingAverage = (data, period) => {
  return data.map((point, index, array) => {
    const start = Math.max(0, index - period + 1);
    const end = index;
    const subset = array.slice(start, end + 1);
    const sum = subset.reduce((acc, val) => acc + val.Psum, 0);
    return { ...point, averagePsum: sum / subset.length };
  });
};

const OperatingLoadLineChart = ({ machineStates }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(24); // Default to 24 hours
  const [sortedData, setSortedData] = useState([]);

  // Sort data based on timestamps
  useEffect(() => {
    const sorted = [...machineStates].sort((a, b) => new Date(a.fromts) - new Date(b.fromts));
    setSortedData(sorted);
  }, [machineStates]);

  // Handle period change
  const handlePeriodChange = (e) => {
    setSelectedPeriod(parseInt(e.target.value)); // Parse the selected value to an integer
  };

  // Calculate moving average for the filtered data
  const movingAverageData = calculateMovingAverage(sortedData, selectedPeriod);

  return (
    <div className="operating-load-chart">
      <div className="period-selector">
        <label>Select Period:</label>
        <select value={selectedPeriod} onChange={handlePeriodChange}>
          <option value={1}>Last 1 Hour</option>
          <option value={3}>Last 3 Hours</option>
          <option value={6}>Last 6 Hours</option>
          <option value={12}>Last 12 Hours</option>
          <option value={24}>Last 24 Hours</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={movingAverageData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fromts" tickFormatter={formatTimestamp} label={{ value: 'Time', position: 'insideBottom', offset: -10 }} />
          <YAxis label={{ value: 'Average Power Draw (kW)', angle: -90, position: 'insideLeft', offset: -10 }} />
          <Tooltip formatter={(value) => [value.toFixed(2) + ' kW', 'Power Draw']} />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="averagePsum" name="Average Power Draw" stroke="#8884d8" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OperatingLoadLineChart;
