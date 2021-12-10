import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FaSearch } from "react-icons/fa"
import {store, useGlobalState} from 'state-pool';
import SearchBar from "../components/SearchBar";

function NewNavigation(props) {
  const currentUser = store.getState("currentUser", {default: null});
  const currentNavigation = store.getState("navigation", {default: "/Login"});
  return (
    <div>
      <div className="bg-light">
        <nav className="navbar navbar-expand-lg navbar-light bg-light container ">
          <Link id="home_nav" className="navbar-brand font-weight-bold" to="/newhome">
            FHICTrade
          </Link>

		  <div className="input-group mx-5">
            <SearchBar/>
          </div>


          <ul className="navbar-nav ml-auto">
            <li className={`nav-item  ${props.location.pathname === "/login" ? "active" : ""}`} >
              <Link id="login_nav" className="nav-link font-weight-bold" to={currentNavigation.value}>
               {currentNavigation.value.replace("/", "")}
              </Link>
            </li>
            <li className={`nav-item  ${props.location.pathname === "/register" ? "active" : ""}`} >
              <Link className="nav-link font-weight-bold" to="/register">
                Register
              </Link>
            </li>
            <li className={`nav-item  ${props.location.pathname === "/about" ? "active" : ""}`} >
              <Link className="nav-link font-weight-bold" to="/about">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="bg-dark pt-0">
        <div className="d-flex align-items-center  container">


          <p className={` pr-5 py-2  ${props.location.pathname === "/" ? "active" : ""}`} >
            <Link className="text-white" to="/newhome" >
              Home
            </Link>
          </p>
          <p className={`pr-5 py-2  ${props.location.pathname === "/" ? "active" : ""}`} >
            <Link className="text-white" to="/add" >
              Add Product
            </Link>
          </p>
          <p className={`pr-5 py-2  ${props.location.pathname === "/" ? "active" : ""}`} >
            <Link className="text-white" to="/filter" >
              Advance Search
            </Link>
          </p>
          <p className={`pr-5 py-2 ${props.location.pathname === "/" ? "active" : ""}`} >
            <Link className="text-white" to="/newhome" >
              Help
            </Link>
          </p>


        </div>
      </div>
    </div>

  );
}

export default withRouter(NewNavigation);