import React from 'react';
import { Link } from 'react-router-dom';
import {Container,Button,Jumbotron} from 'react-bootstrap';

function SignupConfirm() {
    return (
        <div>
            <Container>
                <Jumbotron>
                <h1>Congratulations!</h1>
                <p>
                    You are signed up! 
                </p>
                <p>Login to got to your homepage.</p>
                <p>
                    <Link to="/login"><Button variant="primary">Login</Button></Link>
                </p>
            </Jumbotron>

            </Container>
            
            
        </div>
    )
}

export default SignupConfirm;
