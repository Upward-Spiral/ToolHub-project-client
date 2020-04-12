import React from 'react';
import { Link } from 'react-router-dom';

function introNav() {
    return (
        <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/about">About</Link>
            <Link to="/contactUs">Contact Us</Link>

            <Link to="/logout">Logout</Link>  {/*temp */}

        </div>
    )
}

export default introNav;
