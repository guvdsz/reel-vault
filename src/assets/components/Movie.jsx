import { useState } from "react";
import "./Movie.css";
import { useEffect } from "react";
import Tag from "./Tag";
import { nanoid } from "nanoid";
import { use } from "react";
export default function Movie({
  id,
  title,
  overview,
  score,
  poster,
  genres = [],
  genreIDs = [],
}) {
  const [extraInfo, setExtraInfo] = useState([]);
  const [trailer, setTrailer] = useState("");
  const movieGenres = genreIDs
    .map((genreID) => {
      const genre = genres.find((g) => g.id === genreID);
      return genre ? genre.name : null;
    })
    .filter(Boolean);
  useEffect(() => {
    async function getExtraInfo() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=1eddf51af913614634b1fd30b8fb3aa2`
        );
        const data = await response.json();
        setExtraInfo(data);
      } catch (error) {
        console.log(error);
      }
    }
    async function getTrailer() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1eddf51af913614634b1fd30b8fb3aa2`
        );
        if (!response.ok) throw new Error("Movie not found");

        const data = await response.json();
        if (!data.results) return;
        data.results.map((video) => {
          if (video.type === "Trailer") {
            setTrailer(video.key);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    getExtraInfo();
    getTrailer();
  }, [id]);
  const renderTags = movieGenres.map((genre) => {
    return <Tag key={nanoid()} genre={genre} />;
  });
  return (
    <div id={id} className="movie">
      <img src={poster} alt="N/A" loading="lazy" />
      <div className="movie-info">
        <div className="movie-header">
          <h3>{title}</h3>
          <p className="movie-details">
            <span className="movie-year">
              {extraInfo.release_date
                ? new Date(extraInfo.release_date).getFullYear()
                : "N/A"}
            </span>
            <span className="movie-duration">
              <i className="fa-regular fa-clock"></i>
              {extraInfo.runtime
                ? `${Math.floor(extraInfo.runtime / 60)}h ${
                    extraInfo.runtime % 60
                  }m`
                : "N/A"}
            </span>
            <span className="movie-score">
              <i className="fa-solid fa-star"></i> {score}
            </span>
          </p>
        </div>
        <div className="tags">{renderTags}</div>
        <p className="movie-description">{overview}</p>
        {trailer ? (
          <a
            href={`https://www.youtube.com/watch?v=${trailer}`}
            target="_blank"
            className="trailer-btn"
          >
            <i className="fa-solid fa-play"></i> Watch Trailer
          </a>
        ) : (
          <a className="trailer-btn">N/A</a>
        )}
      </div>
    </div>
  );
}
