import React from "react";
import axios from "axios";
//import {Button} from '@material-ui/core';
import { getCountries } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";
import Buttons from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextFields from "@material-ui/core/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Box, Container } from "@material-ui/core";
//import ReactDOM from "react-dom";

function Register() {
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setCPassword] = useState("");

  const [street, setStreet] = useState("");
  const [statee, setStatee] = useState("");
  const [post, setPost] = useState("");
  const [country, setCountry] = useState("Netherlands");
  const [arr, setArr] = useState("");
  const [error, setError] = useState(false);

  const validText = (textValue) => {
    if (textValue == null || !/\S/.test(textValue)) {
      return false;
    } else {
      return true;
    }
  };

  const validPost = () => {
    if (post == null || !/\S/.test(post)) {
      return false;
    } else {
      if (country === "Netherlands" && !/^\d{4}[ ]?[A-Z]{2}$/.test(post)) {
        return false;
      } else {
        console.log(country);
        return true;
      }
    }
  };

  const validEmail = () => {
    if (validText(email) && email.includes("@", 1) && email.includes(".", 2)) {
      return true;
    } else {
      return false;
    }
  };

  const validPassword = () => {
    if (
      password.length >= 8 &&
      new RegExp(/^((([0-9])+([a-z]))|(([a-z])+([0-9])))/, "i").test(
        password
      ) &&
      validText(password)
    ) {
      if (password !== c_password) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const handleValidation = () => {
    let validForm;
    if (
      !validText(f_name) ||
      !validText(l_name) ||
      !validText(l_name) ||
      !validText(street) ||
      !validText(statee) ||
      !validPost() ||
      !validEmail() ||
      !validPassword() ||
      !validText(phone)
    ) {
      setError(true);
      validForm = false;
    } else {
      setError(false);
      validForm = true;
    }

    return validForm;
  };

  const handlePhoneChange = (event) => {
    event.preventDefault();
    let number = event.target.value;

    if (number === "" || /^[0-9\b]+$/.test(number)) {
      setPhone(number);
    }
  };

  const handleCountrySelect = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setCountry(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      let formData = new FormData();
      setArr({
        f_name: f_name,
        l_name: l_name,
        phone: phone,
        email: email,
        password: password,
        street: street,
        statee: statee,
        post: post,
        country: country,
      });
      console.log(
        f_name +
          ", " +
          l_name +
          ", " +
          phone +
          ", " +
          email +
          ", " +
          password +
          ", " +
          street +
          ", " +
          statee +
          ", " +
          post +
          ", " +
          country
      );
      formData.append("register_user", "registering");
      formData.append("f_name", f_name);
      formData.append("l_name", l_name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("street", street);
      formData.append("statee", statee);
      formData.append("post", post);
      formData.append("country", country);

      axios({
        method: "POST",
        url: "https://i383988.hera.fhict.nl/database.php?",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      }).then(function (response) {
        console.log(response);
        console.log("New User Added");
        alert("Registration Completed!");
      });
    }
  };

  const test = (event) => {
    let apiData = new FormData();
    apiData.append("api_key", "fe013d3a5655425fbb1b1286c784430a");
    apiData.append("email", "cheesesien@gmail.com");
    axios({
      method: "GET",
      url: "https://emailvalidation.abstractapi.com/v1/?api_key=fe013d3a5655425fbb1b1286c784430a&email=cheesesien@gmail.com",
      config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then(function (response) {
      console.log(response);
      console.log(response.data);
    });
  };

  return (
    <div className="app">
      <Navigation />

      <Container maxWidth="sm">
        <Typography
          className="font-weight-light text-center"
          style={{ padding: "20px 0px" }}
          variant="h4"
        >
          Register
        </Typography>

        {/* <form onSubmit={handleSubmit}> */}

        <form>
          <Typography className="font-weight-light text-left" variant="h5">
            Personal Information
          </Typography>
          {/* <h2 className="font-weight-light col-lg-12">Personal Information</h2> */}

          <p></p>

          {/* <div className="col-lg-4" variant="h5">
          <Typography>
            First Name:
          </Typography>
        </div> */}
          <TextFields
            required
            fullWidth
            type="text"
            name="f_name"
            label="First Name"
            value={f_name}
            variant="outlined"
            inputProps={{ maxLength: 50 }}
            error={error && !validText(f_name)}
            helperText={
              error && !validText(f_name) ? "Please enter your first name" : " "
            }
            onChange={(e) => setF_name(e.target.value)}
          />

          <p></p>

          <TextFields
            required
            fullWidth
            variant="outlined"
            label="Last Name"
            type="text"
            name="l_name"
            value={l_name}
            inputProps={{ maxLength: 50 }}
            error={error && !validText(l_name)}
            helperText={
              error && !validText(l_name) ? "Please enter your last name" : " "
            }
            onChange={(e) => setL_name(e.target.value)}
          />

          <p></p>

          <TextFields
            required
            fullWidth
            variant="outlined"
            label="Phone"
            name="phone"
            value={phone}
            inputProps={{ maxLength: 11 }}
            error={error && !validText(phone)}
            helperText={
              error && !validText(phone)
                ? "Please enter your phone number"
                : " "
            }
            onChange={handlePhoneChange}
          />

          <p></p>

          <Typography className="font-weight-light" variant="h5">
            Account Information
          </Typography>

          <p></p>

          <TextFields
            required
            fullWidth
            variant="outlined"
            label="Email"
            type="text"
            name="email"
            value={email}
            error={error && !validEmail()}
            helperText={
              error && !validEmail() ? "Please enter your email address" : " "
            }
            onChange={(e) => setEmail(e.target.value)}
          />

          <p></p>

          <TextFields
            required
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={password}
            error={error && !validPassword()}
            helperText={
              error && !validPassword()
                ? "Password must be at least 8 characters long and contain both letters and numbers"
                : " Password must be at least 8 characters long and contain both letters and numbers"
            }
            onChange={(e) => setPassword(e.target.value)}
          />

          <p></p>

          <TextFields
            required
            fullWidth
            variant="outlined"
            label="Confirm Password"
            type="password"
            name="c_password"
            value={c_password}
            error={error && password !== c_password}
            helperText={
              error && password !== c_password ? "Passwords do not match" : " "
            }
            onChange={(e) => setCPassword(e.target.value)}
          />

          <p></p>

          <Typography className="font-weight-light" variant="h5">
            Address
          </Typography>

          <p></p>

          <TextFields
            required
            fullWidth
            variant="outlined"
            label="Street Name"
            type="text"
            name="street_name"
            value={street}
            inputProps={{ maxLength: 50 }}
            error={error && !validText(street)}
            helperText={
              error && !validText(street)
                ? "Please enter your street and number"
                : " "
            }
            onChange={(e) => setStreet(e.target.value)}
          />

          <p></p>

          <TextFields
            required
            fullWidth
            variant="outlined"
            label="State"
            type="text"
            name="statee"
            value={statee}
            inputProps={{ maxLength: 50 }}
            error={error && !validText(statee)}
            helperText={
              error && !validText(statee) ? "Please enter your city" : " "
            }
            onChange={(e) => setStatee(e.target.value)}
          />

          <p></p>

          <TextFields
            required
            fullWidth
            variant="outlined"
            label="Post Code"
            type="text"
            name="post"
            value={post}
            inputProps={{ maxLength: 25 }}
            error={error && !validPost()}
            helperText={
              error && !validPost() ? "Please enter your post code" : " "
            }
            onChange={(e) => setPost(e.target.value.toUpperCase())}
          />

          <p></p>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            label="country"
            onChange={handleCountrySelect}
          >
            {getCountries().map((country) => (
              <MenuItem key={en[country]} value={en[country]}>
                {en[country]}
              </MenuItem>
            ))}
          </Select>

          <p></p>
          <Box display="flex" justifyContent="end" py={4}>
            <Buttons
              size="large"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Register
            </Buttons>

            <Buttons
              size="large"
              variant="contained"
              color="primary"
              onClick={test}
            >
              test
            </Buttons>
          </Box>
        </form>
      </Container>
      <Footer />
    </div>
  );
}

export default Register;
