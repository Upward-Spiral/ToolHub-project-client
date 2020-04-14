import React from 'react';
import { Link } from 'react-router-dom';
// import { Button, Field, Control, Icon, Card, Content, Media, Container, Level, Nav } from 'reactbulma';

// https://res.cloudinary.com/persia/image/upload/v1586846009/toolshare/Layout/toolshed-logo_ffwxlu.png

function introNav() {
    return (
        <div>
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                    <img src="https://res.cloudinary.com/persia/image/upload/v1586846009/toolshare/Layout/toolshed-logo_ffwxlu.png" width="40" height="40"/>
                    </a>

                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        
                            <Link to="/about"><a class="navbar-item">About</a></Link>
                        

                        
                            <Link to="/contactUs"><a class="navbar-item">Contact Us</a></Link>
                        

                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                            More
                            </a>

                            <div class="navbar-dropdown">
                                <a class="navbar-item">
                                    About
                                </a>
                                <a class="navbar-item">
                                    Jobs
                                </a>
                                <a class="navbar-item">
                                    Contact
                                </a>
                                <hr class="navbar-divider"/>
                                <a class="navbar-item">
                                    Report an issue
                                </a>
                            </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons"> 
                            <strong><Link to="/signup"><a class="button is-primary">Signup</a></Link></strong>
                            <Link to="/login"><a class="button is-light">Login</a></Link>                     
                        </div>
                    </div>
                </div>
            </div>
        </nav>
            
            
            
            

            <Link to="/logout">Logout</Link>  {/*temp */}

        </div>
    )
}

export default introNav;
