import React from "react";
import axios from 'axios';
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

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




function getData(){

  const chatData = [];

  axios({
    method: 'GET',
    url:'https://i383988.hera.fhict.nl/chat/getChatList.php?', //
    config: {headers:{'Content-Type': 'multipart/form-data'}}
  }).then(response => response.data).then((data) =>{
     for(let i = 0; i<data.length; i++){
         chatData.push(data[i]);
     }
     
  })
  console.log(chatData);
  return chatData;
}

var chatList = getData();
console.log(chatList);


function getChatData(a, b){
  var chatData = [];
  axios({
    method: 'GET',
    url:'https://i383988.hera.fhict.nl/chat/getChat.php?id='+a+'&targetid='+b,
    config: {headers:{'Content-Type': 'multipart/form-data'}}
  }).then(response => response.data).then((data) =>{
     
     for(let i = 0; i<data.length; i++){
         chatData.push(data[i]);
         console.log(chatData);
     }
     
  })
     return chatData;
  
}


export default function Chat({navigation}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

const users = [];

const [firstname, setFirstname]=useState('');
const [message, setMessage]=useState('');
const [time, setTime]=useState('');

const history = useHistory();
function chatMessage(a, b){
  // chatList = getChatData(10, a);
  // console.log(chatList);
  // history.push("/chatMessage", {id: '10', targetid: a, name: b, chat: chatList});
  history.push("/chatMessage", {id: '10', targetid: a, name: b});
}


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
            {chatList
            //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.code} sx={{ height: 100 }}> 
                    
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} onClick={() => chatMessage(row.id, row.name)}>

                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}

                        </TableCell>
                      );
                    })}
                    
                  </TableRow>
                );
              })}

        {/* {chatList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.message}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              
            </TableRow>
          ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
            </form>
            {/* <Buttons className="col-lg-2" variant="contained" color="primary" onClick={Get}>Get Chat</Buttons> */}
            {/* <button onClick={() => navigation.navigate("/chatMessage", {id: '10', targetid: '12', name: '12'})}>Click to reload!</button> */}
          </div>
          {/* {firstname} {message} {time} */}
        </div>
      </div>
    </div>
  );
}