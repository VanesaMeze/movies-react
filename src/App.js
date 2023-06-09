import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./register/SignIn";
import SignUp from "./register/SignUp";
import AddMovie from "./components/AddMovie";
import { useContext, useEffect } from "react";
import UserContext from "./storage/UserContext";
import { getMovies } from "./service/movieService";
import Movies from "./components/Movies";
import SingleMovie from "./components/SingleMovie";
import MovieContext from "./storage/MovieContext";

function App() {
  const movieContext = useContext(MovieContext);
  const { signedIn } = useContext(UserContext);

  useEffect(() => {
    if (signedIn) {
      getMovies().then(({ data }) => {
        movieContext.updateMovie(data);
      });
    }
  }, [signedIn]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/movies" />}></Route>
      <Route path="/movies" element={<Movies />}></Route>
      <Route path="/add" element={<AddMovie />}></Route>
      <Route path="/login" element={<SignIn />}></Route>
      <Route path="/register" element={<SignUp />}></Route>
      <Route path="/movies/:id" element={<SingleMovie />}></Route>
      <Route path="/movies/edit/:id" element={<AddMovie />}></Route>
    </Routes>
  );
}

export default App;
