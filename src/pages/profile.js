import React, { Component } from 'react';
import DefaultLayout from "../layouts/Default";
import {Container,Row,Col,Button,Card,Form} from 'react-bootstrap';
import {getUser} from "../utils/auth";
import {uploadUserImg,updateProfile} from '../utils/userQueries';


class profile extends Component {
    constructor(props) {
        super(props)

        this.handleFileUpload = this.handleFileUpload.bind(this);

        this.state = {
            response: 0 ,
            userInfo: {
                displayname: "",
                firstname: "",
                lastname: "",
                phone: "",
                address: [],
                // street1:"",
                // street2: "",
                // lotNo: "",
                // unitNo: "",
                // city: "",
                // pcode: "",
                email: "",
                new_reqs: false,
                friendsNo:0,
                images:[],
                _id : ""
            }, 
            message: null,
            error:null 
        }
    }

    handleFileUpload = (e) => {
        // debugger
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append("user-img", e.target.files[0]);
        
        uploadUserImg(uploadData)
        .then(response => {
            console.log('response is: ', response); 
            let temp_user_info = {...this.state.userInfo};
            temp_user_info.images.push(response);
            this.setState({ userInfo:temp_user_info });
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        debugger
        
        updateProfile(this.state.userInfo)
        .then(res => {
            if (res.status===200){
                console.log('updated: ', res);
                // let newToolId = res.data._id
                this.setState({message:"Profile updated successfully!"})
            }
        })
        .catch(err => {
            console.log("Error while adding the thing: ", err);
        });
    }  

    componentDidMount () {
        debugger
        let temp_user = getUser();
        let temp_user_info = {...this.state.userInfo};
        temp_user_info._id = temp_user._id;
        temp_user_info.address = [...temp_user.address]
        // temp_user_info.street1 = temp_user.address[0].street1
        // temp_user_info.street2 = temp_user.address[0].street2
        // temp_user_info.lotNo = temp_user.address[0].lotNo
        // temp_user_info.unitNo = temp_user.address[0].unitNo
        // temp_user_info.city = temp_user.address[0].city
        // temp_user_info.pcode = temp_user.address[0].pcode
        temp_user_info.displayname = temp_user.displayname
        temp_user_info.firstname = temp_user.firstname
        temp_user_info.lastname = temp_user.lastname
        temp_user_info.phone = temp_user.phone
        temp_user_info.email = temp_user.email
        temp_user_info.new_reqs = temp_user.new_reqs
        temp_user_info.friendsNo = temp_user.buddies.length

        if (temp_user.images.length>0) {
            temp_user_info.images = [...temp_user.images]

        } else {
            temp_user_info.images = {imgName:"avatar", imgPath:"https://res.cloudinary.com/persia/image/upload/v1586683045/toolshare/Layout/avatar_brcvks.png"}
        }

        this.setState({userInfo:temp_user_info})
    }

    render() {
        return (
            <DefaultLayout>
                <h1 className="title">Private Profile</h1>
                <Container>
                    <Row>                        
                        {this.state.message && 
                            <h6>{this.state.message}</h6>
                        }
                        
                    </Row>
                </Container>
                <Container>
                    <Form className="user-profile" onSubmit={this.handleFormSubmit}> 
                        <Form.Row>
                            <Col>
                            </Col>
                            <Col md="4">
                                <Card style={{ width: '18rem' }}>
                                    {this.state.userInfo.images.length>0 && 
                                        <Card.Img variant="top" src={ this.state.userInfo.images[0].imgPath} />}
                                    <Card.Body>
                                        <Card.Title>Upload a picture</Card.Title>
                                        <Card.Text></Card.Text>
                                        <Form.File 
                                            id="custom-file"
                                            label="Choose a file"
                                            custom
                                            name="user-img" 
                                            onChange={this.handleFileUpload}
                                        />
                                        {/* <Button variant="primary">Go somewhere</Button> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                        </Form.Row>            
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFirstname">
                                <Form.Label className="form-field-label">Firstname</Form.Label>
                                <Form.Control 
                                    name="firstname" 
                                    type="text"
                                    defaultValue={this.state.userInfo.firstname} 
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridLastname">
                                <Form.Label className="form-field-label">Lastname</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="lastname"
                                    defaultValue={this.state.userInfo.lastname} 
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridDisplayname">
                                <Form.Label className="form-field-label">Displayname</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="displayname" 
                                    defaultValue={this.state.userInfo.displayname} 
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>                        
                        </Form.Row>
                        {this.state.userInfo.address.length>0 && 
                            <>
                            <Form.Row>                        
                                <Form.Group as={Col} sm="12" md="8" controlId="formGridStreet1">
                                    <Form.Label className="form-field-label">Address Line 1</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="street1"
                                        defaultValue={this.state.userInfo.address.street1} 
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}  controlId="formGridLotNo">
                                    <Form.Label className="form-field-label">Building/House No</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="lotNo"
                                        defaultValue={this.state.userInfo.address.lotNo} 
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                {this.state.userInfo.address.street2.length===0 && 
                                    this.state.userInfo.address.unitNo.length>0 &&
                                        <Form.Group as={Col} md="2" controlId="formGridUnitNo">
                                            <Form.Label className="form-field-label">Apartment/Unit No</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="unitNo"
                                                defaultValue={this.state.userInfo.unitNo} 
                                                onChange={this.handleInputChange}
                                            />
                                        </Form.Group>
                                }                        
                            </Form.Row>
                            
                            {this.state.userInfo.address.street2.length>0 && 
                                <Form.Row>
                                    <Form.Group as={Col} md="8" controlId="formGridStreet2">
                                        <Form.Label className="form-field-label">Address Line 2</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="street2"
                                            defaultValue={this.state.userInfo.street2} 
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="formGridUnitNo">
                                        <Form.Label className="form-field-label">Apartment/Unit No</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="unitNo"
                                            defaultValue={this.state.userInfo.unitNo} 
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                </Form.Row>
                            }
                            </> 
                        }
                        
                                            
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label className="form-field-label">City</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="city"
                                    defaultValue={this.state.userInfo.city}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            {/* For future expansions */}
                            {/* <Form.Group as={Col} controlId="formGridState">
                                <Form.Label className="form-field-label">State</Form.Label>
                                <Form.Control as="select" defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Control>
                            </Form.Group> */}
                            <Form.Group as={Col} controlId="formGridPcode">
                                <Form.Label className="form-field-label">Postcode</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="pcode"
                                    defaultValue={this.state.userInfo.pcode} 
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label className="form-field-label">Phone</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="phone"
                                    defaultValue={this.state.userInfo.phone} 
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label className="form-field-label">Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="email"
                                    defaultValue={this.state.userInfo.email} 
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button className="login-btn" variant="primary" type="submit">Update</Button>
                    </Form>
                </Container>
                
            </DefaultLayout>

        )
    }
}

export default profile
