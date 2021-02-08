import React, { useEffect, useState } from "react";
import "./Row.css";
import Axios from "../Axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [lastMovie, setLastMovie] = useState("");
  const base_Url = "https://image.tmdb.org/t/p/original/";

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await Axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    movieTrailer(movie?.name || "")
      .then((url) => {
        //https://www.youtube.com/watch?v=oyk0WPTQlhg
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get("v");

        if (lastMovie === movie.name && trailerUrl !== "") setTrailerUrl("");
        else {
          setTrailerUrl(videoId);
          setLastMovie(movie.name);
        }
      })
      .catch((error) => {
        console.log("HANDLE ERROR GRACEFULLY", error);
        if (lastMovie === movie.name && trailerUrl !== "") setTrailerUrl("");
        else {
          setTrailerUrl("");
          setTrailerUrl("VV9BZC7-Ss8");
          setLastMovie(movie.name);
        }
      });
  };
  const jsxMovies = (isLargeRow) => {
    let jsxArrOfMovies = movies.map((movie) => {
      let movieSrc = `${base_Url}${
        isLargeRow ? movie.poster_path : movie.backdrop_path
      }`;

      if (movieSrc.slice(-4) !== "null") {
        return (
          <>
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_Url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          </>
        );
      }
    });
    //console.log("JSX ARRAY OF MOVIES:", jsxArrOfMovies);
    return jsxArrOfMovies;
  };

  console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>

      {/* <div className="row__posters">
        {movies.map(
          (movies) =>
            ((isLargeRow && movies.poster_path) ||
              (!isLargeRow && movies.backdrop_path)) && (
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movies.id}
                src={`${base_Url}${
                  isLargeRow ? movies.poster_path : movies.backdrop_path
                }`}
                alt={movies.name}
              />
            )
        )}
      </div> */}
      <div className="row__posters">{jsxMovies(isLargeRow)}</div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
