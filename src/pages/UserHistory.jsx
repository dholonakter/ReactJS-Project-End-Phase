import React, { useState, useEffect } from "react";
import axios from 'axios';
import Buttons from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
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
  
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");

   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
	console.log("closed");
  };
  
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
                <Typography className="font-weight-light col-lg-12 text-right" variant="h5">Order History</Typography></center>
                </div>
              </div>
              <Table responsive>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Ordered by</th>
				  <th>Item name</th>
				  <th>Price</th>
				  <th>Order Status</th>
				  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><a href="#">Ryan Meijs</a></td>
				  <td><a href="/singleproductpage/16">Visual C# How to Program 6th edition</a></td>
				  <td>€35.00</td>
				  <td>Pending payment</td>
				  <td>
				  <Buttons
                  variant="contained"
                  size="small"
                  color="primary"
				  onClick={handleClickOpen}
                >
                  Update status
                </Buttons>
				</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><a href="#">Jan Muller</a></td>
				  <td><a href="/singleproductpage/20">2nd hand bicycle</a></td>
				  <td>€30.00</td>
				  <td>Payment received</td>
				  <td><Buttons
                  variant="contained"
                  size="small"
                  color="primary"
				  onClick={handleClickOpen}
                >
                  Update status
                </Buttons>
				</td>
                </tr>
                 <tr>
                  <td>3</td>
                  <td><a href="#">Alex Aver</a></td>
				  <td><a href="/singleproductpage/23">Javascript Programming Book</a></td>
				  <td>€10.00</td>
				  <td>Complete</td>				  
                </tr>
              </tbody>
            </Table>
			<Dialog
			  open={open}
			  onClose={handleClose}
			>
			  <DialogTitle>Update order status</DialogTitle>
			  <DialogContent>
			    <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
              <List sx={{ pt: 0 }}>
         <ListItem 
		    button onClick={handleClose} >
            <ListItemText primary="Received payment" />
          </ListItem>
		    <ListItem button onClick={handleClose} >
            <ListItemText primary="Cancel order" />
          </ListItem>
          
      </List>
          </Box>
			  </DialogContent>
			</Dialog>
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