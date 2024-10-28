/* eslint-disable no-param-reassign */
export const formatNestedDescriptions = (datum, key) => {
  if (!datum) return '';
  return datum.reduce((acc, data, i) => {
    if (i === 0) {
      acc += data[key];
    } else {
      acc += `, ${data[key]}`;
    }
    return acc;
  }, '');
};
