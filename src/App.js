import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Register, About } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
		  <Route path="/register" exact component={() => <Register />} />
          <Route path="/about" exact component={() => <About />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;