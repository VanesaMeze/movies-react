import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMovie, editMovieById, getMovieById } from "../service/movieService";
import UserContext from "../storage/UserContext";

const AddMovie = () => {
  const navigate = useNavigate();
  const { signedIn } = useContext(UserContext);
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    image_url: "",
    duration: "",
    release_date: "",
    genre: "",
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (movie.title.length === 0) {
      return alert(`Title is required!`);
    }
    if (movie.director.length === 0) {
      return alert(`Director field is required!`);
    }
    if (movie.image_url.length === 0) {
      return alert(`You have to add an image link!`);
    }
    if (movie.duration.length === 0) {
      return alert(`Duration field is required!`);
    }
    if (movie.duration < 1 || movie.duration > 300) {
      return alert(`Duration value have to be between 1 and 300!`);
    }
    if (movie.release_date.length === 0) {
      return alert(`Release date field is required!`);
    }
    if (movie.genre.length === 0) {
      return alert(`Genre field is required!`);
    }
    if (id) {
      editMovieById(id, movie);
    } else {
      addMovie(
        movie.title,
        movie.director,
        movie.image_url,
        movie.duration,
        movie.release_date,
        movie.genre
      );
      setMovie({
        title: "",
        director: "",
        image_url: "",
        duration: "",
        release_date: "",
        genre: "",
      });
    }
    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <form
        className="container mt-5"
        onSubmit={(event) => handleSubmit(event, movie)}
      >
        <div className="form-floating mt-3">
          <input
            name="title"
            value={movie.title}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="title"
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="director"
            value={movie.director}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="director"
          />
          <label htmlFor="director">Director</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="image_url"
            value={movie.image_url}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="image_url"
          />
          <label htmlFor="image_url">Image</label>
        </div>
        <div className="form-floating mt-3">
          <input
            className="form-control"
            type="date"
            name="release_date"
            onChange={handleInputChange}
            value={movie.release_date}
          ></input>
          <label htmlFor="release_date">Release Date</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="text"
            name="duration"
            placeholder="duration"
            className="form-control"
          />
          <label htmlFor="duration">Duration</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="genre"
            value={movie.genre}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="genre"
          />
          <label htmlFor="genre">Genre</label>
        </div>
        <div>
          {id ? (
            <button
              className="w-100 btn btn-lg btn-warning mt-3"
              type="submit"
              onClick={handleSubmit}
            >
              Edit
            </button>
          ) : (
            <button
              className="w-100 btn btn-outline-dark mt-3"
              type="submit"
              onClick={handleSubmit}
            >
              Add
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
export default AddMovie;
