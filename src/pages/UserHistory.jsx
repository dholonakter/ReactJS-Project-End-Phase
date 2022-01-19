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


class UserHistory extends React.Component {    
  constructor(props){
    super(props);
    this.state = {
      currentUser: store.getState("currentUser"),
	  navigation: store.getState("navigation"),
	  user: store.getState("currentUser"),
      buyOrders: [],
	  sellOrders: [],
      loaded: false,    
      openDialog: false,
    };
	//this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount(){
    this.getOrders();
  }
  
  handleClickOpen(){
    this.setState( {openDialog: true} );
  }

  handleClose = () => {
    this.setState( {openDialog: false} );
  };
  
  getOrders(){
	  
	   if(this.state.user.value != null){
		   let that = this;
		 // get buyer orders
      axios({
        method: 'GET',
        url:"https://i383988.hera.fhict.nl/database.php?get_buyer_orders="+that.state.user.value.id,
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(function(response){
        if(response.data != null){
			that.setState( {buyOrders: response.data} );
		}
		// get seller orders
		axios({
        method: 'GET',
        url:"https://i383988.hera.fhict.nl/database.php?get_seller_orders="+that.state.user.value.id,
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(function(response){
        if(response.data != null){
			that.setState( {sellOrders: response.data} );
		}
      });
      });
 
    }else{
      document.querySelector("#home_nav").click();
    }
	  
	 
  }
  
  getProductById(productId){
	  let product = [];
	  const url = 'https://i383988.hera.fhict.nl/database.php?get_productById='+productId
        axios.get(url)
            .then(res => {
				console.log(res);
                product = res.data.product_name;
				return product;
				});
  }
  
  getUserNameById(userId){
	  let user = ""
	  const url = 'https://i383988.hera.fhict.nl/database.php?user_id='+userId
        axios.get(url)
            .then(res => {
				console.log(res);
                user = res.data.firstname + " " + res.data.lastname;
				return user;
				});
  }
  
  handleHistory(){  
    if(this.state.user.value != null){
      axios({
        method: 'GET',
        url:"https://i383988.hera.fhict.nl/database.php?get_address="+this.state.user.value.address_id,
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(function(response){
  
      });
 
    }else{
      document.querySelector("#home_nav").click();
    }
  
  }


  setExpiration(){
    let timestamp = new Date();
    timestamp.setDate(timestamp.getDate());
    timestamp.setHours(timestamp.getHours());
    timestamp.setMinutes(timestamp.getMinutes());
    timestamp.setSeconds(timestamp.getSeconds()+1);
    return timestamp;
  }

  handleLogout(event){
    event.preventDefault();
    if(this.state.user.value !=null){
      let formData = new FormData();
      formData.append('logout_user', 'Signing out');
      formData.append('user_id', this.state.user.value.id);
      axios({
        method: 'POST',
        url:'https://i383988.hera.fhict.nl/database.php?',
        data: formData,
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(function(response){
          this.setState({navigation: "/Login"});
          this.setState({currentUser: ""});
          document.cookie="current_user= ; expires="+ this.setExpiration().toUTCString();
          alert("Successfully logged out!");
          document.querySelector("#home_nav").click();
      });
    }
  }

  navigateUpdate(event){
    window.location.href="/updateinfo";
  }

render(){
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
				  <th>Order Status</th>
				  <th>Action</th>
                </tr>
              </thead>
			  
			   <tbody>
               {
               this.state.buyOrders.map(order => {
                 return(
                  <tr>
                    <td>{order.id}</td>
					<td>{this.getUserNameById(order.seller_id)}</td>
                    <td><a href={'/singleproductpage/' + order.product_id}>{this.getProductById(order.product_id)}	</a></td>
                    <td>{order.order_status}</td>
					<td><Buttons
                  variant="contained"
                  size="small"
                  color="primary"
				  onClick={this.handleClickOpen}
                >
                  Update status
                </Buttons></td>
                  </tr>
                 );
              })} 
              </tbody>
            </Table>
			<Dialog
			  open={this.openDialog}
			  onClose={this.handleClose}
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
		    button onClick={this.handleClose} >
            <ListItemText primary="Received payment" />
          </ListItem>
		    <ListItem button onClick={this.handleClose} >
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
}

//ReactDOM.render(<Register />, document.getElementById('root'));

export default UserHistory;