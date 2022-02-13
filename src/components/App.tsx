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

const API_KEY: string = "at_7R8wovTlaqM2seYpvwaoP3T6qKQTj";

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
    (async (): Promise<void> => {
      // GET THE USER IP FROM getUserIP FUNCTION
      const ip: string = await getUserIP();
      // SET CURRENT IP TO THE STATE
      setIP(ip);
      // UPDATE MY API LINK
      setApiLink(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
      );
      // SET LOADING TO FALSE
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setLoading(true);
    // IF THE USER DIDN'T INPUT ANY THING
    if (apiLink === "") return;
    // GET THE COUNTRY DATA
    (async (): Promise<void> => {
      // GET THE DATA FROM THE getCountryDetails FUNCTION AND PASS API LINK TO IT
      const countryData = await getCountryDetails(apiLink);
      // SET CURRENT COUNTRY TO THE STATE
      if (countryData && countryData.Response) {
        return;
      } else {
        setCountryData(countryData);
        if (countryData && countryData.location) {
          setLat(countryData.location.lat);
          setLng(countryData.location.lng);
        }
      }
      // UPDATE API LINK
      setApiLink(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
      );
      // SET LOADING TO FALSE
      setLoading(false);
    })();
  }, [ip, apiLink]);

  const userInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value.match(/[^\d.]|\.(?=\.)/g)) return;
    if (userValue.length === 0 && value === ".") return;
    setUserValue(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // UPDATE THE IP
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
