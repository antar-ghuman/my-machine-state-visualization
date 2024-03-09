// ToolChangeoverTimes.js
import React from 'react';

const ToolChangeoverTimes = ({ machineStates }) => {
  let totalChangeoverTime = 0;
  let changeoverCount = 0;
  let changeoverStart = null;

  for (let i = 1; i < machineStates.length; i++) {
    // Detect a state change from "On - Loaded" to another state
    if (machineStates[i - 1].State === 'On - Loaded' && machineStates[i].State !== 'On - Loaded') {
      changeoverStart = new Date(machineStates[i].fromts);
    }
    // When it changes back to "On - Loaded", calculate the duration
    if (changeoverStart && machineStates[i].State === 'On - Loaded') {
      const changeoverEnd = new Date(machineStates[i].fromts);
      totalChangeoverTime += (changeoverEnd - changeoverStart); // Duration in milliseconds
      changeoverStart = null; // Reset changeover start time
      changeoverCount++;
    }
  }

  const averageChangeoverTime = changeoverCount > 0 ? (totalChangeoverTime / changeoverCount) / 1000 / 60 : 0; // Convert to minutes

  return (
    <div className="insight">
      <h3>Tool Changeover Times</h3>
      <p>Average Changeover Time: {averageChangeoverTime.toFixed(2)} minutes</p>
    </div>
  );
};

export default ToolChangeoverTimes;
