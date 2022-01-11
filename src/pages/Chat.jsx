import React from "react";
import axios from 'axios';
import { useState } from "react";
import { BrowserRouter, Route, Switch, Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { store, useGlobalState } from "state-pool";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Buttons from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextFields from '@material-ui/core/TextField';





const columns = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 100,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'message',
      label: 'Message',
      minWidth: 400,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'time',
      label: 'Time',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  function setExpiration() {
    let timestamp = new Date();
    timestamp.setDate(timestamp.getDate());
    timestamp.setHours(timestamp.getHours());
    timestamp.setMinutes(timestamp.getMinutes());
    timestamp.setSeconds(timestamp.getSeconds() + 1);
    return timestamp;
  }


  let chatData = [];

  function getData(user){

    if(user.value == null){
      window.location.href = "https://i383988.hera.fhict.nl/login";
      //window.location.href = "http://localhost:3000/login";
    }
    
      axios({
        method: 'GET',
        url:'https://i383988.hera.fhict.nl/chat/getChatList.php?userID='+user.value.id, //
        config: {headers:{'Content-Type': 'multipart/form-data'}}
      }).then(response => response.data).then((data) =>{
         chatData = [];
         for(let i = 0; i<data.length; i++){
             chatData.push(data[i]);
         }
         
      })
      return chatData;
  }

    var user;

  
class Chat extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      chats: chatData
    };
    //this.handleLogout();
    user = store.getState("currentUser");
    getData(store.getState("currentUser"));
	}

	setChat = () => {
    this.setState({
      chats: chatData
    });
  }

  handleLogout = () => {
    //const [currentUser, setCurrentUser] = useGlobalState("currentUser");
    //const [navigation, setNav] = useGlobalState("navigation");
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
        //setNav("/Login");
        //setCurrentUser("");
        document.cookie =
          "current_user= ; expires=" + setExpiration().toUTCString();
        alert("Successfully logged out!");
        document.querySelector("#home_nav").click();
      });
    }
  }

	chatMessage(currUser, a, b) {
    this.props.history.push("/chatMessage", {id: currUser, targetid: a, name: b});
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setChat(), 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render(){	
  return (
    <div className="register">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-2">
            
          </div>
          <div className="col-lg-8">
            
              <div className="row">
                
              <div className="col-lg-10"><center>
                <Typography className="font-weight-light" variant="h2">Chat List</Typography></center>
                </div>
              </div>
            
            <p></p>

            <form>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* <TableContainer sx={{ maxHeight: 440 }}> */}
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.chats
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.code} sx={{ height: 100 }}> 
                    
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} onClick={() => this.chatMessage(user.value.id, row.id, row.name)}>

                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}

                        </TableCell>
                      );
                    })}
                    
                  </TableRow>
                );
              })}

          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default withRouter(Chat);