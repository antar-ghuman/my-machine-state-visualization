import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PowerUsageBarChart = ({ machineStates }) => {
  // Calculate average power usage for each state
  const averagePowerData = machineStates.reduce((acc, state) => {
    // Extract state and power values from each state object
    const { State, Psum } = state;

    // If the state is not in the accumulator yet, initialize it
    if (!acc[State]) {
      acc[State] = { totalPower: 0, count: 0 };
    }

    // Add power value to the total power for the state
    acc[State].totalPower += Psum;
    // Increment the count of samples for the state
    acc[State].count += 1;

    return acc;
  }, {});

  // Calculate average power for each state
  Object.keys(averagePowerData).forEach((state) => {
    averagePowerData[state].averagePower = averagePowerData[state].totalPower / averagePowerData[state].count;
  });

  // Convert the data object into an array of objects
  const data = Object.keys(averagePowerData).map((state) => ({
    state,
    averagePower: averagePowerData[state].averagePower,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="state" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="averagePower" fill="#8884d8" name="Average Power (kW)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PowerUsageBarChart;
