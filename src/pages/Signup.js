import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {signup,checkUsername,checkEmailUniqueness} from "../utils/auth";
import {hasNumber,hasMixed,hasSpecial/* ,strengthColor,lengthIndicator */ } from '../utils/passwordStrength';
import {hasAtSign} from '../utils/emailFormat';
import ErrorMessage from '../components/errorMessage';
import {Button,Form,Container,Row,Col,Image} from 'react-bootstrap';

class Signup extends Component {
    constructor() {
        super()

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.checkUserPass = this.checkUserPass.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.passDoubleCheck = this.passDoubleCheck.bind(this);
        this.checkUsernameIsFree = this.checkUsernameIsFree.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.allGoodWithPassword = this.allGoodWithPassword.bind(this);

        this.passwordInput = React.createRef();
        this.passwordCheck = React.createRef();
        this.usernameInput = React.createRef();
        this.emailInput = React.createRef();
    

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

    //Check username for uniqueness
    checkUsernameIsFree (event) {
        debugger
        let $usernameControlMessage = document.getElementById('usernameControlMessage');
        checkUsername(this.state.tempUser.username)
            .then((response)=>{
                if (response.status === 204) {                   
                    this.usernameInput.current.focus();           
                    $usernameControlMessage.innerHTML = "This username is taken! Choose another one!"           
                } else {
                    $usernameControlMessage.innerHTML = ""
                }
            })
    }

    checkEmail (event) {
        debugger
        let value = event.target.value;
        let $emailControlMessage = document.getElementById('emailControlMessage');
        if (!hasAtSign(value)) {
            this.emailInput.current.focus();               
            $emailControlMessage.innerHTML = "Password should include @.";
        } else {
            checkEmailUniqueness (value)
                .then(response => {
                    if (response.status === 204) {
                        this.emailInput.current.focus();
                        $emailControlMessage.innerHTML = "This email is already sscoiated with an account! Choose another one!";       
                    } else {
                        $emailControlMessage.innerHTML = "";
                    }
                })
                .catch(err => {
                    console.log( `Error, email uniqueness check failed because: ${err}`)
                })
        }
    }

    // Checks password for complexity 
    handlePasswordInput (event) {
        let value = event.target.value;
        var errorsArr = []

        if (value.length < 8 ) {
            let tooShortErr = "Password too short!(must have at least 8 characters)";
            errorsArr.push(tooShortErr);
        }
        if (!hasNumber(value)) {           
            let hasNumErr = "Password should include at least 1 number.";
            errorsArr.push (hasNumErr);
        };
        if (!hasMixed(value)) {
            let hasMixErr = "Password should include both uppercase and lowercase letters.";
            errorsArr.push(hasMixErr);
        };
        if (!hasSpecial(value)) {
            let hasSpecErr = "Password should include at least 1 special character (!,#,@,$,%,^,&,*,),(,+,=,.,_,-).";
            errorsArr.push(hasSpecErr);
        };

        let temp_user = {...this.state.tempUser};
        temp_user.password = event.target.value;
        this.setState({errors:errorsArr,tempUser:temp_user})

    }

    // Checks if username is the same as password
    checkUserPass (event) {
        // debugger

        let $userPassControlMessage = document.getElementById('userPassControlMessage');
        $userPassControlMessage.innerHTML = ""
        if (this.state.tempUser.password===this.state.tempUser.username) {
            this.passwordInput.current.focus();           
            $userPassControlMessage.innerHTML = "Password can not be the same as username!"
        }
    }

    passDoubleCheck (event) {
        let temp_user = {...this.state.tempUser};       
        temp_user.password_check = event.target.value;
        let $passCheckMessage = document.getElementById('passCheckMessage');
        $passCheckMessage.innerHTML = "";
        if (this.state.tempUser.password !== temp_user.password_check) {          
            $passCheckMessage.innerHTML = "Passwords do not match!"
        } else {
            this.allGoodWithPassword();
        }
        this.setState({tempUser:temp_user})
    }

    

    handleInputChange (event) {
        // debugger
        var errorsArr = [];
        let temp_user = {...this.state.tempUser};      
        temp_user[event.target.name] = event.target.value;
        if (event.target.name === "username") {
            let $usernameControlMessage = document.getElementById('usernameControlMessage');
            $usernameControlMessage.innerHTML = ""
        }
        if (event.target.name === "email") {
            let $emailControlMessage = document.getElementById('emailControlMessage');
            $emailControlMessage.innerHTML = ""
        }
        this.setState({errors:errorsArr,tempUser:temp_user})
    }

    allGoodWithPassword() {
        if (this.state.errors.length === 0) {
            this.setState({btnDisabled:false})
        } else{
            this.passwordCheck.current.focus();
        }
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
                                                    ref={this.usernameInput}
                                                    value={this.state.tempUser.username} 
                                                    onChange={this.handleInputChange}
                                                    onBlur={this.checkUsernameIsFree} 
                                                />                           
                                            </Form.Group>
                                            <div><p className="errorMessage" id="usernameControlMessage"></p></div>
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
                                                    ref={this.emailInput} 
                                                    value={this.state.tempUser.email} 
                                                    onChange={this.handleInputChange}
                                                    onBlur={this.checkEmail}
                                                />
                                                
                                            </Form.Group>
                                            <div><p className="errorMessage" id="emailControlMessage"></p></div>
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
                                            <div><p className="errorMessage" id="userPassControlMessage"></p></div>
                                        </Col>
                                    <Col>
                                        <Form.Group controlId="password_check">
                                            <Form.Label className="form-field-label">Repeat Password</Form.Label>
                                            <Form.Control 
                                                type="password"                               
                                                name="password_check" 
                                                ref={this.passwordCheck}
                                                value={this.state.tempUser.password_check} 
                                                onChange={this.passDoubleCheck}
                                            />
                                        </Form.Group>
                                        <div><p className="errorMessage" id="passCheckMessage"></p></div>
                                    </Col>
                                    </Row>
                                    {/* <Row>
                                        <Col>
                                            <Form.Group controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="I have read and agreed with " className="form-field-label"/>
                                                <a href="#">terms and conditions</a>
                                            </Form.Group>
                                        </Col>
                                    </Row> */}
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
