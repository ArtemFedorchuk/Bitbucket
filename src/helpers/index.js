export const DateFormater = (date, timeZone) => {
  const indiaTime = new Date().toLocaleString("en-US", {timeZone: timeZone});
  return new Date(indiaTime).toLocaleString()
};
