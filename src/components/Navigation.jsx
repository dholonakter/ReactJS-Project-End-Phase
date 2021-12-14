import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { store, useGlobalState } from "state-pool";
import SearchBar from "../components/SearchBar";

function Navigation(props) {
  const currentUser = store.getState("currentUser", { default: null });
  const currentNavigation = store.getState("navigation", { default: "/Login" });
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light ">
        <div class="container-fluid container ">
          <Link
            id="home_nav"
            className="navbar-brand font-weight-bold"
            to="/home"
          >
            FHICTrade
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="text-center m-auto pt-3 pt-lg-0 pb-3 pb-lg-0">
              <SearchBar />
            </div>
            <ul class="navbar-nav mb-2 mb-lg-0 ml-auto">
              <li
                className={`nav-item mr-auto  ${
                  props.location.pathname === "/login" ? "active" : ""
                }`}
              >
                <Link
                  id="login_nav"
                  className="nav-link font-weight-bold"
                  to={currentNavigation.value}
                >
                  {currentNavigation.value.replace("/", "")}
                </Link>
              </li>
              <li
                className={`nav-item mr-auto  ${
                  props.location.pathname === "/register" ? "active" : ""
                }`}
              >
                <Link className="nav-link font-weight-bold" to="/register">
                  Register
                </Link>
              </li>
              <li
                className={`nav-item mr-auto  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link className="nav-link font-weight-bold" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="bg-dark pt-0">
        <div className="d-flex align-items-center container">
          <div className="row px-3 px-sm-0 px-lg-3">
            <p
              className={` pr-5   ${
                props.location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link className="text-white" to="/newhome">
                Home
              </Link>
            </p>
            <p
              className={`pr-5   ${
                props.location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link className="text-white" to="/add">
                Add Product
              </Link>
<<<<<<< HEAD:src/components/Navigation.jsx
            </li>
          </ul>
        </nav>
      </div>
      <div className="bg-dark pt-0">
        <div className="d-flex align-items-center  container">


          <p className={` pr-5 py-2  ${props.location.pathname === "/" ? "active" : ""}`} >
            <Link className="text-white" to="/home" >
              Home
            </Link>
          </p>
          <p className={`pr-5 py-2  ${props.location.pathname === "/" ? "active" : ""}`} >
            <Link className="text-white" to="/add" >
              Add Product
            </Link>
          </p>
          <p
              className={`pr-5   ${
                props.location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link className="text-white" to="/filter">
                Advance Search
              </Link>
            </p>
          <p
              className={`pr-5 ${
                props.location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link className="text-white" to="/home">
                Help
              </Link>
            </p>
        </div>
      </div>
    </>
  );
}

export default withRouter(Navigation);
