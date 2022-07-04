import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className="d-flex" style={{ fontWeight: "bold" }}>
            <div>
              <i className="bi bi-activity"></i>
            </div>
            <div className="mx-2">LIST TODO APP</div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"></li>
            </ul>
            <form className="d-flex flex-fill mx-5">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <div>{user.user ? user.user.email : ""}</div>
            <Link className="nav-link active" aria-current="page" to="/logout">
              Exit
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
