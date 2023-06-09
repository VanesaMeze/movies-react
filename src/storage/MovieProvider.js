import { useState } from "react";
import MovieContext from "./MovieContext";
import { postMovie } from "../service/movieService";

const MovieProvider = ({ children }) => {
  const [movieState, setMovieState] = useState([]);

  const postNewMovie = (movie) => {
    postMovie(movie).then(({ data }) => {
      setMovieState((prevState) => [...prevState, data]);
    });
  };

  const movieContext = {
    movies: movieState,
    postMovie: postNewMovie,
    updateMovie: setMovieState,
  };

  return (
    <MovieContext.Provider value={movieContext}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
