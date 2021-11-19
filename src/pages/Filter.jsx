import React from "react";
import ReactDOM from 'react-dom'
import { FormGroup, FormControlLabel, Checkbox, Slider, Stack, TablePagination} from '@mui/material';

import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import ProductFilter from "../components/ProductFilter"

class Filter extends React.Component {
	
	
	constructor() {
    super();
    this.state = {
      todos: ['a','b','c','d','e','f','g','h','i','j','k'],
      currentPage: 1,
      todosPerPage: 3
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
	
	
	render(){
		const { todos, currentPage, todosPerPage } = this.state;

    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((todo, index) => {
      return <li key={index}>{todo}</li>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });
	
	
	let productFilter = new ProductFilter();
	let productList = productFilter.getList();
	let filteredList = productFilter.sortList("PRICE", 40);

  return (
    <div className="filter">
	  <div>
        <Navigation/>    
      </div>
	  <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              //src="http://placehold.it/900x400"
            />
          </div>
	  <div>
        <ul>
          {renderTodos}
        </ul>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>

      <div className="container">  
      <FormGroup>
        <FormControlLabel control={<Checkbox/>} label="Books" />
		<FormControlLabel control={<Checkbox/>} label="Accessories" />
		<FormControlLabel control={<Checkbox/>} label="Other" />
		
      </FormGroup> 
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Slider aria-label="Price" />
      </Stack>
			     
        </div>
		<Footer id="footer"/>     
    </div>	
  );
	}
}

export default Filter;

