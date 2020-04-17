import React, { Component } from 'react';
import {signup} from "../utils/auth";
import { Link } from 'react-router-dom';
import {Button,Form,Container,Row,Col,Image} from 'react-bootstrap';

class Signup extends Component {
    constructor() {
        super()

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            response: 0 ,
            tempUser: {
                username:"",
                displayname  : "",  
                email : "",
                password : "",   
                password_check : "",
                
            }, 
            error:null   
        }
    }

    handleInputChange (event) {
        // debugger
        let temp_user = {...this.state.tempUser};
        temp_user[event.target.name] = event.target.value;
        this.setState({tempUser:temp_user})
    }

    handleFormSubmit(event) {
       event.preventDefault();
        debugger
        signup(this.state.tempUser)
        .then((response) => {
            if (response.status===200) {
                this.setState({error:null}, ()=>{
                    this.props.history.push({
                        pathname:`/signup-second`
                    })
                })
            } else  {
                this.setState({error:response})
                console.log(response)
            }
            
            
        })
        .catch((error)=> {
            console.log(error.response);
            this.setState({error: error.response && error.response.data})
        });
    }


    render() {
            return (          
                
                   
                <div className= "signup-form"> 
                    

                    <Container className="signup-frame" fluid>
                        <Row className="signup-frame-row">                           
                            <Col  sm={4}>
                                <h1 class="title page-title">Signup <span>Page 1 of 2</span></h1>  
                                 
                                <Form className="signup-form" onSubmit={this.handleFormSubmit}>
                                    <Row>
                                        <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label className="form-field-label">Username:</Form.Label>
                                        <Form.Control 
                                            type="text"                                
                                            name="username" 
                                            value={this.state.tempUser.username} 
                                            onChange={this.handleInputChange} 
                                        />                           
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label className="form-field-label">Displayname:</Form.Label>
                                        <Form.Control 
                                            type="text"                                
                                            name="displayname" 
                                                    value={this.state.tempUser.displayname} 
                                                    onChange={this.handleInputChange}
                                        />
                                        
                                    </Form.Group>
                                    </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label className="form-field-label">Email address</Form.Label>
                                        <Form.Control 
                                            type="email"                             
                                            name="email" 
                                            value={this.state.tempUser.email} 
                                            onChange={this.handleInputChange}
                                        />
                                        
                                    </Form.Group>
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label className="form-field-label">Password</Form.Label>
                                        <Form.Control 
                                            type="password"                               
                                            name="password" 
                                            value={this.state.tempUser.password} 
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label className="form-field-label">Repeat Password</Form.Label>
                                        <Form.Control 
                                            type="password"                               
                                            name="password_check" 
                                            value={this.state.tempUser.password_check} 
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <Button className="login-btn" variant="primary" type="submit">Next</Button>
                                        <Button className="back-btn" variant="secondary"><Link to="/">Back</Link></Button>
                                        </Col>
                                    </Row>
                                    
                                </Form>
                            </Col>
                    <Col sm={8}>
                        <Image className="signup-page-image" src="https://res.cloudinary.com/persia/image/upload/v1587090720/toolshare/Layout/jewellery-classes-kids_orig_k9hkxv.jpg" fluid />
                    </Col>
                </Row>
            </Container>


                        
                        
                    
                </div>
            )
        // }
        
  
    }
}


export default Signup;
