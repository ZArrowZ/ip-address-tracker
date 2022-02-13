const getCountryDetails = async (apiLink: string) => {
  const res = await fetch(apiLink);
  const data = await res.json();
  console.log(res);
  if (res.status !== 200) {
    return res.status;
  }
  return data;
};

export default getCountryDetails;
