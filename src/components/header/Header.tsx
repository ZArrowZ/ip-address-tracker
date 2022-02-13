import "./header.css";
import ArrowIcon from "../../assets/icon-arrow.svg";
import { HeaderProps } from "../../interfaces";

const Header = ({ inputIP, handleSubmit, handleUserInput }: HeaderProps) => {
  return (
    <header>
      <h1>IP Address Tracker</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="form-container">
        <input
          type="text"
          onChange={(e) => handleUserInput(e)}
          value={inputIP}
          placeholder="Search for any IP address or domain"
          pattern="[0-9]"
        ></input>

        <button>
          <img src={ArrowIcon} alt="search" />
        </button>
      </form>
      <div className="country-information"></div>
    </header>
  );
};

export default Header;
