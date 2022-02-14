import { useState, useEffect } from "react";
import getUserIP from "../getUserIP";
import getCountryDetails from "../getCountryDetails";
import { Oval } from "react-loader-spinner";
import { CountryData } from "../interfaces";
// components
import Header from "./header";
import Map from "./map";
import CountryInfo from "./countryInfo";
import Error from "./countryInfo/Error";

const API_KEY: string = "at_m6UyA4GZOe3qHb0w5Q6i9bFlJr5Oc";

const App = () => {
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [countryData, setCountryData] = useState<CountryData>();
  const [ip, setIP] = useState<string>("");
  const [apiLink, setApiLink] = useState<string>("");
  const [userValue, setUserValue] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const fetchUserIP = async (): Promise<void> => {
      const ip: string = await getUserIP();
      setIP(ip);
      setApiLink(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
      );
      setLoading(false);
    };

    fetchUserIP();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (apiLink === "") return;
    const fetchCountryData = async (): Promise<void> => {
      const countryData = await getCountryDetails(apiLink);
      setCountryData(countryData);
      if (countryData !== undefined) {
        setLat(countryData.location.lat);
        setLng(countryData.location.lng);
      }
      setApiLink(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
      );
      setLoading(false);
    };
    fetchCountryData();
  }, [ip, apiLink]);

  const userInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value.match(/[^\d.]|\.(?=\.)/g)) return;
    if (userValue.length === 0 && value === ".") return;
    setUserValue(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIP(userValue);
  };

  return (
    <>
      <Header
        handleSubmit={handleSubmit}
        userInput={userInput}
        userValue={userValue}
      />
      {loading ? (
        <Oval color="black" height={80} width={80} />
      ) : (
        <main className="main-container">
          {typeof countryData === "object" ? (
            <CountryInfo countryData={countryData} />
          ) : (
            <Error />
          )}

          <div className="map">
            <Map lat={lat} lng={lng} />
          </div>
        </main>
      )}
    </>
  );
};

export default App;
