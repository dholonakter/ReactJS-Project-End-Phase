import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { store, useGlobalState } from "state-pool";

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
import ChatIcon from '@material-ui/icons/Chat';
import Navigation from "../components/Navigation";
import ProfileNavigation from "../components/ProfileNavigation";
import Footer from "../components/Footer";
import Table from 'react-bootstrap/Table';

var user;

function renderStatusOptions(currentStatus, orderContext, order, orderType){
	console.log(order);
	if(currentStatus.toLowerCase() == "pending payment"){
		return(
		<List sx={{ pt: 0 }}>
         <ListItem 
		    button onClick={()=> {orderContext.updateStatus(order.id, "Received payment"); orderContext.setState( {open: !orderContext.state.open}); }} >
            <ListItemText primary="Received payment" />
          </ListItem>
		    <ListItem button onClick={()=> {orderContext.updateStatus(order.id, "Cancelled"); orderContext.setState( {open: !orderContext.state.open}); }} >
            <ListItemText primary="Cancel order" />
          </ListItem>          
      </List>
	)
	}else if (currentStatus.toLowerCase() == "received payment"){
		return(
		<List sx={{ pt: 0 }}>
         <ListItem 
		    button onClick={()=> {orderContext.updateStatus(order.id, "Product shipped"); orderContext.setState( {open: !orderContext.state.open}); }} >
            <ListItemText primary="Product shipped" />
          </ListItem>
		    <ListItem button onClick={()=> {orderContext.updateStatus(order.id, "Cancelled"); orderContext.setState( {open: !orderContext.state.open}); }} >
            <ListItemText primary="Cancel order" />
          </ListItem>          
      </List>
	  )
	}else if (currentStatus.toLowerCase() == "product shipped" && orderType == "purchase"){
		return(
		<List sx={{ pt: 0 }}>
		 <ListItem 
		    button onClick={()=> {orderContext.updateStatus(order.id, "Product received"); orderContext.setState( {open: !orderContext.state.open}); }} >
            <ListItemText primary="Product received" />
          </ListItem>
		    <ListItem button onClick={()=> {orderContext.updateStatus(order.id, "Cancelled"); orderContext.setState( {open: !orderContext.state.open}); }} >
            <ListItemText primary="Cancel order" />
          </ListItem>                 
      </List>
	  )
	}else if (currentStatus.toLowerCase() == "product shipped" && orderType == "sale"){
		return(
		<List sx={{ pt: 0 }}>
		    <ListItem button onClick={()=> orderContext.setState( {open: !orderContext.state.open})} >
            <ListItemText primary="Close" />
          </ListItem>          
      </List>
	  )
	}
	
}

function renderDialogs(currentStatus, orderContext, order, orderType){
	if(orderType == "purchase" && currentStatus.toLowerCase() == "product shipped" ){
		return(
		<div>
					<td><Buttons
                  variant="contained"
                  size="small"
                  color="primary"
				  onClick={()=> {orderContext.setState( {open: !orderContext.state.open}); orderContext.setState( {currentId: order.id} ) }}
                >
                  Update status
                </Buttons></td>
	  <Dialog
			  open={orderContext.state.open && orderContext.state.currentId == order.id}
			  onClose={()=>orderContext.setState( {open: !orderContext.state.open}) }
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
              
			  {renderStatusOptions(order.order_status, orderContext, order, orderType)}
			  
          </Box>
			  </DialogContent>
      </Dialog>
	  </div>
	)
	}else if (orderType == "sale" && (currentStatus.toLowerCase() == "pending payment" || currentStatus.toLowerCase() == "payment received")){
		return(
		<div>
					<td><Buttons
                  variant="contained"
                  size="small"
                  color="primary"
				  onClick={()=> {orderContext.setState( {open: !orderContext.state.open}); orderContext.setState( {currentId: order.id} ) }}
                >
                  Update status
                </Buttons></td>
	  <Dialog
			  open={orderContext.state.open && orderContext.state.currentId == order.id}
			  onClose={()=>orderContext.setState( {open: !orderContext.state.open}) }
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
              
			  {renderStatusOptions(order.order_status, orderContext, order, orderType)}
			  
          </Box>
			  </DialogContent>
      </Dialog>
	  </div>
	)
	}
}

class UserHistory extends React.Component {    
  constructor(props){
    super(props);
    this.state = {
      buyOrders: [],
	  buyOrderDetails: [],
	  sellOrders: [],
	  sellOrderDetails: [],
      loaded: false,    
      open: false,
	  currentId: 0
    };
        user = store.getState("currentUser");
	//this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount(){
	this.getOrders();	
  }
  
  getOrders(){	  
	   if(user.value != null){
		   let that = this;
		 // get buyer orders
      axios({
        method: 'GET',
        url:"https://i383988.hera.fhict.nl/database.php?get_buyer_orders="+user.value.id,
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(function(response){
        if(response.data != null){
			that.setState( {buyOrders: response.data} );			
		}
		// get seller orders
		axios({
        method: 'GET',
        url:"https://i383988.hera.fhict.nl/database.php?get_seller_orders="+user.value.id,
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(function(response){
        if(response.data != null){
			that.setState( {sellOrders: response.data} );
			console.log(response);
		}
      });
      });
 
    }else{
      document.querySelector("#home_nav").click();
    }	 
  }    
  
  updateStatus(orderId, newStatus){
	  let formData = new FormData();
	  let that = this;
	  console.log (orderId, newStatus);
    formData.append("update_status", "updating status");
	formData.append("id", orderId);
    formData.append("order_status", newStatus);
    axios({
        method: "POST",
        url: "https://i383988.hera.fhict.nl/database.php?",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      }).then(function (response) {
        console.log(response);
		that.getOrders();
        alert("Status update has been processed");
      });
  }
  
  handleHistory(){  
    if(this.state.user.value != null){
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


  setExpiration(){
    let timestamp = new Date();
    timestamp.setDate(timestamp.getDate());
    timestamp.setHours(timestamp.getHours());
    timestamp.setMinutes(timestamp.getMinutes());
    timestamp.setSeconds(timestamp.getSeconds()+1);
    return timestamp;
  }
  
  chatMessage(currUser, a, b) {
    if (currUser.value == null) {
      alert("Please log into your account before contacting the seller");
    } else {
      this.props.history.push("/chatMessage", {
        id: currUser.value.id,
        targetid: a,
        name: b,
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
                <Typography className="font-weight-light col-lg-12 text-right" variant="h5">My Purchases</Typography></center>
                </div>
              </div>
              <Table responsive>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Ordered by</th>
				  <th>Item name</th>
				  <th>Order Status</th>
                </tr>
              </thead>
			  
			   <tbody>
               {
               this.state.buyOrders.map(order => {
                 return(
                  <tr>
                    <td>{order.id}</td>
					<td><Buttons
			  variant="text"
			  color="primary"
              size="small"
              startIcon={<ChatIcon/>}
              onClick={() =>this.chatMessage(user, order.user_id, order.firstname)
              }
            >
			{order.firstname}
            </Buttons></td>
                    <td><a href={'/singleproductpage/' + order.product_id}>{order.product_name}</a></td>
                    <td>{order.order_status}</td>
					
			       {renderDialogs(order.order_status, this, order, "purchase")}
				
				
                  </tr>
                 );
              })} 
              </tbody>
            </Table>
          </div>
		  
		  <div className="col-lg-12">
            
              <div className="row">  
              <div className="col-lg-12"><center>
                <Typography className="font-weight-light col-lg-12 text-right" variant="h5">My Sales</Typography></center>
                </div>
              </div>
              <Table responsive>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Ordered from</th>
				  <th>Item name</th>
				  <th>Order Status</th>
                </tr>
              </thead>
			  
			   <tbody>
               {
               this.state.sellOrders.map(order => {
                 return(
                  <tr>
                    <td>{order.id}</td>
					<td><Buttons
			  variant="text"
			  color="primary"
              size="small"
              startIcon={<ChatIcon/>}
              onClick={() =>this.chatMessage(user, order.user_id, order.firstname)
              }
            >
			{order.firstname}
            </Buttons></td>
                    <td><a href={'/singleproductpage/' + order.product_id}>{order.product_name}</a></td>
                    <td>{order.order_status}</td>
			  {renderDialogs(order.order_status, this, order, "sale")}
                  </tr>
				  
                 );
              })} 
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
}

//ReactDOM.render(<Register />, document.getElementById('root'));

export default withRouter(UserHistory);