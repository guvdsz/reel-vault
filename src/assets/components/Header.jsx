import VaultIcon from "../VaultIcon.svg";
import "./Header.css";
import Search from "./Search";
export default function Header({handleSearch}) {
  return (
    <header>
      <nav>
          <div className="title-logo">
            <img src={VaultIcon} alt="Vault" />
            <h1>Reel <strong>Vault</strong></h1>
          </div>
           <Search handleSearch={handleSearch}/>
      </nav>
    </header>
  );
}
