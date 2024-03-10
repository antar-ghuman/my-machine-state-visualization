// utils.js
export const calculateMovingAverage = (data, valueKey, periods) => {
    let sum = 0;
    return data.map((item, index) => {
      sum += item[valueKey];
      if (index >= periods) {
        sum -= data[index - periods][valueKey];
      }
      return { item, [valueKey]: sum / Math.min(index + 1, periods) };
    });
  };
  
// Format timestamp into a readable time format
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
