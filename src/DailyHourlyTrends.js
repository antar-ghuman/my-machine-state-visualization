import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DailyHourlyTrends = ({ machineStates }) => {

  // Function to format and sort hourly trends
  const formatHourlyTrends = (machineStates) => {
    const hourlyTrends = {};

    machineStates.forEach(state => {
      const date = new Date(state.fromts);
      const hour = date.getHours();
      const hourKey = `${String(hour).padStart(2, '0')}:00`;
      hourlyTrends[hourKey] = (hourlyTrends[hourKey] || 0) + 1;
    });

    return Object.entries(hourlyTrends)
                 .map(([hour, count]) => ({ hour, count }))
                 .sort((a, b) => a.hour.localeCompare(b.hour));
  };

  // Function to format and sort daily trends
  const formatDailyTrends = (machineStates) => {
    const dailyTrends = {};

    machineStates.forEach(state => {
      const date = new Date(state.fromts);
      const dayKey = date.toISOString().split('T')[0];
      dailyTrends[dayKey] = (dailyTrends[dayKey] || 0) + 1;
    });

    return Object.entries(dailyTrends)
                 .map(([day, count]) => ({ day, count }))
                 .sort((a, b) => new Date(a.day) - new Date(b.day));
  };

  // Process the data for the charts
  const hourlyTrendData = formatHourlyTrends(machineStates);
  const dailyTrendData = formatDailyTrends(machineStates);

  return (
    <div className="insight">
      <h3>Daily and Hourly Trends</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={hourlyTrendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Hourly Counts" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={dailyTrendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" name="Daily Counts" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyHourlyTrends;
