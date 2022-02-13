import "./header.css";
import ArrowIcon from "../../assets/icon-arrow.svg";
import { HeaderProps } from "../../interfaces";

const Header = ({ handleSubmit, userInput, userValue }: HeaderProps) => {
  return (
    <header>
      <h1>IP Address Tracker</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="form-container">
        <input
          type="text"
          onChange={(e) => userInput(e)}
          value={userValue}
          placeholder="Search for any IP address or domain"
        ></input>

        <button type="submit">
          <img src={ArrowIcon} alt="search" />
        </button>
      </form>
      <div className="country-information"></div>
    </header>
  );
};

export default Header;
