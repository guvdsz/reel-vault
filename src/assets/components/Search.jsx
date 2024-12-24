import "./Search.css";
export default function Search({handleSearch}) {
  return (
    <form className="search-form" autoComplete="off">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" name="searchInput" placeholder="Discover movies..." onChange={handleSearch}/>
    </form>
  );
}
