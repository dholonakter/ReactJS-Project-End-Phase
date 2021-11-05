import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"><Home /></Route>
		  <Route exact path="/register"><Register /></Route>
		  <Route exact path="/login"><Login /></Route>
		  <Route exact path="/about"><About /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;