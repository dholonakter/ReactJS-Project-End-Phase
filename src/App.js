import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Filter from "./pages/Filter";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Profile from "./pages/Profile";
import axios from 'axios';
import {store, useGlobalState} from 'state-pool';

function App() {
  const currentUser = store.getState("currentUser");
  console.log(currentUser);

  // this useEffect function is what GETS the data which is being posted in the database.php file with $_POST
  // useEffect(()=>{
  //   axios.get("https://i383988.hera.fhict.nl/database.php").then(function(response){
  //     setHome(response.data);
  //   })
  // }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
      <Route exact path="/"><Home /></Route>
		  <Route exact path="/register"><Register /></Route>
		  <Route exact path="/login"><Login /></Route>
		  <Route exact path="/about"><About /></Route>
      <Route exact path="/profile"><Profile /></Route>
      <Route exact path="/filter"><Filter/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;