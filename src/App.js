import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Chat from "./pages/Chat";
import axios from 'axios'

function App() {
  const [name, setName] = useState("")
  const [home, setHome]= useState("")
  // this useEffect function is what GETS the data which is being posted in the database.php file with $_POST
  useEffect(()=>{
    axios.get("https://i383988.hera.fhict.nl/database.php").then(function(response){
      setHome(response.data);
    })
  }, [])

  //these post dont work yet so you can ignore them
  async function postName(e){
    e.preventDefault()
    try{
      await axios.post("https://i383988.hera.fhict.nl/database.php",{
        name
      })
    } catch(error){
      console.log(error)
    }
  }
  async function post(e){
    e.preventDefault()
    const Data = new FormData();
    Data.append('submit', 'works');
    //try{
      await axios.post('https://i383988.hera.fhict.nl/database.php', Data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
    })
    //} catch(error){
    //  console.log(error)
    //}
  }
  return (
    <div className="App">
      {/* <form onSubmit={postName}> 
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        <button type="submit" onclick={postName}> Send Name</button>
        <button  onclick={post}> Send Name</button>
        </form> */}
        {home}
      <Router>
        <Switch>
          <Route exact path="/"><Home /></Route>
		  <Route exact path="/register"><Register /></Route>
		  <Route exact path="/login"><Login /></Route>
		  <Route exact path="/about"><About /></Route>
      <Route exact path="/chat"><Chat /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;