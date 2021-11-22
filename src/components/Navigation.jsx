import React from "react";
import { Link, withRouter } from "react-router-dom";
import {store, useGlobalState} from 'state-pool';
import Buttons from '@material-ui/core/Button';



function Navigation(props) {
  const currentUser = store.getState("currentUser", {default: null});
  const currentNavigation = store.getState("navigation", {default: "/Login"});
 
//   function handleGlobal() {
//     console.log(currentNavigation);
//   console.log(currentUser.value);  
//   if(currentUser.value){ 
//      let loginNav = document.querySelector("#login_nav");
//     loginNav.innerHTML ="Profile";
//     console.log(loginNav.to);
//   }  
//   else{

//   }
// }

function handleNavigation() {

}
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link id="home_nav" className="navbar-brand" to="/">
            FHICTrade
          </Link>
          <div>
            <ul className="navbar-nav ml-auto"> 
            <li 
                className={`nav-item  ${
                  props.location.pathname === "/login" ? "active" : ""
                }`}
              >
                <Link id="login_nav" className="nav-link" to={currentNavigation.value}>
                  {currentNavigation.value.replace("/", "")}
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