import React, { useState, useEffect } from "react";
import axios from "axios";
import Buttons from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextFields from "@material-ui/core/TextField";
import Navigation from "../components/Navigation";
import ProfileNavigation from "../components/ProfileNavigation";
import Footer from "../components/Footer";
import { store, useGlobalState } from "state-pool";
import { Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Profile() {
  const [currentUser, setCurrentUser] = useGlobalState("currentUser");
  const [navigation, setNav] = useGlobalState("navigation");
  const user = store.getState("currentUser");
  const history = useHistory();
  const [firstname, setFirstname] = useState("");
  const [l_name, setL_name] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setCPassword] = useState("");

  const [street, setStreet] = useState("");
  const [statee, setStatee] = useState("");
  const [post, setPost] = useState("");
  const [country, setCountry] = useState("");

  function handleProfile() {
    if (user.value != null) {
      axios({
        method: "GET",
        url:
          "https://i383988.hera.fhict.nl/database.php?get_address=" +
          user.value.address_id,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      }).then(function (response) {
        setStreet(JSON.stringify(response.data.street_name));
        setStatee(JSON.stringify(response.data.state));
        setPost(JSON.stringify(response.data.postal_code));
        setCountry(JSON.stringify(response.data.country));
      });
      setFirstname(user.value.firstname);
      setL_name(user.value.lastname);
      setPhone(user.value.phone_number);
      setEmail(user.value.email_address);
      console.log(user.value);
    } else {
      document.querySelector("#home_nav").click();
    }
  }

  useEffect(() => {
    handleProfile();
  }, [email, street]);

  function setExpiration() {
    let timestamp = new Date();
    timestamp.setDate(timestamp.getDate());
    timestamp.setHours(timestamp.getHours());
    timestamp.setMinutes(timestamp.getMinutes());
    timestamp.setSeconds(timestamp.getSeconds() + 1);
    return timestamp;
  }

  const handleLogout = (event) => {
    event.preventDefault();
    if (user.value != null) {
      let formData = new FormData();
      formData.append("logout_user", "Signing out");
      formData.append("user_id", user.value.id);
      axios({
        method: "POST",
        url: "https://i383988.hera.fhict.nl/database.php?",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      }).then(function (response) {
        setNav("/Login");
        setCurrentUser("");
        document.cookie =
          "current_user= ; expires=" + setExpiration().toUTCString();
        alert("Successfully logged out!");
        document.querySelector("#home_nav").click();
      });
    }
  };

  const navigateUpdate = (event) => {
    window.location.href = "https://i383988.hera.fhict.nl/updateinfo";
  };

  return (
    <>
      <Navigation />

      <ProfileNavigation />

      <div className="container text-left">
        <form>
          <Typography className="font-weight-light pt-5" variant="h5">
            Personal Information
          </Typography>

          <p></p>

          <Typography className="font-weight-light" variant="h7">
            {firstname}
          </Typography>

          <p></p>

          <Typography className="font-weight-light" variant="h7">
            {l_name}
          </Typography>

          <p></p>

          <Typography className="font-weight-light" variant="h7">
            {phone}
          </Typography>

          <p></p>

          <Typography className="font-weight-light" variant="h5">
            Account Information
          </Typography>

          <p></p>

          <Typography className="font-weight-light" variant="h7">
            {email}
          </Typography>

          <p></p>

          <Typography className="font-weight-light" variant="h7">
            ***********
          </Typography>

          <p></p>

          <Typography className="font-weight-light" variant="h5">
            Address
          </Typography>

          <p></p>

          <Typography className="font-weight-light" variant="h7">
            {street}
          </Typography>

          <p></p>

          <Typography className="font-weight-light" variant="h7">
            {statee}
          </Typography>

          <p></p>

          <Typography className="font-weight-light" variant="h7">
            {post}
          </Typography>

          <p></p>

          <Typography className="font-weight-light" variant="h7">
            {country}
          </Typography>
          <div className="d-flex justify-content-between mt-5">
            <Buttons
              className=""
              variant="contained"
              color="primary"
              onClick={() => history.push("/updateinfo")}
            >
              Update User
            </Buttons>
            <Buttons
              className=""
              variant="contained"
              color="error"
              style={{ backgroundColor: "rgb(245, 0, 87)", color: "#FFFF" }}
              onClick={handleLogout}
            >
              Sign out
            </Buttons>
          </div>
          <p></p>
        </form>
      </div>

      <Footer />
    </>
  );
}
//ReactDOM.render(<Register />, document.getElementById('root'));

export default Profile;
