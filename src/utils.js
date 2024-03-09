// utils.js
export const calculateMovingAverage = (data, valueKey, periods) => {
    let sum = 0;
    return data.map((item, index) => {
      sum += item[valueKey];
      if (index >= periods) {
        sum -= data[index - periods][valueKey];
      }
      return { ...item, [valueKey]: sum / Math.min(index + 1, periods) };
    });
  };
  