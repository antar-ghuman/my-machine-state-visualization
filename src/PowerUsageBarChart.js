import React from 'react';

const PowerUsageInsights = ({ machineStates }) => {
  // Filter machine states for each state type
  const onLoadedStates = machineStates.filter(state => state.State === 'On - Loaded');
  const onIdleStates = machineStates.filter(state => state.State === 'On - Idle');
  const onUnloadedStates = machineStates.filter(state => state.State === 'On - Unloaded');

  // Calculate average power usage for each state type
  const averagePowerOnLoaded = calculateAveragePower(onLoadedStates);
  const averagePowerOnIdle = calculateAveragePower(onIdleStates);
  const averagePowerOnUnloaded = calculateAveragePower(onUnloadedStates);

  return (
    <div>
      <h2>Power Usage Insights</h2>
      <p>Here are some insights about power usage for different machine states:</p>
      <div className="power-usage-insights">
        <div className="state-insight">
          <span className="state-label"><strong>On - Loaded:</strong> </span>
          <span className="power-usage"> {averagePowerOnLoaded.toFixed(2)} kW</span>
        </div>
        <div className="state-insight">
          <span className="state-label"><strong>On - Idle:</strong></span>
          <span className="power-usage"> {averagePowerOnIdle.toFixed(2)} kW</span>
        </div>
        <div className="state-insight">
          <span className="state-label"><strong>On - Unloaded:</strong></span>
          <span className="power-usage"> {averagePowerOnUnloaded.toFixed(2)} kW</span>
        </div>
      </div>
    </div>
  );
};

// Utility function to calculate average power usage
const calculateAveragePower = (states) => {
  if (states.length === 0) return 0;
  const totalPower = states.reduce((acc, state) => acc + state.Psum, 0);
  return totalPower / states.length;
};

export default PowerUsageInsights;
