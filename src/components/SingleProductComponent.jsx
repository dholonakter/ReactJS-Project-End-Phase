import { useState, useEffect } from "react";
//import {FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import React from "react";
import { useHistory, useParams } from "react-router-dom";
//import { getProducts} from '../Service/api';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, Container, Grid } from "@mui/material";
import ReactDOM from "react-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router";
import { store, useGlobalState } from "state-pool";
import { Box } from "@mui/system";
import img from "../assests/images/bike.jpg";

var user;

function renderProductButtons(buyer, sellerId, product){
    if(buyer.value == null || buyer.value.id != sellerId){
		return(
		<div>
		 <Button
              variant="outlined"
              size="large"
              style={{ marginTop: 15 , marginRight: 5}}
              onClick={() =>
                product.chatMessage(user, product.state.productList.user_id, product.state.seller.firstname+" "+product.state.seller.lastname)
              }
            >
              Contact seller
            </Button>
			<Button
              variant="contained"
              size="large"
              style={{ marginTop: 15, marginLeft: 5}}
              onClick={() =>
			  product.createOrder(user, product.state.productList.user_id, product.state.productList.id)
			  }
            >
              Order this item
            </Button>
		</div>
		)
    }else {
	  return;
	}	
}

class SingleProductComponent extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = { productList :[], seller: []};
        this.routeParam = props.match.params.parameterToAccess;
        user = store.getState("currentUser");
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const url = 'https://i383988.hera.fhict.nl/database.php?get_productById='+id
        axios.get(url)
            .then(res => {
                this.setState({ productList : res.data });
                console.log(res)
            const url2 = 'https://i383988.hera.fhict.nl/database.php?user_id='+this.state.productList.user_id
            axios.get(url2)
                .then(res2 => {
                    this.setState({ seller : res2.data });
                    console.log(res2)
                })
                .catch(function (error) {
                    console.log(error);
                })
            })
            .catch(function (error) {
                console.log(error);
            })
            
            
        // axios.get(url).then(response => response.data)
        // .then((data) => {
        //     this.setState({ productList: data});
    } 
	
	getDateTime() {
      let timestamp = new Date();
      timestamp.setDate(timestamp.getDate());
      timestamp.setHours(timestamp.getHours());
      timestamp.setMinutes(timestamp.getMinutes());
      timestamp.setSeconds(timestamp.getSeconds());
      return timestamp;
    }
	
	getCategoryName(categoryId){
		switch(categoryId){
			case "1":
			  return "Books"
			  break;
			case "2":
			  return "Accessories"
			  break;
			case "3":
			  return "Bicycles"
			  break;
			case "4":
			  return "Other"
			  break;
		}
	}
	
	createOrder(buyer, sellerId, productId){
	  if(buyer.value == null){
            alert("Please log into your account to order this item")
        }else{
			const url = "https://i383988.hera.fhict.nl/database.php?get_order="+productId;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        if(data != null){
			alert("Product has already been ordered")
		}else{
			let formData = new FormData();
		formData.append("create_order", "Create order");
	    formData.append("product_id", productId);
        formData.append("buyer_id", buyer.value.id);
	    formData.append("seller_id", sellerId);
		formData.append("order_status", "Pending payment");
        axios({
          method: "POST",
          url: "https://i383988.hera.fhict.nl/database.php?",
          data: formData,
         config: { headers: { "Content-Type": "multipart/form-data" } },
        }).then(function (response) {
			console.log(response);
        });
		}
      });			
		}	  
	}

  GetProductId = () => {
    console.log(this.state.productList.product_img);
  };

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

  render() {
    return (
      <div class="product">
        <div>
          <Navigation />
        </div>

        <div className="container text-left">
          <header>
            <hgroup>
              {/* <h1>{item.title}</h1> */}
              <h3>{this.state.productList.product_name}</h3>
            </hgroup>
          </header>

          <div style={{ height: "80vh" }}>
            <Box display="flex" pt={3}>
              <Box>
                <div style={{ width: 400, height: 350 }}>
                  <img
                    style={{ width: 400, height: 350, objectFit: "cover" }}
                    src={`data:image/png;base64,${this.state.productList.product_image}`}
                    alt="..."
                  />
                </div>
              </Box>

              <Box pl={5}>
                <Typography style={{ paddingBottom: "20px" }}>
                  Category: <h5 style={{ display: "inline" }}>{ this.getCategoryName(this.state.productList.category_id) }</h5>
                </Typography>
                <Typography style={{ paddingBottom: "20px" }}>
                  Price:{" € "}
                  
                  <h5 style={{ display: "inline" }}>
                    {this.state.productList.product_price}
                  </h5>
                </Typography>
                <Typography style={{ paddingBottom: "20px" }}>
                  Quantity Left: <h5 style={{ display: "inline" }}>5</h5>
                </Typography>
                <Typography style={{ paddingBottom: "20px" }}>
                  Seller: <h5 style={{ display: "inline" }}>{this.state.seller.firstname}</h5>
                </Typography>
                <Typography style={{ paddingBottom: "20px" }}>
                  Seller Rating: <h5 style={{ display: "inline" }}> 4.8 / 5</h5>
                </Typography>
              </Box>
            </Box>

            <Typography style={{ padding: "20px 0px" }}>
              {this.state.productList.product_description}
            </Typography>
            	{ renderProductButtons(user, this.state.productList.user_id, this) }
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default SingleProductComponent;
