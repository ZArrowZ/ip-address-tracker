import "./countryInfo.css";
import { CountryData } from "../../interfaces";

const CountryInfo = ({ countryData }: { countryData: CountryData }) => {
  const { location } = countryData;
  return (
    <div className="country-info">
      <div className="info_container">
        <span>IP ADDRESS</span>
        <h2>{countryData?.ip}</h2>
      </div>
      <div className="info_container">
        <span className="line"></span>
        <span>LOCATION</span>
        <h2>
          {location?.region}, {location?.country} <br />
          {location?.postalCode}
        </h2>
      </div>
      <div className="info_container">
        <span className="line"></span>
        <span>TIMEZONE</span>
        <h2>{location?.timezone}</h2>
      </div>
      <div className="info_container">
        <span className="line"></span>
        <span>ISP</span>
        <h2>{countryData?.isp}</h2>
      </div>
    </div>
  );
};

export default CountryInfo;
