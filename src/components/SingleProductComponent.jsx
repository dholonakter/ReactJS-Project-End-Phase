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

class SingleProductComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productList: [] };
    this.routeParam = props.match.params.parameterToAccess;
    user = store.getState("currentUser");
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const url =
      "https://i383988.hera.fhict.nl/database.php?get_productById=" + id;
    axios
      .get(url)
      .then((res) => {
        this.setState({ productList: res.data });
        console.log(res);
        const url2 =
          "https://i383988.hera.fhict.nl/database.php?user_id=" +
          this.state.productList.user_id;
        axios
          .get(url2)
          .then((res2) => {
            this.setState({ seller: res2.data });
            console.log(res2);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });

    // axios.get(url).then(response => response.data)
    // .then((data) => {
    //     this.setState({ productList: data});
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
                  Category: <h5 style={{ display: "inline" }}>Category 1</h5>
                </Typography>
                <Typography style={{ paddingBottom: "20px" }}>
                  Price:{" "}
                  <h5 style={{ display: "inline" }}>
                    {this.state.productList.product_price}
                  </h5>{" "}
                  euros
                </Typography>
                <Typography style={{ paddingBottom: "20px" }}>
                  Quantity Left: <h5 style={{ display: "inline" }}>5</h5>
                </Typography>
                <Typography style={{ paddingBottom: "20px" }}>
                  Seller: <h5 style={{ display: "inline" }}>Micheal</h5>
                </Typography>
                <Typography style={{ paddingBottom: "20px" }}>
                  Seller Rating: <h5 style={{ display: "inline" }}> 4.8 / 5</h5>
                </Typography>
              </Box>
            </Box>

            <Typography style={{ padding: "20px 0px" }}>
              {this.state.productList.product_description}
            </Typography>

            <Button
              variant="contained"
              size="large"
              style={{ marginTop: 15 }}
              onClick={() =>
                this.chatMessage(
                  user,
                  this.state.productList.user_id,
                  this.state.seller.firstname + " " + this.state.seller.lastname
                )
              }
            >
              Contact seller
            </Button>
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
