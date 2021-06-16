export const DateFormater = (date, timeZone) => {
  const indiaTime = new Date(date * 1000).toLocaleString("en-US", {timeZone: timeZone});
  // console.log(new Date(indiaTime).toLocaleString());
  return new Date(indiaTime).toLocaleString()
};
