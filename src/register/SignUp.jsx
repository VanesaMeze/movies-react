import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service/movieService";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    emailVerified: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser(user.username, user.email, user.password, user.emailVerified);
    setUser({
      username: "",
      email: "",
      password: "",
      emailVerified: true,
    });
  };

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          navigate("/login");
        }}
        className="container "
        style={{ width: "500px" }}
      >
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Password"
            name="username"
            value={user.username}
            onChange={handelInputChange}
          />
          <label htmlFor="floatingPassword">Username</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            value={user.email}
            onChange={handelInputChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handelInputChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn btn-outline-dark w-100 py-2" type="submit">
          Sign up
        </button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
      </form>
    </div>
  );
};
export default SignUp;
