import { useState } from "react";
// import "../styles/App.css";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signUp" element={<SignupForm />} />
            <Route
              path="/"
              element={
                <div>
                  <div>hello</div>
                  <p>
                    New to the app? <Link to="/signup">Sign Up</Link>
                  </p>
                </div>
              }
            />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
