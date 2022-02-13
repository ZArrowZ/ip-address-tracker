const getUserIP = async (): Promise<string> => {
  const res = await fetch(`https://geolocation-db.com/json/`);
  const data = await res.json();
  return data.IPv4;
};

export default getUserIP;
