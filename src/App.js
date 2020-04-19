import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';
import Intro from './pages/intro';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/login';
import Logout from './pages/logout';
import Signup from './pages/Signup';
import SignupSecond from './pages/Signup-second';
import SignupConfirm from './pages/Signup-confirm';
import Profile from './pages/profile';
import Feed from './pages/Feed';
import ToolDetail from './pages/Tool-detail';
import Toolshed from './pages/toolshed';
import Requests from './pages/Requests';
import Settings from './pages/Settings';
import Search from './pages/Search';
import AddTool from './pages/Add-tool';
import AddProject from './pages/Add-project';
import AllProjects from './pages/Projects-list';
import PublicPage from './pages/PublicPage';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
         person:{}
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Intro}/>
          <Route path="/about" component={About}/>
          <Route path="/user/home" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signup-second" component={SignupSecond}/>
          <Route path="/signup-confirm" component={SignupConfirm}/>
          <Route path="/tool/detail" component={ToolDetail}/>
          <Route path="/tool/search" component={Search}/>
          <Route path="/tool/add" component={AddTool}/>
          <Route path="/tool/shed" component={Toolshed}/>
          <Route path="/project/add" component={AddProject}/>
          <Route path="/project/list" component={AllProjects}/>
          <Route path="/user/feed" component={Feed}/>
          <Route path="/user/profile" component={Profile}/>
          <Route path="/user/public-page" component={PublicPage}/>
          <Route path="/user/settings" component={Settings}/>
          <Route path="/user/requests" component={Requests}/>
          <Route path="/logout" component={Logout}/>
        </Switch> 
        
      </div>
    )
  }
}

export default App

