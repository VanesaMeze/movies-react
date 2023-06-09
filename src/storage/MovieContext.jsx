import { createContext } from "react";

const MovieContext = createContext({
  movies: [],
  postMovie: () => {},
  updateMovie: () => {},
});

export default MovieContext;
