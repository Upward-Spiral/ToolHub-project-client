import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar,Nav,Button} from 'react-bootstrap';


// https://res.cloudinary.com/persia/image/upload/v1586846009/toolshare/Layout/toolshed-logo_ffwxlu.png

function introNav() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <img src="https://res.cloudinary.com/persia/image/upload/v1586846009/toolshare/Layout/toolshed-logo_ffwxlu.png" alt="" width="40" height="40"/>
                <Navbar.Brand href="#home">ToolShare</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home"><Link to="/about">About</Link></Nav.Link>
                        <Nav.Link href="#link"><Link to="/contactUs">Contact Us</Link></Nav.Link>
                    </Nav>
                        <Button variant="outline-success"><strong><Link to="/signup">Signup</Link></strong></Button>
                        <Button variant="outline-success"><Link to="/login">Login</Link></Button>
                </Navbar.Collapse>
            </Navbar>


        </div>
    )
}

export default introNav;
