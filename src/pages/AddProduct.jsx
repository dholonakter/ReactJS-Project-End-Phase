import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { FormGroup, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import TextFields from '@material-ui/core/TextField';
import Buttons from '@material-ui/core/Button';
import imageCompression from 'browser-image-compression';
import {store, useGlobalState} from 'state-pool';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

class AddProduct extends React.Component {
	
	constructor(props){
	  super(props);
	  this.state = { 
	    user: store.getState("currentUser"),
	    productName: "",
		productDesc: "",
		price: null,
		parsedPrice: null,
		category: "",
		imgName: "",
		productImg: null,
	  };
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleNameChange = this.handleNameChange.bind(this);
	  this.handleDescChange = this.handleDescChange.bind(this);
	  this.handlePriceChange = this.handlePriceChange.bind(this);
	  this.handleCategoryChange = this.handleCategoryChange.bind(this);
	  this.handleImageChange = this.handleImageChange.bind(this);
	}
	
	handleNameChange(event){
	let textValue = event.target.value;
    this.setState({ productName: textValue });
  }
    handleDescChange(event){
	let textValue = event.target.value;
    this.setState({ productDesc: textValue });
  }
    handlePriceChange(event){
	let priceValue = event.target.value;
	let parsedValue = parseFloat(priceValue).toFixed(2);
	
	console.log(priceValue);
	console.log(parsedValue);
	
	let numStr = String(priceValue);
	let decimalAmt = 0;
   // String Contains Decimal
    if (numStr.includes('.')) {
      decimalAmt = numStr.split('.')[1].length;
    }
	
	if(decimalAmt > 2){		
      this.setState({ price: parsedValue });
	}else{
	  this.setState({ price: priceValue });
	}	
	this.setState({ parsedPrice: parsedValue });
  }
    handleCategoryChange(event){
    let catValue = event.target.value;
	this.setState({ category: catValue });
  }
    
	getCategoryId(category){
	  let categoryId = -1;
		switch(category){  // Based on the RadioGroup values
			case "book": 
			  categoryId = 1
			  break;
			case "accessory": 
			  categoryId = 2
			  break;
			case "bicycle": 
			  categoryId = 3
			  break;
			case "other":
			  categoryId = 4
			  break;
		}
	  return categoryId;
	}
    
    handleImageChange(event){
	  let that = this;
	  const img = event.target.files[0];
	  const options = {
	    maxSizeMB: 1,
	    maxWidthOrHeight: 400,
	    useWebWorker: true
	  }
	  imageCompression(img, options)
	    .then(function (compressedImg) {
		  that.setState({productImg: compressedImg});
		});
	    
	}
  
    handleSubmit(event){
	  if(this.validateForm()){
        let formData = new FormData();
	    let categoryId = this.getCategoryId(this.state.category);
	    let imageFile = this.state.productImg;
	    console.log(imageFile);

	    formData.append('add_product', 'adding product');
        formData.append('user_id', this.state.user.value.id);
	    formData.append('product_name', this.state.productName);
	    formData.append('product_description', this.state.productDesc);
	    formData.append('product_price', this.state.price);
	    formData.append('category_id', categoryId);
	    formData.append('product_image', imageFile);
	    for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
        }
          axios({
            method: 'POST',
            url:'https://i383988.hera.fhict.nl/database.php?',
            data: formData,
            config: {headers:{'Content-Type': 'multipart/form-data'}}
          }).then(function(response){
            alert("Your product has been listed");
          })
	  }     
    }
	
	validateForm(){
		let alertString = "";
		let validForm = true;
		if(this.state.user.value == null){
			alert("Not signed into an account!");
			validForm = false;
			return validForm;
		}
		if(this.state.productName == null || !(/\S/.test(this.state.productName))){
			alertString += "The product name is empty.\n";
			validForm = false;
		}
		if(this.state.productDesc == null || !(/\S/.test(this.state.productDesc))){
			alertString += "The product description is empty.\n";
			validForm = false;
		}
		if(Number.isNaN(this.state.parsedPrice) || !(/\S/.test(this.state.parsedPrice)) || this.state.parsedPrice <= 0 || this.state.parsedPrice == "NaN"){
			alertString += "The price is not a valid positive number.\n";
			validForm = false;
		}
		if(this.getCategoryId(this.state.category) == -1){
			alertString += "No category has been selected for your product.\n";
			validForm = false;
		}
		if(this.state.productImg == null){
			alertString += "No image has been added for your product.\n";
			validForm = false;
		}
		if(!validForm){
			alert(alertString);
		}
		return validForm;
	}

  render(){	
  
  return (
	<div className="app">   
     <div>
        <Navigation/>    
      </div>
    <div className="register">
  
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-2">
            
          </div>
          <div className="col-lg-8">
            
              <div className="row">
                
              <div className="col-lg-10"><center>
                <Typography className="font-weight-light" variant="h2">Add Product</Typography></center>
                </div>
              </div>
            
            
            <p></p>

            <form>

              <div className="row">
                <Typography className="font-weight-light col-lg-12" variant="h4">Product Information</Typography>
              </div>

              <p></p>
              
              <div className="row">
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" type="text" name="p_name" label="Product Name" value={this.state.productName} variant="outlined"
                  onChange={this.handleNameChange}
                  />
              </div>

              <p></p>

              <div className="row">
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" type="text" name="p_desc" label="Product Description" value={this.state.productDesc} variant="outlined"
				  onChange={this.handleDescChange}
                  />
              </div>

              <p></p>
              
              <div className="row">
                  <div className="col-lg-1"></div>
                  <TextFields required
                  className="col-lg-11" variant="outlined" label="Price" type="number" name="price" value={this.state.price} onChange={this.handlePriceChange}
                  />
              </div>

              <p></p>

              <FormControl component="fieldset">
                <FormLabel component="legend">Category</FormLabel>
                  <RadioGroup
                    aria-label="category"
                    name="radio-buttons-group"
					value={this.state.category}
					onChange={this.handleCategoryChange}
                  >
                    <FormControlLabel value="book" control={<Radio />} label="Book" />
                    <FormControlLabel value="accessory" control={<Radio />} label="Accessory" />
                    <FormControlLabel value="bicycle" control={<Radio />} label="Bicycle" />
					<FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
              </FormControl>

              <p></p>
			  
			  <div className="row">
                  <div className="col-lg-1"></div>
                  <input type="file" name="image" id="image"accept=".jpg,.jpeg,.png"onChange={this.handleImageChange} />
              </div>
                 
              <div className="row">
                  <div className="col-lg-10">
                    
                  </div>
                  <Buttons className="col-lg-2" variant="contained" color="primary" onClick={this.handleSubmit}>Add product</Buttons>
              </div>

            </form>
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
export default AddProduct;