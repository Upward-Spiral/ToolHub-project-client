import React from 'react';
import { Link } from 'react-router-dom';
import {Container,Button,Jumbotron, Col, Row} from 'react-bootstrap';

function SignupConfirm() {
    return (
        <div className="confirmation">
            <Container id="confirmation">
                <Jumbotron>
                    <Row>
                        <Col id="confirmation-col1">
                            <h1>Congratulations!</h1>
                            <p>You are signed up!</p>
                            <p>Login to go to your homepage.</p>
                            <p>
                                <Link to="/login"><Button variant="primary" className="secondary-btn" id="special-btn">Login</Button></Link>
                            </p> 
                        </Col>
                        <Col id="confirmation-col2">
                            <img src="https://res.cloudinary.com/persia/image/upload/v1590059526/toolshare/Layout/thumbs-up_k8bccb.jpg" alt=""/>
                        </Col>
                    </Row>
                    
                
            </Jumbotron>

            </Container>
            
            
        </div>
    )
}

export default SignupConfirm;
