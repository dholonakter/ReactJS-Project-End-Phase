import React, { useState, useEffect } from "react";
import axios from 'axios';
import Buttons from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextFields from '@material-ui/core/TextField';
import Navigation from "../components/Navigation";
import ProfileNavigation from "../components/ProfileNavigation";
import Footer from "../components/Footer";
import {store, useGlobalState} from 'state-pool';
import Table from 'react-bootstrap/Table';


function UserHistory() {  
  const [currentUser, setCurrentUser] = useGlobalState("currentUser");
  const [navigation, setNav] = useGlobalState("navigation");
  const user = store.getState("currentUser");

  const [firstname, setFirstname] = useState('');
  const [l_name, setL_name] = useState('');
  const [phone, setPhone] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setCPassword] = useState('');

  const [street, setStreet] = useState('');
  const [statee, setStatee] = useState('');
  const [post, setPost] = useState('');
  const [country, setCountry] = useState('');


  function handleHistory(){  
    if(user.value != null){
      axios({
        method: 'GET',
        url:"https://i383988.hera.fhict.nl/database.php?get_address="+user.value.address_id,
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(function(response){
  
      });
 
    }else{
      document.querySelector("#home_nav").click();
    }
  
  }

  useEffect(()=>{
  }, []);

  function setExpiration(){
    let timestamp = new Date();
    timestamp.setDate(timestamp.getDate());
    timestamp.setHours(timestamp.getHours());
    timestamp.setMinutes(timestamp.getMinutes());
    timestamp.setSeconds(timestamp.getSeconds()+1);
    return timestamp;
  }

  const handleLogout = event => {
    event.preventDefault();
    if(user.value !=null){
      let formData = new FormData();
      formData.append('logout_user', 'Signing out');
      formData.append('user_id', user.value.id);
      axios({
        method: 'POST',
        url:'https://i383988.hera.fhict.nl/database.php?',
        data: formData,
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(function(response){
          setNav("/Login");
          setCurrentUser("");
          document.cookie="current_user= ; expires="+ setExpiration().toUTCString();
          alert("Successfully logged out!");
          document.querySelector("#home_nav").click();
      });
    }
  }

  const navigateUpdate = event =>{
    window.location.href="https://i383988.hera.fhict.nl/updateinfo";
  }

  return (
    <div className="app">   
     <div>
        <Navigation/>     
      </div>
      <div  className="userhistory">
      <div> 
      <ProfileNavigation/>
      </div>
      <div className="container">
        <div className="row align-items-center my-5">
       
          <div className="col-lg-12">
            
              <div className="row">  
              <div className="col-lg-12"><center>
                <Typography className="font-weight-light col-lg-12 text-right" variant="h5">Purchase History</Typography></center>
                </div>
              </div>
              <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <th key={index}>Table heading</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
                <tr>
                  <td>2</td>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
                <tr>
                  <td>3</td>
                  {Array.from({ length: 12 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
    <div> 
        <Footer/>
      </div>
    </div>
  );
}

//ReactDOM.render(<Register />, document.getElementById('root'));

export default UserHistory;