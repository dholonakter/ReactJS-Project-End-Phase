import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  TextField,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { FaSearch } from "react-icons/fa";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentDidMount() {
    const url = "https://i383988.hera.fhict.nl/database.php?search_product";
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ products: data });
      });
  }

  filterSearch(text) {
    let filteredList = [];
    for (let product of this.state.products) {
      let nameCheck = false;
      if (
        product.product_description.toLowerCase().indexOf(text.toLowerCase()) !=
          -1 &&
        text != ""
      ) {
        nameCheck = true;
      } else {
      }
      if (nameCheck) {
        filteredList.push(product);
      }
    }
    return filteredList;
  }

  handleTextChange(event) {
    let textValue = event.target.value;
    let filteredSearch = this.filterSearch(textValue);
    this.setState({ filteredProducts: filteredSearch });
  }

  render() {
    return (
      <div>
        <Autocomplete
          style={{ width: 300 }}
          autoHighlight
          freeSolo
          id="search-bar"
          options={this.state.filteredProducts}
          getOptionLabel={(option) => option.product_name.toString()}
          renderOption={(option) => (
		  <a href={'/singleproductpage/' + option.id}>
            <React.Fragment>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.href = "#";
                }}
              >
                {option.product_name}
                <img
                  style={{ height: "150px" }}
                  src={`data:image/png;base64,${option.product_image}`}
                  className="img-fluid w-50"
                  alt=""
                />
              </span>
            </React.Fragment>
			</a>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Product..."
              id="search-bar"
              size="small"
              onChange={this.handleTextChange}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default SearchBar;
