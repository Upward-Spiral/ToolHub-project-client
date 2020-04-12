import React from 'react';
import { Link } from 'react-router-dom';

function SignupConfirm() {
    return (
        <div>
            <h1>Signup successful!</h1>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default SignupConfirm;
