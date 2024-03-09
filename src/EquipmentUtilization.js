// EquipmentUtilization.js
import React from 'react';

const EquipmentUtilization = ({ machineStates }) => {
  const total = machineStates.length;
  const counts = machineStates.reduce((acc, { State }) => {
    acc[State] = (acc[State] || 0) + 1;
    return acc;
  }, {});

  const utilization = Object.entries(counts).map(([state, count]) => ({
    state,
    percentage: ((count / total) * 100).toFixed(2)
  }));

  return (
    <div>
      <h3>Equipment Utilization</h3>
      {utilization.map(({ state, percentage }) => (
        <div key={state}>{`${state}: ${percentage}%`}</div>
      ))}
    </div>
  );
};

export default EquipmentUtilization;
