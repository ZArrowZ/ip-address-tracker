import { useState, useEffect } from "react";
import { CountryData } from "../interfaces";
import getUserIP from "./../getUserIP";
import generateApiLink from "../apiLink";
import getCountryDetails from "../getCountryDetails";

const AppLogic = () => {
  const [mapPosition, setMapPosition] = useState<number[]>([]);
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
      setApiLink(generateApiLink(ip));
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
        setMapPosition([countryData.location.lat, countryData.location.lng]);
      }
      setApiLink(generateApiLink(ip));
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

  return {
    handleSubmit,
    userInput,
    userValue,
    loading,
    countryData,
    mapPosition,
  };
};

export default AppLogic;
