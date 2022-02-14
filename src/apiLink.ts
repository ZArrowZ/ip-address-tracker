const generateApiLink = (ip: string): string => {
  const apiKey = process.env.REACT_APP_API_KEY;
  return `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
};
export default generateApiLink;
