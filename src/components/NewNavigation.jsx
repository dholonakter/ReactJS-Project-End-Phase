import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FaSearch } from "react-icons/fa"

function NewNavigation(props) {
  return (
    <div>
      <div className="bg-light">
        <nav class="navbar navbar-expand-lg navbar-light bg-light container ">
          <Link className="navbar-brand font-weight-bold" to="/">
            FHICTrade
          </Link>

          <div class="input-group mx-5">
            <input type="text" class="form-control" placeholder="Seacrch Product...." />
            <span class="input-group-text bg-dark text-white" id="basic-addon1"><FaSearch /></span>
          </div>


          <ul class="navbar-nav ml-auto">
            <li className={`nav-item  ${props.location.pathname === "/login" ? "active" : ""}`} >
              <Link className="nav-link font-weight-bold" to="/login">
                Login
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


          <p className={` pr-5 py-2 ${props.location.pathname === "/" ? "active" : ""}`} >
            <Link className="text-white" to="/" >
              Home
            </Link>
          </p>
          <p className={`pr-5 py-2 ${props.location.pathname === "/" ? "active" : ""}`} >
            <Link className="text-white" to="/" >
              About Us
            </Link>
          </p>
          <p className={`pr-5 py-2 ${props.location.pathname === "/" ? "active" : ""}`} >
            <Link className="text-white" to="/" >
              Advance Search
            </Link>
          </p>
          <p className={`pr-5 py-2 ${props.location.pathname === "/" ? "active" : ""}`} >
            <Link className="text-white" to="/" >
              Help
            </Link>
          </p>


        </div>
      </div>
    </div>

  );
}

export default withRouter(NewNavigation);