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
            let image = "https://res.cloudinary.com/persia/image/upload/v1586683045/toolshare/Layout/avatar_brcvks.png"
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
                    <p className="panel-heading" id="panel-heading">
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
                        
                        <Link to="/logout"><button className="button is-link is-outlined is-fullwidth logout-btn">Logout</button></Link>
                        
                    </div>
                    </nav>
                <div>

                    
                    
                </div>
            </div>
        )
    }
}

export default SidePanel
