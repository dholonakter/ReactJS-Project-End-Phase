import react, { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { addProduct } from "../Service/api";
import { useHistory } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const initialValue = {
  name: "",
  description: "",
  price: "",
};

const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    paddingBottom: 50,
    "& > *": {
      marginTop: 20,
    },

    "@media(max-width:576px)": {
      width: "85%",
      margin: "auto",
    },
  },
});

const AddProduct = () => {
  const [product, setProduct] = useState(initialValue);
  const { name, description, price } = product;
  const classes = useStyles();
  let history = useHistory();

  const onValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    await addProduct(product);
    history.push("./all");
  };
  return (
    <div className="addproduct">
      <div>
        <Navigation />
      </div>
      <FormGroup className={classes.container}>
        <Typography variant="h4">Add Product</Typography>
        <FormControl>
          <InputLabel htmlFor="my-input">Name</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="name"
            value={name}
            id="my-input"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">description</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="description"
            value={description}
            id="my-input"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">price</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="price"
            value={price}
            id="my-input"
          />
        </FormControl>
        <FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addUserDetails()}
          >
            Add Product
          </Button>
        </FormControl>
      </FormGroup>
      <Footer />
    </div>
  );
};

export default AddProduct;
