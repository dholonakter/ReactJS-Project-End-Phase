import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {makeStyles} from '@mui/styles';
import yellow from "@material-ui/core/colors/yellow";

import SaveIcon from '@material-ui/icons/Telegram';
import '../index.css'

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


//backgroundColor: yellow[300]

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
  
}));

var chatData;
chatData = [];


export default function ChatMessage() {
  const [text, setText] = useState('');
  const history = useHistory();
  const passdata = useLocation();


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

  const handleSubmit = event => {
    //event.preventDefault();
    let formData = new FormData();
    //setArr({"id":passdata.state.id,"targetid":passdata.state.targetid,"message":text});
    formData.append('id', passdata.state.id);
    formData.append('targetid',passdata.state.targetid);
    formData.append('message',text);

    
        axios({
          method: 'POST',
          url:'https://i383988.hera.fhict.nl/chat/sendChat.php?',
          data: formData,
          config: {headers:{'Content-Type': 'multipart/form-data'}}
        }).then(function(response){
          console.log(response);
          console.log('Chat Sent');
          history.push("/chatMessage", {id: '10', targetid: passdata.state.targetid, name: passdata.state.name});
        })
    }
  

  return (

    <div className="register">
      
      <div className="register">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-2">
            
          </div>
          <div className="col-lg-8">
            
              <div className="row">
                
              <div className="col-lg-10" style={{marginBottom: '50px'}}><center>
                <Typography className="font-weight-light" variant="h2">{passdata.state.name}</Typography></center>
                </div>
              </div>
            
            <p></p>

            {chatList
              .map((row) => {
                return (
                  <div>
                  <div className="row">
                    <div className={row.type2}></div>
                    <div className="col-lg-8">
                  <Item className="send" key={row.message} elevation='2'>
                    <div className={row.type}>{row.message}</div>
                  </Item>
                  </div>
                  </div>
                  <div className="row">
                    <div className={row.type2}></div>
                    <div className="col-lg-8">
                  
                    <div style={{marginBottom: '20px'}}>{row.time}</div>
                  
                  </div>
                  </div>
                </div>
                );
              })}

            
            <p></p>

<div className="row">
    <TextFields required className="col-lg-10" variant="outlined" label="Type your message here" type="text" name="chatMessage" value={text} onChange={(e) => setText(e.target.value)}/>
    <div className="col-lg-2" style={{paddingLeft: '5px'}}><Buttons className="col-lg-12" variant="contained" style={{height: '100%'}} color="primary"  startIcon={<SaveIcon/>} onClick={handleSubmit}>Send</Buttons></div>
</div>
            

          </div>
        
          
        </div>
      </div>
      
    </div>
    </div>
  );
}