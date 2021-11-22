import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            FHICTrade
          </Link>

          <div>
            <ul className="navbar-nav ml-auto"> 
            <li
                className={`nav-item  ${
                  props.location.pathname === "/login" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>             
			  <li
                className={`nav-item  ${
                  props.location.pathname === "/register" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
			  <li
                className={`nav-item  ${
                  props.location.pathname === "/filter" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/filter">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);