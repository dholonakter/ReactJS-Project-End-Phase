import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
  Box,
  Container,
} from "@material-ui/core";
import TextFields from "@material-ui/core/TextField";
import Buttons from "@material-ui/core/Button";
import imageCompression from "browser-image-compression";
import { store, useGlobalState } from "state-pool";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: store.getState("currentUser"),
      productName: "",
      productDesc: "",
      price: null,
      parsedPrice: null,
      category: "book",
      imgName: "",
      productImg: null,
      error: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleNameChange(event) {
    let textValue = event.target.value;
    this.setState({ productName: textValue });
  }
  handleDescChange(event) {
    let textValue = event.target.value;
    this.setState({ productDesc: textValue });
  }
  handlePriceChange(event) {
    let priceValue = event.target.value;
    let parsedValue = parseFloat(priceValue).toFixed(2);

    console.log(priceValue);
    console.log(parsedValue);

    let numStr = String(priceValue);
    let decimalAmt = 0;
    // String Contains Decimal
    if (numStr.includes(".")) {
      decimalAmt = numStr.split(".")[1].length;
    }

    if (decimalAmt > 2) {
      this.setState({ price: parsedValue });
    } else {
      this.setState({ price: priceValue });
    }
    this.setState({ parsedPrice: parsedValue });
  }
  handleCategoryChange(event) {
    let catValue = event.target.value;
    this.setState({ category: catValue });
  }

  getCategoryId(category) {
    let categoryId = -1;
    switch (
      category // Based on the RadioGroup values
    ) {
      case "book":
        categoryId = 1;
        break;
      case "accessory":
        categoryId = 2;
        break;
      case "bicycle":
        categoryId = 3;
        break;
      case "other":
        categoryId = 4;
        break;
    }
    return categoryId;
  }

  handleImageChange(event) {
    let that = this;
    const img = event.target.files[0];
    if (img == null || img.type.toLowerCase().indexOf("image") == -1) {
      this.setState({ error: true });
      alert("Please select an image for your product!");
    } else {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      };
      imageCompression(img, options).then(function (compressedImg) {
        that.setState({ productImg: compressedImg });
      });
    }
  }

  handleSubmit(event) {
    if (this.validateForm()) {
      let formData = new FormData();
      let categoryId = this.getCategoryId(this.state.category);
      let imageFile = this.state.productImg;
      console.log(imageFile);

      formData.append("add_product", "adding product");
      formData.append("user_id", this.state.user.value.id);
      formData.append("product_name", this.state.productName);
      formData.append("product_description", this.state.productDesc);
      formData.append("product_price", this.state.price);
      formData.append("category_id", categoryId);
      formData.append("product_image", imageFile);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }
      axios({
        method: "POST",
        url: "https://i383988.hera.fhict.nl/database.php?",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      }).then(function (response) {
        alert("Your product has been listed");
      });
    }
  }

  validProdName() {
    if (this.state.productName == null || !/\S/.test(this.state.productName)) {
      return false;
    } else {
      return true;
    }
  }

  validProdDesc() {
    if (this.state.productDesc == null || !/\S/.test(this.state.productDesc)) {
      return false;
    } else {
      return true;
    }
  }

  validPrice() {
    if (
      Number.isNaN(this.state.parsedPrice) ||
      !/\S/.test(this.state.parsedPrice) ||
      this.state.parsedPrice <= 0 ||
      this.state.parsedPrice == "NaN"
    ) {
      return false;
    } else {
      return true;
    }
  }

  validCategory() {
    if (this.getCategoryId(this.state.category) == -1) {
      return false;
    } else {
      return true;
    }
  }

  validImage() {
    if (
      this.state.productImg == null ||
      this.state.productImg.type.toLowerCase().indexOf("image") == -1
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateForm() {
    let alertString = "";
    let validForm;
    if (this.state.user.value == null) {
      alert("Not signed into an account!");
      validForm = false;
      return validForm;
    }
    if (
      !this.validProdName() ||
      !this.validProdDesc() ||
      !this.validPrice() ||
      !this.validCategory ||
      !this.validImage()
    ) {
      validForm = false;
      this.setState({ error: true });
    } else {
      validForm = true;
      this.setState({ error: false });
    }
    if (!this.validImage()) {
      alert("Please select an image for your product!");
    }
    return validForm;
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="register">
          <Container maxWidth="sm">
            <Typography
              className="font-weight-light text-center"
              style={{ padding: "30px 0px" }}
              variant="h4"
            >
              Add Product
            </Typography>

            <form>
              <Typography className="font-weight-light text-left" variant="h5">
                Product Information
              </Typography>

              <br />

              <TextFields
                required
                fullWidth
                type="text"
                name="p_name"
                label="Product Name"
                value={this.state.productName}
                variant="outlined"
                error={this.state.error && !this.validProdName()}
                helperText={
                  this.state.error && !this.validProdName()
                    ? "Please enter a name for your product."
                    : " "
                }
                onChange={this.handleNameChange}
              />

              <br />
              <br />

              <TextFields
                required
                fullWidth
                type="text"
                name="p_desc"
                label="Product Description"
                value={this.state.productDesc}
                variant="outlined"
                error={this.state.error && !this.validProdDesc()}
                helperText={
                  this.state.error && !this.validProdDesc()
                    ? "Please enter a Description for your product."
                    : " "
                }
                onChange={this.handleDescChange}
              />

              <br />
              <br />

              <TextFields
                required
                fullWidth
                variant="outlined"
                label="Price(€)"
                type="number"
                name="price"
                value={this.state.price}
                error={this.state.error && !this.validPrice()}
                helperText={
                  this.state.error && !this.validPrice()
                    ? "Please enter a positive number for the price of your product."
                    : " "
                }
                onChange={this.handlePriceChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <br />
              <br />

              <FormControl component="fieldset">
                <FormLabel component="legend">Category</FormLabel>
                <RadioGroup
                  aria-label="category"
                  name="radio-buttons-group"
                  value={this.state.category}
                  onChange={this.handleCategoryChange}
                >
                  <Box display="flex">
                    <FormControlLabel
                      value="book"
                      control={<Radio />}
                      label="Book"
                    />
                    <FormControlLabel
                      value="accessory"
                      control={<Radio />}
                      label="Accessory"
                    />
                    <FormControlLabel
                      value="bicycle"
                      control={<Radio />}
                      label="Bicycle"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </Box>
                </RadioGroup>
              </FormControl>

              <br />
              <br />

              <input
                type="file"
                name="image"
                id="image"
                accept=".jpg,.jpeg,.png"
                onChange={this.handleImageChange}
              />

              <Box display="flex" justifyContent="end" py={5}>
                <Buttons
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={this.handleSubmit}
                >
                  Add product
                </Buttons>
              </Box>
            </form>
          </Container>
        </div>
        <div></div>
        <div style={{ height: "25vh" }} />
        <Footer />
      </div>
    );
  }
}
export default AddProduct;
