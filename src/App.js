import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Filter from "./pages/Filter";
import Register from "./pages/Register";
import UpdateInfo from "./pages/UpdateInfo";
import Login from "./pages/Login";
import About from "./pages/About";
import Chat from "./pages/Chat";
import UserProducts from "./pages/UserProducts";
import UserHistory from "./pages/UserHistory";
import ChatMessage from "./pages/ChatMessage";
import axios from "axios";
import Verification from "./pages/Verification";
import Profile from "./pages/Profile";
import { store, useGlobalState } from "state-pool";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./components/EditProdcut";
import AllProducts from "./components/AllProducts";
import ForgotPassword from "./pages/ForgotPassword";
import Navigation from "./components/Navigation";
//import Redirect from "./components/home.php";
import Home from "./pages/Home";
import ProfileNavigation from "./components/ProfileNavigation";
import { FaPhoneSlash } from "react-icons/fa";
import SingleProductComponent from "./components/SingleProductComponent";

store.setState("currentUser", null);
store.setState("navigation", "/Login");
//store.setState("navigation");

function App() {
  const [currentUser, setCurrentUser] = useGlobalState("currentUser");
  const [navigation, setNav] = useGlobalState("navigation");
  //this useEffect function is what GETS the data which is being posted in the database.php file with $_POST
  useEffect(() => {
    let current_user;
    let user_id;
    if (document.cookie != "") {
      user_id = document.cookie.replace('current_user=', '');
      axios({
        method: "GET",
        url: "https://i383988.hera.fhict.nl/database.php?session="+user_id,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      }).then(function (response) {
          current_user = response.data.user_id;
          if (document.cookie == "current_user=" + current_user) {
            axios({
              method: "GET",
              url: "https://i383988.hera.fhict.nl/database.php?user_id=" + current_user,
              config: { headers: { "Content-Type": "multipart/form-data" } },
            }).then(function (response) {
              setCurrentUser(response.data);
              setNav("/Profile");
            });
          }
        });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
          <Route exact path="/chatMessage">
            <ChatMessage />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/updateinfo">
            <UpdateInfo />
          </Route>
          <Route exact path="/userproducts">
            <UserProducts />
          </Route>
          <Route exact path="/verification">
            <Verification />
          </Route>
          <Route exact path="/ForgotPassword">
            <ForgotPassword />
          </Route>
          <Route exact path="/userhistory">
            <UserHistory />
          </Route>
          <Route exact path="/filter">
            <Filter />
          </Route>
          {/* <Route exact path="/redirect">
            <Redirect />
		  </Route> */}
          <Route exact path="/all" component={AllProducts} />
          <Route exact path="/add" component={AddProduct} />
          <Route exact path="/edit/:id" component={EditProduct} />
          <Route
            exact
            path="/SingleProductPage/:id"
            component={SingleProductComponent}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
