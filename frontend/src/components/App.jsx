import { useState, useEffect } from "react";
// import "../styles/App.css";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Homepage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const possiblyLogin = async () => {
      const token = window.localStorage.getItem("token");

      if (token) {
        const userResponse = await axios.get(
          `http://localhost:3000/auth/users/login`,
          {
            headers: {
              authorization: token,
            },
          }
        );

        const user = userResponse.data;

        setUser(user);

        navigate("/homepage");
      }
    };

    possiblyLogin();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          {user ? (
            <Route path="/homepage" element={<Homepage />} />
          ) : (
            <>
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
            </>
          )}
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
