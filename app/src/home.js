import React from 'react';
import './home.css';
//import Visitors from './visitorsinorder.js';
import Profile from '../src/Imgs/profile.svg';
import Users from '../src/Imgs/users.svg';
import Likes from '../src/Imgs/like.svg';
import Emails from '../src/Imgs/email.svg';
import axios from 'axios';
//import { response } from 'express';
//var firebase = require("firebase/app");

//require("firebase/auth");

class Home extends React.Component{
    constructor(props){
      super(props);

      this.state = {
        totalVisitors: '',
        totalLikes: '',
        totalMessages: '',
        visitorsInOrder: [],
        mostCountryVisitors: '',
        messages: [],
        messagefrom: ''
      };

    }

   componentDidMount(){
      // Fetching Total Visitors from FireBase & MongoDB Database with Back-End Method
      fetch("/totalvisitors")
      .then(response => response.json())
      .then(data => this.setState({totalVisitors: data['total Visitors']}));

      fetch("/totallikes")
      .then(response => response.json())
      .then(data => this.setState({totalLikes: data['total Likes']}));

      fetch("/totalmessages")
      .then(response => response.json())
      .then(data => this.setState({totalMessages: data['total Messages']}));

      axios.get('/visitorsbycountry')
      .then(response => this.setState({visitorsInOrder: response.data, mostCountryVisitors: response.data[0].Flag}));
      
      axios.get('/messagesinfo')
      .then(response => {this.setState({messages: response.data['messages'], messagefrom: response.data['messages'][0]['Name']})});

//Promise.all([firstone, secondone])

   }
   /*  
axios.all([axios.get('/visitorsbycountry'), axios.get('/messagesinfo')])
.then(axios.spread((firstResponse, secondResponse) =>{
  this.setState({visitorsInOrder: firstResponse.data, mostCountryVisitors: firstResponse.data[0].Flag, messages: secondResponse.data['messages']})
}))
.catch(error => console.log(error));
    }
*/
    render(){

var visitors = this.state.visitorsInOrder.map((i, index) =>{
  return (
    <React.Fragment key={index}>
    <div key={index} style={{display: 'inline-block'}}>
    <img src={i.Flag} key={index} style={{float: 'left', width: '50px', height: '30px'}}/>
    <p key={index} style={{float: 'left', display: 'inline-block', margin: '0', fontFamily: 'Recursive', marginLeft: '10px', color: 'rgb(214, 42, 214)', fontWeight: 'bold'}}>{i.Count}</p>
    <p key={index} style={{float: 'left', margin: '0', fontFamily: 'Recursive', fontWeight: 'bold', marginLeft: '10px'}}>{i.Country}</p>
    </div>
    < br />
    </React.Fragment>
    )
}
)

var messages = this.state.messages.map((i) =>{
  return(
  <React.Fragment>
  <div key={i._id} style={{display: 'inline-block', borderLeft: `10px solid rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`}}>
  <p key={i._id} style={{fontFamily: 'poppins', fontWeight: 'bold', marginLeft: '10px'}}>Message:</p>
       <p key={i._id} style={{fontFamily: 'Recursive', fontWeight: 'bold', marginLeft: '10px'}}>{i.Message}</p>
       <p key={i._id} style={{fontFamily: 'Recursive', fontWeight: 'bold', fontSize: '15px', marginBottom: '0', marginLeft: '10px'}}>From: <span style={{color: 'rgb(39, 201, 255)'}}>{i.Name}</span></p>
       <p key={i._id} style={{fontFamily: 'Recursive', fontWeight: 'bold', fontSize: '15px', marginTop: '0', marginBottom: '0', marginLeft: '10px'}}>Email: <span style={{color: 'rgb(39, 201, 255)'}}>{i.Email}</span></p>
       <p key={i._id} style={{fontFamily: 'Recursive', fontWeight: 'bold', fontSize: '15px', marginTop: '0', marginLeft: '10px'}}>Phone No: <span style={{color: 'rgb(39, 201, 255)'}}>{i.Phone}</span></p>
  </div>
  </React.Fragment>
  )
})
      return(
    <React.Fragment>
    <div className="home-cont">
    <div className="nav-cont">
    <img alt="Logo" className="Logo" />
      <h1>Dashboard</h1>
      <img src={Profile} alt="Profile" className="Profile-Img" />
    </div>
    <div className="main">
      <div className="brief-cont">
        <div className="brief-item">
      <div className="brief-i-cont brief-i-cont-1">
      <img src={Users} alt="Visitors" />
      </div>
      <h1><span>{this.state.totalVisitors}</span> Visitors</h1>
        </div>
        <div className="brief-item">
        <div className="brief-i-cont brief-i-cont-2">
      <img src={Likes} alt="Visitors Likes" />
      </div>
      <h1><span>{this.state.totalLikes}</span> Likes</h1>
        </div>
        <div className="brief-item">
        <div className="brief-i-cont brief-i-cont-3">
      <img src={Emails} alt="Visitors Emails" />
      </div>
      <h1><span>{this.state.totalMessages}</span> Messages</h1>
        </div>
      </div>
    <div className="visitors-brief-info-cont">
      <div className="left-cont">
      <div className="img-h2-cont">
           <img src={this.state.mostCountryVisitors} alt="Most Visitors By Country" />
           <h2>Most Visitors By Country</h2>
           </div>
      </div>
      <div className="right-cont">
      <div className="h2-span-cont">
      <h2>Latest Message From </h2> <span>{this.state.messagefrom}</span>
      </div>
      </div>
    </div>

   <div className="visitors-detailed-info-cont">
   
       <div className="left-cont">
           <div className="visitors-cont">
           <h2>Visitors By Country</h2>
          {/*<Visitors visitorsInOrder={this.state.visitorsInOrder} />*/}
          <div style={{overflowY: 'scroll', height: '400px'}}>
        {visitors}
        </div>
           </div>
       </div>
       <div className="right-cont">
           <div className="messages-cont">
           <h2>Visitors Messages</h2>
           <div className="total-messages" style={{overflowY: 'scroll', height: '400px'}}>
           {/* HERE ARE THE TOTAL MESSAGES AFTER USING LOOP IN SUB COMPONENT */}
           {messages}
           </div>
           </div>
       </div>

   </div>

    </div>
    </div>
    </React.Fragment>
      );
    }
    }

    export default Home;