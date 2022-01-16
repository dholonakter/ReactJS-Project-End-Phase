import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Slider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
} from "@material-ui/core";

import Banner from "../components/Banner";
import Footer from "../components/Footer";
import ProductsRow from "../components/ProductsRow";
import Navigation from "../components/Navigation";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      nameValue: "",
      categories: [
        // number of categories = number of values
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
      priceValue: [0, 1000],
      sliderValue: [0, 1000],
      marks: [
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
      ],
    };
    // Fixes undefined error when setting the state
    this.handleFilter = this.handleFilter.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentDidMount() {
    const url = "https://i383988.hera.fhict.nl/database.php?search_product";
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        this.setState({ products: data });
        this.setState({ filteredProducts: data });
      });
  }

  filterList() {
    let productList = this.state.products;
    let filteredList = [];
    let nameValue = this.state.nameValue;
    let categories = this.state.categories;
    let priceValue = this.state.priceValue;
    console.log(priceValue);

    for (let product of productList) {
      let priceCheck = false;
      let catCheck = false;
      let nameCheck = false;

      for (let cat of categories) {
        if (product.category_id == 1 && this.state.bookSelected) {
          catCheck = true;
        } else if (product.category_id == 2 && this.state.accSelected) {
          catCheck = true;
        } else if (product.category_id == 3 && this.state.bikeSelected) {
          catCheck = true;
        }
      }
      if (
        product.product_description
          .toLowerCase()
          .indexOf(nameValue.toLowerCase()) != -1 ||
        nameValue == ""
      ) {
        nameCheck = true;
      }
      if (
        product.product_price >= priceValue[0] &&
        product.product_price <= priceValue[1]
      ) {
        priceCheck = true;
      }
      if (priceCheck && catCheck && nameCheck) {
        filteredList.push(product);
      }
    }
    return filteredList;
  }

  handleTextChange(event) {
    let textValue = event.target.value;
    this.setState({ nameValue: textValue }, () => {
      this.handleFilter();
    });
  }

  handleCheckChange(event) {
    switch (event.target.name) {
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

  handleSlideChange(event, value) {
    let lowerValue = value[0];
    let upperValue = value[1];
    console.log(upperValue);
    console.log(lowerValue);
    lowerValue = this.calculateValue(lowerValue);
    upperValue = this.calculateValue(upperValue);
    let newValue = [lowerValue, upperValue];
    this.setState({ priceValue: newValue });
    this.setState({ sliderValue: value });
    this.handleFilter();
  }

  valueLabelFormat(value) {
    // Not using the calculateValue function here - It causes an error as it doesn't get defined properly.
    let newValue = value;
    if (value < 500) {
      newValue = value / 5;
    } else {
      newValue = ((value - 500) / 5) * 9 + 100;
    }
    let valueText = `€${newValue}`;

    return valueText;
  }

  calculateValue(value) {
    let newValue = value;
    if (value < 500) {
      newValue = value / 5;
    } else {
      newValue = ((value - 500) / 5) * 9 + 100;
    }
    return newValue;
  }

  getCategoryName(value) {
    let catName;
    for (let cat of this.state.categories) {
      if (value == cat.id) {
        catName = cat.label;
      }
    }
    return catName;
  }

  handleFilter() {
    this.setState({ filteredProducts: this.filterList() });
  }

  handleReset() {
    this.setState({ filteredProducts: this.state.products });
  }

  render() {
    return (
      <div className="filter">
        <div>
          <Navigation />
        </div>
        <div className="container">
          <div>
            <h3 className="pb-5"> Search Products </h3>
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 order-2">
                <ProductsRow
                  sectionTitle="Products"
                  data={this.state.filteredProducts}
                />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 order-1">
                <Grid container spacing={8}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" className="text-left">
                      Filter
                    </Typography>

                    <TextField
                      fullWidth
                      label="Name"
                      id="name-search"
                      size="small"
                      value={this.state.nameValue}
                      onChange={this.handleTextChange}
                    />

                    <br />
                    <br />
                    <br />

                    <Typography>Price</Typography>

                    <Slider
                      value={this.state.sliderValue}
                      defaultValue={100}
                      //aria-label="Price slider"
                      getAriaLabel={() => "Temperature range"}
                      //getAriaValueText={this.valueLabelFormat}
                      valueLabelFormat={this.valueLabelFormat}
                      step={20}
                      min={0}
                      max={1000}
                      marks={this.state.marks}
                      onChange={this.handleSlideChange}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={6} md={3} className="text-left">
                    <Typography variant="h6">Category</Typography>
                    <br />
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.bookSelected}
                            onChange={this.handleCheckChange}
                            name="Books"
                          />
                        }
                        label="Books"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.accSelected}
                            onChange={this.handleCheckChange}
                            name="Accessories"
                          />
                        }
                        label="Accessories"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.bikeSelected}
                            onChange={this.handleCheckChange}
                            name="Bicycles"
                          />
                        }
                        label="Bicycles"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6} md={3} className="text-left">
                    <Typography variant="h6">Rate</Typography>

                    <br />
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={true}
                            onChange={(e) => console.log(e)}
                            name="Rate 1"
                          />
                        }
                        label="Rate 1"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={true}
                            onChange={this.handleCheckChange}
                            name="Rate 2"
                          />
                        }
                        label="Rate 2"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={true}
                            onChange={this.handleCheckChange}
                            name="Rate 3"
                          />
                        }
                        label="Rate 3"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6} md={2} className="text-left">
                    <Typography variant="h6">Price</Typography>

                    <br />
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={true}
                            onChange={this.handleCheckChange}
                            name="Filter 1"
                          />
                        }
                        label="Filter 1"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={true}
                            onChange={this.handleCheckChange}
                            name="Filter 2"
                          />
                        }
                        label="Filter 2"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={true}
                            onChange={this.handleCheckChange}
                            name="Filter 3"
                          />
                        }
                        label="Filter 3"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={1}
                    className="text-right d-flex flex-column justify-content-center"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ maxWidth: 100 }}
                      onClick={this.handleReset}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "30vh" }} />
        <Footer />
      </div>
    );
  }
}

export default Filter;
