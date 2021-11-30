import React from "react";
import axios from 'axios';
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

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






export default function ChatMessage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const params = useParams();

const users = [];

const [firstname, setFirstname]=useState('');
const [message, setMessage]=useState('');
const [time, setTime]=useState('');

const history = useHistory();
function chatMessage(a){
  // alert("data1 ="+ JSON.stringify(params));
  // console.log("data1 ="+ JSON.stringify(params));
  // history.push("/chatMessage?id="+a);
  
  
  
















  // this.props.history.push({
  //   pathname: '/chatMessage',
  //     state: data // your data array of objects
  // })















  

}
function alerting(a){
  
  
  alert(params);
  history.push("/login");
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



            </form>
            {/* <Buttons className="col-lg-2" variant="contained" color="primary" onClick={Get}>Get Chat</Buttons> */}
          </div>
          {/* {firstname} {message} {time} */}
        </div>
      </div>
    </div>
  );
}