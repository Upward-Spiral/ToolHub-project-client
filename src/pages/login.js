import React, { Component } from 'react';
import {login} from "../utils/auth";
import { Link } from 'react-router-dom';
import {Button,Form,Container,Row,Col,Image} from 'react-bootstrap';

class Login extends Component {
    constructor() {
        super()

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            response: 0 ,
            loginData: {
                username:"",  
                password : "", 
            }, 
            newUser:{},
            error: null   
        }
    }

    handleInputChange (event) {
        // debugger
        let temp_user = {...this.state.loginData};
        temp_user[event.target.name] = event.target.value;
        this.setState({loginData:temp_user})
    }

    handleFormSubmit(event) {
        event.preventDefault();
        debugger
        login(this.state.loginData)
        .then((response) => {
            if (response.status===201) {
                this.setState({error:null}, ()=>{
                    this.props.history.push({
                        pathname:`/user/home`
                    })
                })
            } else {
                this.setState({error:response.data.messageBody}, ()=>{
                    this.props.history.push({
                        pathname:`/login`
                    })
                })
            }
            
            
        })
        .catch((error)=> {
            console.log(error);
            this.setState({error: error})
        });
    }

    render() {
            return (          
                <>
                    {this.state.error ?
                        <div>
                            <h6>Something went wrong!</h6>
                            {/* <h6>{this.state.error}</h6> */}
                        </div>:
                        ""     
                    } 

                    <Container className="login-frame" fluid>
                        <Row className="login-frame-row">
                            
                            <Col  sm={4}>
                                <h1 className="title is-1 page-title">Login</h1> 
                                <Form className="login-form" onSubmit={this.handleFormSubmit}>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label className="form-field-label">Username:</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter username"
                                            name="username" 
                                            required
                                            value={this.state.loginData.username} 
                                            onChange={this.handleInputChange} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label className="form-field-label">Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Password"
                                            name="password" 
                                            required
                                            value={this.state.loginData.password} 
                                            onChange={this.handleInputChange} />   {/* the handler gets the event object by default */}
                                    </Form.Group>

                                    <Button className="login-btn login-page-btn" variant="primary" type="submit">Login</Button>
                                    <Button className="back-btn" variant="secondary"><Link to="/">Back</Link></Button>
                                </Form>
                            </Col>
                            <Col sm={8}>
                                <Image className="login-page-image" src="https://res.cloudinary.com/persia/image/upload/v1587090720/toolshare/Layout/jewellery-classes-kids_orig_k9hkxv.jpg" fluid />
                            </Col>
                        </Row>
                    
                    </Container>
      
                   
              </> 
            )

        
  
    }
}

export default Login;
