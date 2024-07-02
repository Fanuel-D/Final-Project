import { useState, useEffect } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Homepage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import FilePage from "./FilePage";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const logout = () => {
    window.localStorage.removeItem("token");

    setUser(null);

    navigate("/login");
  };

  useEffect(() => {
    const possiblyLogin = async () => {
      const token = window.localStorage.getItem("token");

      if (token) {
        const userResponse = await axios.get(
          `http://localhost:3000/auth/users/me`,
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
            <>
              <Route
                path="/homepage/"
                element={<Homepage user={user} logout={logout} />}
              />
              <Route path="/files/:fileId" element={<FilePage user={user} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LoginForm />} exact />
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
