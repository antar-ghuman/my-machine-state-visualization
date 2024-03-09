// MachineStateVisualizer.js
import React from 'react';
import Chart from 'chart.js/auto'; // Ensure Chart.js is correctly imported.
import MachineStateBarChart from './MachineStateBarChart';
import OperatingLoadLineChart from './OperatingLoadLineChart';
import InsightsComponent from './InsightsComponent';
import EquipmentUtilization from './EquipmentUtilization';
import OperationalEfficiency from './OperationalEfficiency';
import ToolChangeoverTimes from './ToolChangeoverTimes';
import DailyHourlyTrends from './DailyHourlyTrends';
import PowerUsageBarChart from './PowerUsageBarChart';
// Assuming the JSON data is static and bundled with the web app; adjust the path as necessary.
import data from './Processed_machine_states.json'; // Adjusted the path for a typical React project structure.

const MachineStateVisualizer = () => {
  // Simulated data fetched from JSON file
  const machineStates = data;

  // Calculate average utilization
  const totalStates = machineStates.length;
  const onLoadedStates = machineStates.filter(state => state.State === 'On - Loaded').length;
  const averageUtilization = (onLoadedStates / totalStates) * 100;

  // Calculate idle time
  const idleStates = machineStates.filter(state => state.State === 'On - Idle');
  const idleTime = idleStates.reduce((acc, curr, index) => {
    const startTime = new Date(curr.timestamp);
    // Fixes potential issue when there is no next state, defaults to current time
    const nextIdleState = idleStates[index + 1];
    const endTime = nextIdleState ? new Date(nextIdleState.timestamp) : new Date();
    const duration = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours
    return acc + duration;
  }, 0);

return (
    <div className="dashboard-container">
      <div className="operating-load-chart">
        <OperatingLoadLineChart machineStates={machineStates} />
      </div>  
      <div className="chart-container">
        <OperationalEfficiency machineStates={machineStates} />
      </div>
      <div className="chart-container">
        <MachineStateBarChart machineStates={machineStates} />
      </div>
      <div className="chart-container">
        <PowerUsageBarChart machineStates={machineStates} />
      </div>
    </div>
  );
};

export default MachineStateVisualizer;
