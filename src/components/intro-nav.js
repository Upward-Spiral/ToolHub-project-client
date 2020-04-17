import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar,Nav,Button} from 'react-bootstrap';




function introNav() {
    return (
        <div>
            <Navbar className="intro-nav" expand="lg">
                <img src="https://res.cloudinary.com/persia/image/upload/v1586846009/toolshare/Layout/toolshed-logo_ffwxlu.png" alt="" width="40" height="40"/>
                <Navbar.Brand className="logo-title" href="#home" style={{color: "#fad700"}} >ToolHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/about"><Nav.Link href="#home" style={{color: "#f5eebc"}}>About</Nav.Link></Link>
                        <Link to="/contactUs"><Nav.Link href="#link" style={{color: "#f5eebc"}}>Contact Us</Nav.Link></Link>
                    </Nav>
                        <Button className="signup-btn intro-btn" variant="outline-success"><strong><Link to="/signup">Signup</Link></strong></Button>
                        <Button className="login-btn intro-btn" variant="outline-success"><Link to="/login">Login</Link></Button>
                </Navbar.Collapse>
            </Navbar>


        </div>
    )
}

export default introNav;


// 