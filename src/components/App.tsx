import { Oval } from "react-loader-spinner";
import AppLogic from "./AppLogic";
// components
import Header from "./header";
import Map from "./map";
import CountryInfo from "./countryInfo";
import Error from "./countryInfo/Error";

const App = () => {
  const {
    handleSubmit,
    userInput,
    userValue,
    loading,
    countryData,
    mapPosition,
  } = AppLogic();

  return (
    <div className="container">
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
            <Map mapPosition={mapPosition} />
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
