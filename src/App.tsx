import React from "react";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import "./App.css";

function App() {
  return (
    <main>
      <h1 className="header">Welcome! Kindly Register to Begin...</h1>
      <div className="form_container">
        {/* <Register /> */}
        <Login />
      </div>
    </main>
  );
}

export default App;
