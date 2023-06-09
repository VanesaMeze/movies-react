import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../storage/UserContext";
import { logOut } from "../service/movieService";

const Header = () => {
  const { signedIn, signOutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    const shouldLogOut = window.confirm("Are you sure?");
    if (shouldLogOut) {
      logOut().then(({ data }) => {
        signOutUser(data);
        navigate("/login");
      });
    }
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4">Movies</span>
        </Link>
        <ul className="nav nav-pills">
          {signedIn ? (
            <>
              <li className="nav-item">
                <Link to="/movies" className="nav-link" aria-current="page">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/add" className="nav-link">
                  Create Movie
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-outline-danger"
                  type="submit"
                  onClick={() => handleLogOut()}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
};
export default Header;
