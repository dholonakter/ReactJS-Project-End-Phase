import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Filter from "./pages/Filter";
import Register from "./pages/Register";
import UpdateInfo from "./pages/UpdateInfo";
import Login from "./pages/Login";
import About from "./pages/About";
import Chat from "./pages/Chat";
import ChatMessage from "./pages/ChatMessage";
import axios from 'axios'
import Profile from "./pages/Profile";
import {store, useGlobalState} from 'state-pool';
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProdcut";
import AllProducts  from "./components/AllProducts";
import NewNavigation from "./components/NewNavigation";
import NewHome from "./pages/NewHome";
import { FaPhoneSlash } from "react-icons/fa";

store.setState("currentUser", null);
store.setState("navigation", "/Login");
//store.setState("navigation");

function App() {
  const [currentUser, setCurrentUser] = useGlobalState("currentUser"); 
  const [navigation, setNav] = useGlobalState("navigation");

  //this useEffect function is what GETS the data which is being posted in the database.php file with $_POST
  useEffect(()=>{ 
    console.log(document.cookie);
    let current_user;
    if(document.cookie!=""){
      axios.get("https://i383988.hera.fhict.nl/database.php?session").then(function(response){
          current_user = response.data.user_id; 
          if(document.cookie == "current_user="+current_user){ 
            console.log("trying to log");
            axios({
              method: 'GET',
              url:"https://i383988.hera.fhict.nl/database.php?user_id="+current_user,
              config: {headers:{'Content-Type': 'multipart/form-data'}}
            }).then(function(response){
              setCurrentUser(response.data);
              setNav("/Profile");
            });
          }
        });
      }
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/newhome"><NewHome /></Route>
		  <Route exact path="/register"><Register /></Route>
		  <Route exact path="/login"><Login /></Route>
		  <Route exact path="/about"><About /></Route>
      <Route exact path="/chat"><Chat /></Route>
      <Route exact path="/chatMessage"><ChatMessage /></Route>
      <Route exact path="/profile"><Profile /></Route>
      <Route exact path="/updateinfo"><UpdateInfo /></Route>
      <Route exact path="/filter"><Filter/></Route>
      <Route exact path="/all" component={AllProducts} />
        <Route exact path="/add" component={AddProduct} />
        <Route exact path="/edit/:id" component={EditProduct} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;