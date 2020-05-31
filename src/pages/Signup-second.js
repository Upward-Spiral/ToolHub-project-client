import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {signupSecond} from "../utils/auth";
import {getTempUser} from "../utils/auth";
import {getGeoCode} from '../utils/geoCode';
import {Button,Form,Container,Row,Col,Image} from 'react-bootstrap';


class SignupSecond extends Component {
    constructor() {
        super()

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            response: 0 ,
            tempUserInfo: { 
                displayname: "",
                firstname: "",
                lastname: "",
                phone: "",
                address: [],
                email: "",
                locationType:"Point",
                locationLatt:0,
                locationLong:0,
                _id : ""
            },
            tempAddress: {
                street1:"",
                street2: "",
                lotNo: "",
                unitNo: "",
                city: "",
                pcode: ""
            },
            error:null   
        }
    }

    handleInputChange (event) {
        debugger
        let temp_user = {...this.state.tempUserInfo};
        let temp_Address = {...this.state.tempAddress}
        let addressFields = ['street1','street2','lotNo','pcode','unitNo','city']
        if (addressFields.indexOf(event.target.name) !== -1) {
            temp_Address[event.target.name] = event.target.value;
        } else {
            temp_user[event.target.name] = event.target.value;
        }  
        this.setState({
            tempUserInfo:temp_user, 
            tempAddress:temp_Address
        })
    }

    handleFormSubmit(event) {
        debugger
        event.preventDefault();
        let temp_user = {...this.state.tempUserInfo};
        let address = `${this.state.tempAddress.street1} ${this.state.tempAddress.street2} ${this.state.tempAddress.lotNo} ${this.state.tempAddress.unitNo}, ${this.state.tempAddress.pcode} ${this.state.tempAddress.city}`
        getGeoCode(address)
            .then((geoLoc)=>{
                console.log(geoLoc)
                temp_user.locationLatt = geoLoc.lat;
                temp_user.locationLong = geoLoc.lng;

                let goodAddress = {
                    street1: this.state.tempAddress.street1,
                    street2: this.state.tempAddress.street2,
                    lotNo: this.state.tempAddress.lotNo,
                    unitNo: this.state.tempAddress.unitNo,
                    pcode: this.state.tempAddress.pcode, 
                    city: this.state.tempAddress.city
                }
                temp_user.address.push(goodAddress);
                signupSecond(temp_user)
                    .then((response) => {
                        if (response.status===200) {
                            this.setState({error:null}, ()=>{
                                this.props.history.push({
                                    pathname:`/signup-confirm`
                                })
                            })
                        } else {
                            console.log(response);
                        }
                        
                        
                    })
                    .catch((error)=> {
                        console.log(error.response);
                        this.setState({error: error.response && error.response.data})
                    });
        })
        console.log(this.state.tempUserInfo)
        
    }

    componentDidMount () {
        debugger
        let temp_user_info = {...this.state.tempUserInfo};
        let tempUser = getTempUser() ;
        temp_user_info.displayname = tempUser.displayname;
        temp_user_info.email = tempUser.email;
        temp_user_info._id = tempUser._id;
        this.setState({tempUserInfo:temp_user_info})
    }

    render() {
        return (          
            <div>
                <Container className="signup-frame" fluid >
                    <Row>
                        <Col sm={7}>
                            <Form className="signup-form" onSubmit={this.handleFormSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} >
                                        <Form.Label className="form-field-label">Firstname</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="firstname" 
                                            value={this.state.tempUserInfo.firstname} 
                                            onChange={this.handleInputChange}
                                            />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label className="form-field-label">Lastname</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="lastname" 
                                            value={this.state.tempUserInfo.lastname} 
                                            onChange={this.handleInputChange}
                                            />
                                    </Form.Group>
                                    
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} sm={9} >
                                        <Form.Label className="form-field-label">Address Line 1</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="street1" 
                                            value={this.state.tempAddress.street1}
                                            onChange={this.handleInputChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} sm={3} >
                                        <Form.Label className="form-field-label">Buildin No</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="lotNo" 
                                            value={this.state.tempAddress.lotNo} 
                                            onChange={this.handleInputChange}
                                            />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} sm={9} >
                                        <Form.Label className="form-field-label">Address Line 2</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="street2" 
                                            value={this.state.tempAddress.street2} 
                                            onChange={this.handleInputChange}
                                            />
                                    </Form.Group>
                                
                                    <Form.Group as={Col} sm={3} >
                                        <Form.Label className="form-field-label">Apartment No</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="unitNo" 
                                            value={this.state.tempAddress.unitNo} 
                                            onChange={this.handleInputChange}
                                            />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label className="form-field-label">Postal Code</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="pcode" 
                                        value={this.state.tempAddress.pcode} 
                                        onChange={this.handleInputChange}
                                    />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label className="form-field-label">City</Form.Label>
                                    <Form.Control
                                        type="text" 
                                        name="city" 
                                        value={this.state.tempAddress.city} 
                                        onChange={this.handleInputChange}
                                    />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label className="form-field-label">Phone number</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="phone" 
                                            value={this.state.tempUserInfo.phone}  
                                            onChange={this.handleInputChange}
                                            />
                                    </Form.Group>
                                    
                                </Form.Row> 
                                <Button className="signup-btn" variant="primary" type="submit">Signup</Button> 
                                <Button className="back-btn" variant="secondary"><Link to="/">Cancel</Link></Button> 
                            </Form>
                        </Col>
                        <Col sm={5}>
                            <Image className="signup-page-image" src="https://res.cloudinary.com/persia/image/upload/v1587102386/toolshare/Layout/81g5v0vTkaL._AC_SY879__q8fnyo.jpg" fluid />
                        </Col>
                    </Row>
                </Container>

      
                    
                </div>
            )
        // }
        
  
    }
}

export default SignupSecond
