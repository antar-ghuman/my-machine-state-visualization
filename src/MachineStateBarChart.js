import React from 'react';
import { Bar } from 'react-chartjs-2';
import data from './Processed_machine_states'; // Adjust the path as needed.

const MachineStateBarChart = () => {
  // Prepare the data for the bar chart
  const machineStates = data.map(entry => entry.State);
  const stateCounts = machineStates.reduce((acc, state) => {
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(stateCounts),
    datasets: [{
      label: 'Frequency',
      data: Object.values(stateCounts),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Machine States',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Frequency',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Machine Status',
        font: {
          size: 20, // Adjust the font size as needed
          color: 'black',
        },
        padding: {
          top: 10,
          bottom: 10
        }
      }
      
    }
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default MachineStateBarChart;
