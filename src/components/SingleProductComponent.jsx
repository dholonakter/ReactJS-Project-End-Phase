import { useState, useEffect } from 'react';
//import {FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import React from "react";
import { useHistory, useParams } from 'react-router-dom';
//import { getProducts} from '../Service/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import { Typography } from '@material-ui/core';
import { withRouter } from "react-router";
import { store, useGlobalState } from "state-pool";


var user;

class SingleProductComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = { productList :[]};
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

    GetProductId = () => {
        console.log(this.state.productList.product_img)
       
    }

    chatMessage(currUser, a, b) {
        if(currUser.value == null){
            alert("Please log into your account before contacting the seller")
        }else{
            this.props.history.push("/chatMessage", {id: currUser.value.id, targetid: a, name: b});
        }
        
    }

    render(){
        return(
            <div class="product">
                <div>
                    <Navigation />
                </div>
                <CardActionArea>
                    <header>
                        <hgroup>
                            {/* <h1>{item.title}</h1> */}
                            <h1>{this.state.productList.product_name}</h1>
                        </hgroup>
                    </header>
                    
                    <figure>
                    <img width="300" height="300" src={`data:image/png;base64,${this.state.productList.product_image}`}  alt="..." />
                    </figure>

                    <CardContent>

                        <Typography>{this.state.productList.product_description}</Typography>

                        <details>
                        <summary>Product Features</summary>
                            <ul>
                            <li>feature 1</li>
                            <li>feature 2</li>
                            <li>feature 3</li>
                            <li>feature 4</li>
                            <li>feature 5</li>
                            <li>feature 6</li>
                            </ul>
                        </details>
                        <p>Price: {this.state.productList.product_price} euros</p>

                        <button onClick={() => this.chatMessage(user, this.state.productList.user_id, this.state.seller.firstname+" "+this.state.seller.lastname)}>Contact seller</button>
                        {/* onClick={() => this.chatMessage(user.value.id, row.id, row.name)} */}
                </CardContent>
                   

                </CardActionArea>
           <div><Footer /></div>
</div>
        )
    }
}

export default SingleProductComponent;