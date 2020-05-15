import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {signup} from "../utils/auth";
import {hasNumber,hasMixed,hasSpecial/* ,strengthColor,lengthIndicator */ } from '../utils/passwordStrength';
import ErrorMessage from '../components/errorMessage';
import {Button,Form,Container,Row,Col,Image} from 'react-bootstrap';

class Signup extends Component {
    constructor() {
        super()

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.checkUserPass = this.checkUserPass.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);

        this.passwordInput = React.createRef();
        this.passwordCheck = React.createRef();
    

        this.state = {
            response: 0 ,
            tempUser: {
                username:"",
                displayname  : "",  
                email : "",
                password : "",   
                password_check : "",
                
            }, 
            btnDisabled: true,
            errors:[]   
        }
    }

    // Checks password for complexity 
    handlePasswordInput (event) {
        let value = event.target.value;
        let $passControlMessage = document.getElementById('passControlMessage');
        $passControlMessage.innerHTML = "";
        var errorsArr = []
        // let $passCheckErrorList = document.getElementById('passCheckError');
        // $passCheckErrorList.innerHTML = "";
        if (value.length < 8 ) {
            let tooShortErr = "Password too short!(must have at least 8 characters)";
            errorsArr.push(tooShortErr);
        }
        if (!hasNumber(value)) {           
            // let $passCheckErroritem = document.createElement('li');
            // $passCheckErroritem.innerHTML = "Password should include at least 1 number.";
            // $passCheckErrorList.appendChild($passCheckErroritem);
            let hasNumErr = "Password should include at least 1 number.";
            errorsArr.push (hasNumErr);
        };
        if (!hasMixed(value)) {
            // let $passCheckErroritem = document.createElement('li');
            // $passCheckErroritem.innerHTML = "Password should include both uppercase and lowercase letters.";
            // $passCheckErrorList.appendChild($passCheckErroritem);
            let hasMixErr = "Password should include both uppercase and lowercase letters.";
            errorsArr.push(hasMixErr);
        };
        if (!hasSpecial(value)) {
            // let $passCheckErroritem = document.createElement('li');
            // $passCheckErroritem.innerHTML = "Password should include at least 1 special character (!,#,@,$,%,^,&,*,),(,+,=,.,_,-).";
            // $passCheckErrorList.appendChild($passCheckErroritem);
            let hasSpecErr = "Password should include at least 1 special character (!,#,@,$,%,^,&,*,),(,+,=,.,_,-).";
            errorsArr.push(hasSpecErr);
        };
        let temp_user = {...this.state.tempUser};
        temp_user.password = event.target.value;
        this.setState({errors:errorsArr,tempUser:temp_user})

    }

    // Checks if username is the same as password
    checkUserPass (event) {
        debugger
        // let temp_user = {...this.state.tempUser};
        // let tempPass = event.target.value
        let $passControlMessage = document.getElementById('passControlMessage');
        $passControlMessage.innerHTML = ""
        if (this.state.tempUser.password===this.state.tempUser.username) {
            this.passwordInput.current.focus();           
            $passControlMessage.innerHTML = "Password can not be the same as username!"
        }
    }

    passDoubleCheck (event) {
        if (this.state.tempUser.password === this.state.tempUser.password_check) {
            this.passwordCheck.current.focus();
            let $passControlMessage = document.getElementById('passControlMessage');
            $passControlMessage.innerHTML = "Passwords do not match!"
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
                                <h1 className="title page-title">Signup <span>Page 1 of 2</span></h1>  
                                 
                                <Form className="signup-form" onSubmit={this.handleFormSubmit}>
                                    <Row>
                                        <Col>
                                    <Form.Group controlId="username">
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
                                    <Form.Group controlId="displayname">
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
                                            <Form.Group controlId="Password">
                                                <Form.Label className="form-field-label">Password</Form.Label>
                                                <Form.Control 
                                                    type="password"                               
                                                    name="password" 
                                                    ref={this.passwordInput}
                                                    value={this.state.tempUser.password} 
                                                    onChange={this.handlePasswordInput}
                                                    onBlur={this.checkUserPass}
                                                />
                                            </Form.Group>
                                            <ErrorMessage
                                                errorsArray={this.state.errors}
                                                
                                            />
                                            <div ><p id="passControlMessage"></p></div>
                                        </Col>
                                    <Col>
                                    <Form.Group controlId="password_check">
                                        <Form.Label className="form-field-label">Repeat Password</Form.Label>
                                        <Form.Control 
                                            type="password"                               
                                            name="password_check" 
                                            ref={this.passwordCheck}
                                            value={this.state.tempUser.password_check} 
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <Button className="login-btn" variant="primary" type="submit" disabled={this.state.btnDisabled}>Next</Button>
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
