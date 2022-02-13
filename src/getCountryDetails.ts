const getCountryDetails = async (apiLink: string) => {
  const res = await fetch(apiLink);
  const data = await res.json();
  if (res.status !== 200) {
    return;
  }
  return data;
};

export default getCountryDetails;
