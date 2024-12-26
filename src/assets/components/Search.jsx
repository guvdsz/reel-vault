import "./Search.css";
export default function Search({handleSearch}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.querySelector('input[name="searchInput"]').blur();
  };

  return (
    <form className="search-form" autoComplete="off" onSubmit={handleSubmit}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" name="searchInput" placeholder="Discover..." onChange={handleSearch}/>
    </form>
  );
}
