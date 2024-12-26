import "./Featured.css";
import { useState } from "react";
import { useEffect } from "react";
import SparklesIcon from "../SparklesIcon.svg";
import Movie from "./Movie";
export default function Featured({movies, genres, searchValue}) {
  const moviesListing = movies.map((item) => {
    return (
      <Movie
        key={item.id}
        id={item.id}
        title={item.original_title}
        overview={item.overview}
        poster={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
        score={item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
        genres={genres}
        genreIDs={item.genre_ids}
      />
    );
  });
  return (
    <section className="featured">
      <div className="title-container">
        <img src={SparklesIcon} alt="Sparkles" />
        <h2>{searchValue ? searchValue: "Latest Releases"}</h2>
      </div>
      <div className="movies-container">{moviesListing.length > 0 ? moviesListing : (<p className="not-found">"{searchValue}" Not Found</p>)}</div>
    </section>
  );
}
