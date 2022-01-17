import { Container, Grid } from "@material-ui/core";
import React from "react";

function Footer() {
  return (
    <div className="footer">
      <footer className="py-4 bg-dark">
        <Container maxWidth="sm">
          <Grid container>
            <Grid item xs={6} md={4}>
              <p className="m-0 text-left text-white">About us</p>
              <p className="m-0 text-left text-white">Contact us</p>
            </Grid>
            <Grid item xs={6} md={4}>
              <p className="m-0 text-left text-white">Help</p>
              <p className="m-0 text-left text-white">Support Group</p>
            </Grid>
            <Grid item xs={6} md={4}>
              <p className="m-0 text-left text-white">Privacy Policy</p>
              <p className="m-0 text-left text-white">Chat us</p>
            </Grid>
          </Grid>

          <p className="m-0 pt-5 text-center text-white">
            Copyright &copy; Your Website 2021
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
