import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Header from "./assets/components/Header";
import Search from "./assets/components/Search";
import Featured from "./assets/components/Featured";
function App() {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  async function getMovies() {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=1eddf51af913614634b1fd30b8fb3aa2"
    );
    const data = await response.json();
    setMovies(data.results);
    return data.results
  }
  async function getGenres() {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=1eddf51af913614634b1fd30b8fb3aa2"
    );
    const data = await response.json();
    setGenres(data.genres);
  }
  useEffect(() => {
    getGenres();
    getMovies();
  }, []);
  async function handleSearch(e) {
    const value = e.currentTarget.value;
    setSearchValue(value);
    getSearch(value);
  }
  async function getSearch(query) {
    if (query === "") {
      const popularMovies = await getMovies()
      setMovies(popularMovies)
      return
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1eddf51af913614634b1fd30b8fb3aa2&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    setMovies(data.results)
  }
  return (
    <>
      <Header  handleSearch={handleSearch}/>
      <main>
        <Featured movies={movies} genres={genres} searchValue={searchValue}/>
      </main>
    </>
  );
}

export default App;
