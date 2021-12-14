import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom";
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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 50,
  width: '100%',
  lineHeight: '50px',
  wordWrap: 'break-word',
}));

var chatData;
chatData = [];



class ChatMessage extends React.Component {
	
	constructor(props){
    super(props);
    this.state = { 
      text: "",
	  };

    this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
	}

  getData(a, b){
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

  handleTextChange(event){
    let textValue = event.target.value;
      this.setState({ text: textValue });
    }
  

  componentDidUpdate(){
    this.getData(this.props.location.state.id, this.props.location.state.targetid);
  }

  componentDidMount(){
    this.getData(this.props.location.state.id, this.props.location.state.targetid);
  }

  handleSubmit() {
    let formData = new FormData();
    formData.append('id', this.props.location.state.id);
    formData.append('targetid',this.props.location.state.targetid);
    formData.append('message',this.state.text);

    
        axios({
          method: 'POST',
          url:'https://i383988.hera.fhict.nl/chat/sendChat.php?',
          data: formData,
          config: {headers:{'Content-Type': 'multipart/form-data'}}
        }).then(function(response){
          console.log(response);
          console.log('Chat Sent');
//          history.push("/chatMessage", {id: '10', targetid: this.props.location.state.targetid, name: this.props.location.state.name});
        })
  }


  render(){	
  
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
                  <Typography className="font-weight-light" variant="h2">{this.props.location.state.name}</Typography></center>
                  </div>
                </div>
              
              <p></p>
  
              {chatData
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
      <TextFields required className="col-lg-10" variant="outlined" label="Type your message here" type="text" name="chatMessage" value={this.state.text} onChange={this.handleTextChange}/>
      <div className="col-lg-2" style={{paddingLeft: '5px'}}><Buttons className="col-lg-12" variant="contained" style={{height: '100%'}} color="primary"  startIcon={<SaveIcon/>} onClick={this.handleSubmit}>Send</Buttons></div>
  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ChatMessage);


// export default function ChatMessage() {
//   const [text, setText] = useState('');
//   const history = useHistory();
//   const passdata = useLocation();


  

//   const chatList = getData(passdata.state.id, passdata.state.targetid);


  

  
// }