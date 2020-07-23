import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.scss';
import Intro from './pages/intro';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/login';
import Logout from './pages/logout';
import Signup from './pages/Signup';
import SignupSecond from './pages/Signup-second';
import SignupConfirm from './pages/Signup-confirm';




class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
         person:{}
    }
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Intro}/>
          <Route path="/about" component={About}/>
          <Route path="/user/home" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signup-second" component={SignupSecond}/>
          <Route path="/signup-confirm" component={SignupConfirm}/>
        </Switch> 
        
      </>
    )
  }
}

export default App

