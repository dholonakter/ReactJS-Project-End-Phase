import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { store, useGlobalState } from "state-pool";
import SearchBar from "../components/SearchBar";

function ProfileNavigation(props) {
  const currentUser = store.getState("currentUser", { default: null });
  const currentNavigation = store.getState("navigation", { default: "/Login" });
  return (
    <div>
      <div className="bg-light">
        <nav className="navbar navbar-expand-lg navbar-light bg-light container ">
          <Link
            id="home_nav"
            className="navbar-brand font-weight-bold"
            to="/home"
          >
            Profile
          </Link>

          <ul className="navbar-nav ml-auto">
            <li
              className={`nav-item  ${
                props.location.pathname === "/profile" ? "active" : ""
              }`}
            >
              <Link
                id="personal_nav"
                className="nav-link font-weight-bold"
                to="/profile"
              >
                Personal Information
              </Link>
            </li>
            <li
              className={`nav-item  ${
                props.location.pathname === "/userproduct" ? "active" : ""
              }`}
            >
              <Link className="nav-link font-weight-bold" to="/userproducts">
                My Products
              </Link>
            </li>
            <li
              className={`nav-item  ${
                props.location.pathname === "/userhistory" ? "active" : ""
              }`}
            >
              <Link className="nav-link font-weight-bold" to="/userhistory">
                Purchase History
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default withRouter(ProfileNavigation);
