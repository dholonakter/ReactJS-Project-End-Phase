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
    this.setState({ price: priceValue });
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
      let formData = new FormData();
	  let categoryId = this.getCategoryId(this.state.category);
	  let imageFile = this.state.productImg;
	  console.log(imageFile);
      let valid = 1;
      if(categoryId != -1 && this.state.productName != "" && this.state.productDesc != "" && this.state.price != null && imageFile != null && this.state.user.value.id != null){}else{
        valid = 0;
        alert("Something went wrong!");
      }
	  

      if(valid == 1){	
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
          console.log(response);
          console.log('Product added');
          alert("Your product has been listed");
        })
      }
      else{
        alert("Please enter valid data!");
      }
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