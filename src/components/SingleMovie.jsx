import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../service/movieService";
import UserContext from "../storage/UserContext";

const SingleMovie = () => {
  const { signedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getMovieById(id).then(({ data }) => {
        setMovie(data);
      });
    }
    if (!signedIn) {
      navigate("/login");
    }
  }, [id]);

  return (
    <div className="d-flex justify-content-center">
      <div className="card " style={{ width: "300px" }}>
        <div className="card-body">
          <img
            src={movie.image_url}
            className="card-img-top"
            alt={`${movie.title}`}
          />
          <h2 className="card-title">{movie.title}</h2>
          <p className="card-text">Director: {movie.director}</p>
          <p className="card-text">Release Date: {movie.release_date}</p>
          <p className="card-text">Duration: {movie.duration} mins</p>
          <p className="card-text">Genre: {movie.genre}</p>
        </div>
      </div>
    </div>
  );
};
export default SingleMovie;
