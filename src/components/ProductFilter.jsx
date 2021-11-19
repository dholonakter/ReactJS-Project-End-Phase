import React from "react";
import { Link, withRouter } from "react-router-dom";
import Product from "./Product";

class ProductFilter{
	
	constructor(){
		this.productList = [];
		this.createProduct(1, 1, 1, "A book", 35, 1);
		this.createProduct(3, 2, 3, "A book 2 ", 35, 1);
		this.createProduct(4, 1, 1, "A book 3", 35, 1);
		this.createProduct(5, 3, 2, "A book 4", 35, 2);
		this.createProduct(2, 2, 2, "A 5nd book", 59.95, 2);
		
	}
	
	createProduct(id, userid, prodid, proddesc, price, catid){
		let prod = new Product(id, userid, prodid, proddesc, price, catid);
        this.productList.push(prod);
	}
	
	getList(){
		return this.productList;	
	}
	// value needs to be an object to allow multiple choice
	sortList(filterType, value){
		let filteredList = [];
		for( let product of this.productList) {
		  if(filterType == "CATEGORY"){
			if(product.category_id == value){
				filteredList.push(product);
			}
			
			
		  }else if (filterType == "NAME"){
			  // contains name, not equal to
			if(product.id == value){
				filteredList.push(product);
			}
		  }else if (filterType == "PRICE"){
			if(product.product_price <= value){
				filteredList.push(product);
			}
		  }
		}
		return filteredList;
	}
	
}
export default ProductFilter;