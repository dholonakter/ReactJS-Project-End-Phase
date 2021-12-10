import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Buttons from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextFields from '@material-ui/core/TextField';





const columns = [
  // { id: 'name', label: 'Name', minWidth: 170 },
  // { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'name',
    label: 'Name',
    minWidth: 100,
    //size: 32,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
    // render: (name) => (
    //   <Typography style={{ fontSize: 35 }} variant="h1">
    //     {name}
    //   </Typography>
    // )
  },
  {
    id: 'message',
    label: 'Message',
    minWidth: 400,
    //size: 20,
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

var chatData;
chatData = [];


export default function ChatMessage() {

  const passdata = useLocation();

  function TEST(){
  
    
       return (<div>aaauluu</div>);
    
  }

  function getData(a, b){
  
    axios({
      method: 'GET',
      url:'https://i383988.hera.fhict.nl/chat/getChat.php?id='+a+'&targetid='+b,
      config: {headers:{'Content-Type': 'multipart/form-data'}}
    }).then(response => response.data).then((data) =>{
       chatData = [];
       for(let i = 0; i<data.length; i++){
         //alert(JSON.stringify(data[i]));
           chatData.push(data[i]);
           //console.log(chatData);
       }
       
    })
       return chatData;
    
  }

  const chatList = getData(passdata.state.id, passdata.state.targetid);
  console.log(chatData);
  console.log(passdata.state.chat);
  //alert(JSON.stringify(chatList[0]));


  return (
    
      


    <div className="register">
      <div className="register">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-2">
            
          </div>
          <div className="col-lg-8">
            
              <div className="row">
                
              <div className="col-lg-10"><center>
                <Typography className="font-weight-light" variant="h2">{passdata.state.name}</Typography></center>
                </div>
              </div>
            
            <p></p>

            <form>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {chatList
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.code} sx={{ height: 100 }}> 
                    
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
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
          <p></p>
            <div className="row">
<div className="row">
    <TextFields required
    className="col-lg-9" variant="outlined" label="Text" type="text" name="chatMessage"
    />
    <Buttons className="col-lg-3" variant="contained" color="primary" >Send</Buttons>
</div>



                </div>
          
        </div>
      </div>
      
    </div>
    </div>
  );
}