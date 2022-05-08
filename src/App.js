import React from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./app/components/users/Login";
import Auth from "./app/components/users/Auth";
import Home from "./app/components/Home";
import Logout from "./app/components/users/Logout";
import Signup from "./app/components/users/Signup";


function App() {
  return (
    <div className="App">
      <Router>
        {/*<Navbar />*/}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/"
            element={
              <Auth>
                <Home></Home>
              </Auth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
