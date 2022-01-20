import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import yellow from "@material-ui/core/colors/yellow";

import SaveIcon from "@material-ui/icons/Telegram";
import "../index.css";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

import Paper from "@mui/material/Paper";
import Buttons from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextFields from "@material-ui/core/TextField";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 50,
  width: "100%",
  lineHeight: "50px",
  wordWrap: "break-word",
}));

var chatData;
var chatList;
chatData = [];

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      refresh: "",
    };

    this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

    if (this.props.location.state == undefined) {
      window.location.href = "/login";
    }

    chatList = this.getData(
      this.props.location.state.id,
      this.props.location.state.targetid
    );
  }

  getData(a, b) {
    axios({
      method: "GET",
      url:
        "https://i383988.hera.fhict.nl/chat/getChat.php?id=" +
        a +
        "&targetid=" +
        b,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((response) => response.data)
      .then((data) => {
        chatData = [];
        for (let i = 0; i < data.length; i++) {
          chatData.push(data[i]);
        }
      });
    this.setState({ refresh: "aa" });
    return chatData;
  }

  handleTextChange(event) {
    let textValue = event.target.value;
    this.setState({ text: textValue });
  }

  handleRefresh(event) {
    this.forceUpdate();
  }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.getData(
          this.props.location.state.id,
          this.props.location.state.targetid
        ),
      40
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSubmit() {
    let formData = new FormData();
    formData.append("id", this.props.location.state.id);
    formData.append("targetid", this.props.location.state.targetid);
    formData.append("message", this.state.text);

    axios({
      method: "POST",
      url: "https://i383988.hera.fhict.nl/chat/sendChat.php?",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then(function (response) {
      console.log("Chat Sent");
    });
  }

  render() {
    return (
      <div className="register">
        <div className="register">
          <Navigation />
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-lg-2"></div>
              <div
                className="col-lg-8 my-5 border rounded-1 mt-2"
                style={{ background: "#F4F4F4", borderRadius: "5px" }}
              >
                <div className="row" style={{ marginBottom: "100px" }}>
                  <Link
                    className="col-lg-3"
                    style={{ color: "#000000" }}
                    id="chat_nav"
                    to="/chat"
                  >
                    <Buttons
                      className="col-lg-12 mt-4"
                      variant="contained"
                      //             onClick={(e) => {
                      //              e.preventDefault();
                      //              window.location.href='http://google.com';
                      //              }}
                    >
                      Go To Chat List
                    </Buttons>
                  </Link>
                </div>

                <div className="row" style={{ marginBottom: "40px" }}>
                  <div className="col-lg-12" style={{ textAlign: "center" }}>
                    <Typography className="font-weight-light" variant="h4">
                      {this.props.location.state.name}
                    </Typography>
                  </div>
                </div>

                <p></p>

                {chatData.map((row) => {
                  return (
                    <div>
                      <div className="row">
                        <div className={row.type2}></div>
                        <div className={row.size}>
                          <Item
                            className="send"
                            key={row.message}
                            elevation="2"
                          >
                            <div className={row.type}>{row.message}</div>
                          </Item>
                        </div>
                      </div>
                      <div className="row">
                        <div className={row.type2}></div>
                        <div className={row.size}>
                          <div style={{ marginBottom: "20px" }}>{row.time}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <p></p>

                <div className="row pb-3">
                  <TextFields
                    required
                    className="col-md-10"
                    variant="outlined"
                    label="Type your message here"
                    type="text"
                    name="chatMessage"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    inputProps={{ maxLength: 60 }}
                    style={{ paddingLeft: 15 }}
                  />
                  <div className="col-md-2">
                    <Buttons
                      variant="contained"
                      style={{ height: "100%", width: "100%" }}
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={this.handleSubmit}
                    >
                      Send
                    </Buttons>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default withRouter(ChatMessage);
