import { useContext, useEffect, useState } from "react";
import MovieContext from "../storage/MovieContext";
import { deleteMovieById, getMovies } from "../service/movieService";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../storage/UserContext";

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { movies, updateMovie } = useContext(MovieContext);
  const { signedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies(currentPage).then(({ data }) => {
      updateMovie(data.data);
      setLastPage(data.last_page);
    });
    if (!signedIn) {
      navigate("/login");
    }
  }, [currentPage]);

  const handleDelete = (id) => {
    if (signedIn) {
      deleteMovieById(id);
      getMovies(currentPage).then(({ data }) => {
        updateMovie(data.data);
        setLastPage(data.last_page);
      });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    console.log(lastPage);
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">Page {currentPage}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={goToNextPage}
              disabled={currentPage === 6}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {Array.isArray(movies)
          ? movies.map((movie, id) => (
              <div className="movies" key={id}>
                <div className="movies" key={id}>
                  <div
                    className="container text-left rounded"
                    style="background-color: rgba(245, 245, 245, 0.7); background-opacity:0.1 box-shadow: 9px 9px 45px -5px rgba(0,0,0,0.76);
                -webkit-box-shadow: 9px 9px 45px -5px rgba(0,0,0,0.76);
                -moz-box-shadow: 9px 9px 45px -5px rgba(0,0,0,0.76);"
                  >
                    <div
                      className="d-flex position-relative"
                      style="border: rounded-lg; shadow"
                    >
                      <img
                        src={movie.image_url}
                        className="me-3 border-left-style:none rounded"
                        alt="Post image"
                        width="120"
                        height="180"
                      />
                      <div>
                        <br></br>
                        <Link to={`movies/:id`}>{movie.title}</Link>
                        <ul>
                          <small>{movie.genre}</small>
                          <br></br>
                          <small>Release Date: {movie.release_date}</small>
                        </ul>
                        <p>{movie.director}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Link
                          className="btn btn-outline-success"
                          to={`/movies/${movie.id}`}
                        >
                          View
                        </Link>
                        <Link
                          className="btn btn-outline-warning"
                          to={`edit/${movie.id}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-outline-danger"
                          type="delete"
                          onClick={() => handleDelete(movie.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">Page {currentPage}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={goToNextPage}
              disabled={currentPage === lastPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Movies;
