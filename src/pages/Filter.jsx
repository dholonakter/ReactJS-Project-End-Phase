import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Typography, TextField, Button, Slider, Checkbox, FormGroup, FormControlLabel} from '@material-ui/core';

import NewNavigation from "../components/NewNavigation"
import Footer from "../components/Footer"

class Filter extends React.Component {
	
  constructor(props){
	  super(props);
	  this.state = { 
	    products: [], 
		filteredProducts: [],
		nameValue: "",
		categories: [ // number of categories = number of values
		{
		  id: 1,
		  label: "Books",
		},
        {
		  id: 2,
		  label: "Accessories",
		},		
		{
		  id: 3,
		  label: "Bicycles",
		},		
		],
		bookSelected: true,
		accSelected: true,
		bikeSelected: true,
		//priceValue: 100,
		//sliderValue: 500,
		priceValue: [0, 1000],
		sliderValue: [0, 1000],
		marks:[
		{
			value: 0,
			label: "€0",
		},
		{
			value: 500,
			label: "€100",
		},
		{
			value: 1000,
			label: "€1000",
		},
		]
	  };
	  // Fixes undefined error when setting the state
	  this.handleFilter = this.handleFilter.bind(this);
	  this.handleReset = this.handleReset.bind(this);
	  this.handleSlideChange = this.handleSlideChange.bind(this);
	  this.handleCheckChange = this.handleCheckChange.bind(this);
	  this.handleTextChange = this.handleTextChange.bind(this);
  }
	
  componentDidMount(){
	const url = 'https://i383988.hera.fhict.nl/searchProduct/searchProduct.php?';
	axios.get(url).then(response => response.data)
	.then((data) => {
		this.setState({ products: data});
		this.setState({ filteredProducts: data});
	})
  }
  
   
  filterList(){
	    let productList = this.state.products;
		let filteredList = [];
		let nameValue = this.state.nameValue;
		let categories = this.state.categories;
		let priceValue = this.state.priceValue;
		console.log(priceValue);
		
		for( let product of productList) {
		  let priceCheck = false;
		  let catCheck = false;
		  let nameCheck = false;
		  
		  for(let cat of categories){
			if(product.category_id == 1 && this.state.bookSelected){
			  catCheck = true;  
		    }else if(product.category_id == 2 && this.state.accSelected){
			  catCheck = true;
			}
			else if(product.category_id == 3 && this.state.bikeSelected){
			  catCheck = true;
			}
		  }
		  if(product.product_description.toLowerCase().indexOf(nameValue.toLowerCase()) == 0 || nameValue == ""){
				nameCheck = true;
			}
		  if(product.product_price >= priceValue[0] && product.product_price <= priceValue[1]){
				priceCheck = true;
			}
          if(priceCheck && catCheck && nameCheck){
			filteredList.push(product);
		  }	
		}
		return filteredList;
		
	}
	
  handleTextChange(event){
	let textValue = event.target.value;
    this.setState({ nameValue: textValue }, () => {
      this.handleFilter();
    });
  }	
	
  handleCheckChange(event){
    switch(event.target.name){
	  case "Books":
	    this.setState({ bookSelected: event.target.checked }, () => {
          this.handleFilter();
		});
	    break;
	  case "Accessories": 
	    this.setState({ accSelected: event.target.checked }, () => {
          this.handleFilter();
        });
	    break;
	  case "Bicycles": 
	    this.setState({ bikeSelected: event.target.checked }, () => {
          this.handleFilter();
        });
	    break;
	}	
  }
	
  handleSlideChange(event, value){
	//let newValue = [];
    let lowerValue = value[0];
    let	upperValue = value[1];
	console.log(upperValue);
	console.log(lowerValue);
	lowerValue = this.calculateValue(lowerValue);
	upperValue = this.calculateValue(upperValue);
	let newValue = [lowerValue, upperValue];
	//let scaledValue = this.calculateValue(value);
	this.setState({ priceValue: newValue });
	this.setState({ sliderValue: value });
	this.handleFilter();
  }
  
  valueLabelFormat(value){ // Not using the calculateValue function here - It causes an error as it doesn't get defined properly.
	let newValue = value; 
	if(value < 500){
		newValue = value / 5;
	}else{
		newValue = ((value - 500) / 5 * 9) + 100;
		
	}
	  let valueText = `€${newValue}`;
	  
	  return valueText;
  }
  
  calculateValue(value){
	let newValue = value;
	if(value < 500){
		newValue = value / 5;
	}else{
		newValue = ((value - 500) / 5 * 9) + 100;
		
	}
	return newValue
  }
  
  getCategoryName(value){
	let catName;
	for (let cat of this.state.categories){
	  if (value == cat.id){
		catName = cat.label;
	  }
	}
	return catName;
  }
	
  handleFilter(){
	  this.setState({ filteredProducts: this.filterList()});
  }
  
  handleReset(){
	this.setState({ filteredProducts: this.state.products});
  }
	
  render(){	
  
  return (
    <div className="filter">	 
	<div>
        <NewNavigation/>    
    </div> 
      <div className="container">
	    <div className="col-xs-8">
		  <h1> Search products </h1>
		  <div className="prod-search">
            <div className="prod-search-result">
		      <table className="table table-striped">
		      <thead className="thead-light">
			    <tr>
			    <th>Name</th>
			    <th>Price</th>
			    <th>Category</th>
				</tr>
			  </thead>
			  <tbody>
			  {this.state.filteredProducts.map((pr, index) => (
			    <tr key={index}>
			      <td>{pr.product_description}</td>
			      <td>{pr.product_price}</td>
			  	  <td>{this.getCategoryName(pr.category_id)}</td>
			    </tr>
			  ))}
			  </tbody>
		    </table>
            </div>
            <div className="prod-search-filter">
			  <div className="prod-search-name">
			    <TextField
				  label="Name"
				  id="name-search"
				  size="small"
				  value={this.state.nameValue}
				  onChange={this.handleTextChange}
				/>
			  </div>
			  <div className="prod-search-price">
			    <Typography>Price</Typography>
			    <Slider
				  value={this.state.sliderValue}
				  defaultValue={100}
				  //aria-label="Price slider"
				  getAriaLabel={() => 'Temperature range'}
				  //getAriaValueText={this.valueLabelFormat}
				  valueLabelFormat={this.valueLabelFormat}
				  step={20}
				  min={0}
                  max={1000}
				  marks={this.state.marks}
				  onChange={this.handleSlideChange}
				  valueLabelDisplay="auto"
				/>				
			  </div>
			  <div className="prod-search-cat">
			    <FormGroup>
				  <FormControlLabel 
				    control={
					  <Checkbox checked={this.state.bookSelected} onChange={this.handleCheckChange} name="Books"/>
				    } label="Books" />
				  <FormControlLabel 
				    control={
					  <Checkbox checked={this.state.accSelected} onChange={this.handleCheckChange} name="Accessories"/>
				    } label="Accessories" />
					<FormControlLabel 
				    control={
					  <Checkbox checked={this.state.bikeSelected} onChange={this.handleCheckChange} name="Bicycles"/>
				    } label="Bicycles" />
				</FormGroup>
			  </div>
			  <div>
			  <Button className="col-lg-2" variant="contained" color="primary" onClick={this.handleFilter}>Search</Button>
			  <Button className="col-lg-2" variant="contained" color="primary" onClick={this.handleReset}>Reset</Button>
			  </div>
            </div>
          </div>
          <div className="prod-search-bottom">
		  </div>		  
		</div>
		
      
	  
      <Footer />     
      </div>
    </div>	  
  );
	}
}

export default Filter;

