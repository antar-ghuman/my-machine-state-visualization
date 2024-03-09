import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const ToolChangeoverTimeVisualizer = ({ machineStates }) => {
  const [toolChangeoverDurations, setToolChangeoverDurations] = useState([]);

  useEffect(() => {
    const changeoverTimes = [];
    let lastLoadedTime = null;

    machineStates.forEach((state, index) => {
      const currentStateDate = new Date(state.fromts);
      if (state.State === 'On - Loaded') {
        if (lastLoadedTime !== null) {
          // Calculate the difference in minutes since the last "On - Loaded" state
          const duration = (currentStateDate - lastLoadedTime) / 1000 / 60;
          // Only consider it a changeover if the duration is significantly long, say more than 5 minutes
          if (duration > 5) {
            changeoverTimes.push(duration);
          }
        }
        lastLoadedTime = currentStateDate;
      }
    });

    setToolChangeoverDurations(changeoverTimes);
  }, [machineStates]);

  const data = {
    labels: toolChangeoverDurations.map((_, index) => `Change ${index + 1}`),
    datasets: [
      {
        label: 'Duration (minutes)',
        data: toolChangeoverDurations,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Duration (minutes)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Tool Changeover Events'
        }
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tool Changeover Time Chart'
      }
    }
  };

  return (
    <div>
      <h2>Tool Changeover Time Visualization</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ToolChangeoverTimeVisualizer;
