import { useState } from "react";
import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" />
          <Route path="/signUp" />
          <Route path="/homepage" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
