import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {getUser} from "../utils/auth";

class SidePanel extends Component {
    constructor() {
        super()

        this.state = {
            user:{},
            tempImgUrl: ""
        }
                 
        }


    componentDidMount () {
        let temp_user = getUser();
        if (!temp_user.images[0]) {
            let image = "https://lh3.googleusercontent.com/proxy/6qM2XeC7GidAEwKNqnsd_rYcqdBlMda55Q-gTYlkjcS0KCQZ-bAxJsYCywnzHrQPC-ks2n5IPV-_maVVQkmUSyCzIwyXeQTa2YW8O1mjhZ6_Cl5jr5q2q08jjs_JnUA"
            this.setState({tempImgUrl: image })
        } else {
            this.setState({tempImgUrl:temp_user.images[0].imgPath})
        }    
        this.setState({user:temp_user});
        console.log(temp_user);

    }


    render() {
        return (
            <div className="side-panel-contents">
                <nav className="panel is-info">
                    <p className="panel-heading">
                        {this.state.user.displayname}
                    </p>
                    <div className="panel-block-img">
                        <img src={this.state.tempImgUrl} alt=""/>
                    </div>
                    
                    <p className="panel-block is-active">
                      <Link to="/user/home">Dashboard</Link>
                    </p>
                    <p className="panel-block">
                      <Link to="/tool/shed">Toolshed</Link>
                    </p>
                    <p className="panel-block">
                      <Link to="/user/feed">Craft Buddies</Link>
                    </p>
                    <p className="panel-block">
                      <Link to="/user/requests">Requests</Link>
                    </p>
                    <p className="panel-block">
                      <Link to="/user/profile">Profile</Link>
                    </p>
                    <p className="panel-block">
                        <Link to="/user/settings">Settings</Link>
                    </p>
                    <p className="panel-block">
                        <Link to="/">Intro</Link>
                    </p>

                    
                    <div className="panel-block">
                        <button className="button is-link is-outlined is-fullwidth logout-btn">
                        <Link to="/logout">Logout</Link>
                        </button>
                    </div>
                    </nav>
                <div>

                    
                    
                </div>
            </div>
        )
    }
}

export default SidePanel
