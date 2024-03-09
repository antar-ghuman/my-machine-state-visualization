import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OperationalEfficiency = ({ machineStates }) => {
  const totalOperatingTime = machineStates.length;
  const unloadedTime = machineStates.filter(state => state.State === 'On - Unloaded').length;
  const idleTime = machineStates.filter(state => state.State === 'On - Idle').length;
  const offTime = machineStates.filter(state => state.State === 'Off').length;
  const onLoadedTime = machineStates.filter(state => state.State === 'On - Loaded').length;

  const data = [
    { name: 'On - Unloaded', value: unloadedTime },
    { name: 'On - Idle', value: idleTime },
    { name: 'Off', value: offTime },
    { name: 'On - Loaded', value: onLoadedTime },
  ];

  const COLORS = ['#FFD700', '#87CEEB', '#9370DB', '#FF7256'];

  return (
    <div className="insight operational-efficiency">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Operational Efficiency</h2>
      <ResponsiveContainer width="100%" height={270}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OperationalEfficiency;
