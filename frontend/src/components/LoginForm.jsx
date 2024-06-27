import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import axios from "axios";
import { UserContext } from "../UserContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make the login API request
      const response = await axios.post(
        `http://localhost:3000/auth/users/login`,
        {
          username,
          password,
        }
      );

      const token = response.data;
      window.localStorage.setItem("token", token);

      const userResponse = await axios.get(
        `http://localhost:3000/auth/users/me`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      const loggedInUser = userResponse.data;

      setUser(loggedInUser);

      // Navigate to the home page after successful login
      navigate("/homepage");
    } catch (error) {
      // Handle any network or API request errors
      alert("Login failed: " + error);
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          New to the app? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
