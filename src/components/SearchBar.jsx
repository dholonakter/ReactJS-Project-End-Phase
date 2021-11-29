import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import {TextField, ListItem, ListItemButton, ListItemText} from '@material-ui/core';
import { FaSearch } from "react-icons/fa"

class SearchBar extends React.Component {
	constructor(props){
	  super(props);
	  this.state = { 
	    products: [],
		filteredProducts: [],
	  };
	  this.handleTextChange = this.handleTextChange.bind(this);
	}
	
	componentDidMount(){
	const url = 'https://i383988.hera.fhict.nl/searchProduct/searchProduct.php?';
	axios.get(url).then(response => response.data)
	.then((data) => {
		this.setState({ products: data});
	})
  }
  
    filterSearch(text){
	  let filteredList = [];
		for(let product of this.state.products){
		  let nameCheck = false;
		  if(product.product_description.toLowerCase().indexOf(text.toLowerCase()) == 0){
			nameCheck = true;
		  }
		  else{
		  }
		 if(nameCheck){
			filteredList.push(product);
		  }	
		}
		return filteredList; 
	    
	}
	
	handleTextChange(event){
	  let textValue = event.target.value;
	  //console.log(textValue);
	  let filteredSearch = this.filterSearch(textValue);
	  this.setState({ filteredProducts: filteredSearch });
    }	
	
    render(){	
  
      return (
        <div className="input-group mx-5">
            <input type="text" className="form-control" placeholder="Search Product...." onChange={this.handleTextChange}/>
            <span className="input-group-text bg-dark text-white" id="basic-addon1"><FaSearch /></span>
        </div>
      );
	}
}


export default SearchBar;