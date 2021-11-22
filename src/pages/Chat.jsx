import React from "react";
import axios from 'axios';
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

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

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

function createChatPreview(a, b, c){
  return { a, b, c };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
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

const chatList = getData();

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

const users = [];
//const chatList = [];
const [firstname, setFirstname]=useState('');
const [message, setMessage]=useState('');
const [time, setTime]=useState('');

// const Get = event => {
//   event.preventDefault();
//   axios({
//     method: 'GET',
//     url:'https://i383988.hera.fhict.nl/chat/getChatList.php?', //
//     config: {headers:{'Content-Type': 'multipart/form-data'}}
//   }).then(response => response.data).then((data) =>{
//     //  console.log(JSON.parse(JSON.stringify(data)));
//     //  console.log(JSON.parse(JSON.stringify(data)).length);
//     console.log(chatList);
//      for(let i = 0; i<data.length; i++){
//          users.push(data[i]);
//          //chatList.push(createChatPreview(users[0].name, users[0].message, users[0].time));
//      }
//     //  console.log("data ="+ data);
//     //  console.log("data2 ="+ users);
//     //  console.log("data3 ="+ JSON.stringify(users[0]));

//      console.log("data1 ="+ JSON.stringify(users[0]));
//      console.log("data2 ="+ JSON.stringify(users));
//      console.log("data3 ="+ JSON.stringify(rows[0]));
//      console.log("data4 ="+ JSON.stringify(rows));
//      setFirstname(JSON.stringify(users[0].name));
//      setMessage(JSON.stringify(users[0].message));
//      setTime(JSON.stringify(users[0].time));
//   })
//  }

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
                        <TableCell key={column.id} align={column.align}>
                          {/* <Router>
  <Link to = 'https://google.com/'> */}
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                            {/* </Link>

</Router> */}
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
          </div>
          {firstname} {message} {time}
        </div>
      </div>
    </div>
  );
}