import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignupForm.css";
import { UserContext } from "../UserContext";
import axios from "axios";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the signup API request
      const response = await axios.post(
        `http://localhost:3000/auth/users/signup`,
        {
          username,
          password,
          email,
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

      navigate("/homepage");

      console.log("Signup successful");

      setUsername("");
      setEmail("");
      setPassword("");

      navigate("/homepage");
    } catch (error) {
      // Handle any network or API request errors
      alert("Signup failed: " + error);
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
