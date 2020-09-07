import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
// import Wave from './Imgs/wave.svg';
import User from './Imgs/user.svg';
import Code from './Imgs/code.jpeg';
import Home from './home';
//import Visitors from './visitorsinorder';
class App extends React.Component{
constructor(props){
  super(props);

  this.state = {
    
  };
}

render(){



  return(
    <Router>
    
    <Route exact path="/" render={props => (
      <React.Fragment>
      <img className="bg-img" src={Code} alt="background" />
      <div className="login-cont">
      <img src={User} alt="Login" />
      <h1>Welcome</h1>
      <form className="login-form" action="/login" method="POST">
      <input type="text" name="User" placeholder="User Name" required />
      <input type="password" name="Password" placeholder="Password" required />
      <button type="submit">LOGIN
      <div className="login-btn-div-1"></div>
      <div className="login-btn-div-2"></div>
      </button>
      </form>

      </div>
</React.Fragment>
    )} 
    />
<Switch>
<Route path="/home" component={Home} />
</Switch>
</Router>
  );
}
}

export default App;
