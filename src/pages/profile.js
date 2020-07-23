import React, { Component }                             from 'react';
import { getUser, setUser }                             from "../utils/auth";
import { getGeoCode }                                   from '../utils/geoCode';
import { updateUserImg,uploadUserImg,updateProfile }    from '../utils/userQueries';
import { Container,Row,Col,Button,Card,Form }           from 'react-bootstrap';
//import DefaultLayout from "../layouts/Default";


class profile extends Component {
    constructor(props) {
        super(props)

        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            response: 0 ,
            userInfo: {
                displayname: "",
                firstname: "",
                lastname: "",
                phone: "",
                address: [],
                email: "",       
                locationType: "Point",
                locationLatt: 0,
                locationLong: 0,
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
            new_reqs: false,
            friendsNo: 0,
            images: [], 
            addressChange:false,
            message: null,
            error:null 
        }
    }

    handleInputChange (event) {
        // debugger
        let temp_user = {...this.state.userInfo};
        let temp_Address = {...this.state.tempAddress}
        let addrChange = this.state.addressChange;
        let addressFields = ['street1','street2','lotNo','pcode','unitNo','city']
        if (addressFields.indexOf(event.target.name) !== -1) {
            addrChange = true;
            temp_Address[event.target.name] = event.target.value;
        } else {
            temp_user[event.target.name] = event.target.value;
        }
        
        this.setState({
            userInfo:temp_user, 
            addressChange:addrChange,
            tempAddress:temp_Address
        })
    }

    handleFileUpload = (e) => {
        debugger
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append("user-img", e.target.files[0]);
        var temp_images = [...this.state.images];
        uploadUserImg(uploadData)
            .then(response => {
                console.log('response is: ', response);            
                temp_images.unshift(response);  
                console.log(temp_images[0])
                updateUserImg(temp_images[0])
                    .then(resp =>{
                        console.log('resp is: ', resp);
                        setUser(resp);
                        window.location.reload();

                    })
                    .catch(err => {
                        console.log("Error while updating the image: ", err);
                    });
                
                             
            })
            .catch(err => {
            console.log("Error while uploading the image: ", err);
            });
        
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        debugger
        var temp_user = {...this.state.userInfo};
        var temp_Address = {...this.state.tempAddress};
        if (this.state.addressChange) {           
            let address = `${temp_Address.street1} ${temp_Address.street2} ${temp_Address.lotNo} ${temp_Address.unitNo}, ${temp_Address.pcode} ${temp_Address.city}`;
            getGeoCode(address)
                .then((geoLoc) => {
                    temp_user.locationLatt = geoLoc.lat;
                    temp_user.locationLong = geoLoc.lng;
                    temp_user.address.splice(0,1,temp_Address);
                    updateProfile(temp_user)
                        .then(resp => {
                            if (resp.status===200){
                                console.log('updated: ', resp.data);
                                setUser(resp.data);
                                window.location.reload();
                                // this.setState({
                                //     userInfo: temp_user,
                                //     message:"Profile updated successfully!"
                                // })
                            }
                        })
                        .catch(err => {
                            console.log("Error while updating user's profile: ", err);
                        });
                })
        } else {
            updateProfile(temp_user)
                .then(resp => {
                    if (resp.status===200){
                        console.log('updated: ', resp.data);
                        setUser(resp.data);
                        window.location.reload();
                        // this.setState({
                        //     userInfo: temp_user,
                        //     message:"Profile updated successfully!"
                        // })
                    }
                })
                .catch(err => {
                    console.log("Error while updating user's profile: ", err);
                });
        }
        
    }  

    componentDidMount () {
        debugger
        let temp_user = getUser();
        let temp_new_reqs = temp_user.new_reqs;
        let temp_friendsNo = temp_user.buddies.length;
        let temp_user_info = {...this.state.userInfo};
        let temp_Address = temp_user.address[0]
        let temp_images = []

        temp_user_info._id = temp_user._id;
        temp_user_info.address = [...temp_user.address];
        temp_user_info.locationLong = temp_user.location.coordinates[0];
        temp_user_info.locationLatt = temp_user.location.coordinates[1];
        temp_user_info.displayname = temp_user.displayname;
        temp_user_info.firstname = temp_user.firstname;
        temp_user_info.lastname = temp_user.lastname;
        temp_user_info.phone = temp_user.phone;
        temp_user_info.email = temp_user.email;
      

        if (temp_user.images.length>0) {
            temp_images = [...temp_user.images];

        } else {
            temp_images.push({imgName:"avatar", imgPath:"https://res.cloudinary.com/persia/image/upload/v1586683045/toolshare/Layout/avatar_brcvks.png"})
        }

        this.setState({
            userInfo:temp_user_info,
            new_reqs: temp_new_reqs,
            friendsNo: temp_friendsNo,
            images: temp_images,
            tempAddress: temp_Address
        });
    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <h1 className="title page-title">Private Profile<span></span></h1>
                        </Col>
                    </Row>
                    <Row>                        
                        {this.state.message && 
                            <h6>{this.state.message}</h6>
                        }                        
                    </Row>
                </Container>
                <Container>
                    <Form className="user-profile" onSubmit={this.handleFormSubmit}> 
                        <Row>
                            <Col className="profile-pic-card" sm="7" md="6">
                                <Card style={{ width: '100%' }}>
                                    {this.state.images.length>0 && 
                                        <Card.Img variant="top" src={ this.state.images[0].imgPath} />}
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
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm="5" md="6">
                                <Form.Row id="first-row">
                                    <Form.Group as={Col} sm="9" md="8" lg="12" controlId="formGridFirstname">
                                        <Form.Label className="form-field-label">Firstname</Form.Label>
                                        <Form.Control 
                                            name="firstname" 
                                            type="text"
                                            defaultValue={this.state.userInfo.firstname} 
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} sm="9" md="8" lg="12" controlId="formGridLastname">
                                        <Form.Label className="form-field-label">Lastname</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="lastname"
                                            defaultValue={this.state.userInfo.lastname} 
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} sm="9" md="8" lg="12" controlId="formGridDisplayname">
                                        <Form.Label className="form-field-label">Displayname</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="displayname" 
                                            defaultValue={this.state.userInfo.displayname} 
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>                        
                                </Form.Row>
                            </Col>                              
                        </Row>            
                        
                        {this.state.userInfo.address.length>0 && 
                            <>
                            <Form.Row>                        
                                <Form.Group as={Col} sm="12" md="8" controlId="formGridStreet1">
                                    <Form.Label className="form-field-label">Address Line 1</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="street1"
                                        defaultValue={this.state.tempAddress.street1} 
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}  controlId="formGridLotNo">
                                    <Form.Label className="form-field-label">Building/House No</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="lotNo"
                                        defaultValue={this.state.tempAddress.lotNo} 
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                {!this.state.tempAddress.street2 && 
                                    this.state.tempAddress.unitNo &&
                                        <Form.Group as={Col} md="2" controlId="formGridUnitNo">
                                            <Form.Label className="form-field-label">Apartment/Unit No</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="unitNo"
                                                defaultValue={this.state.tempAddress.unitNo} 
                                                onChange={this.handleInputChange}
                                            />
                                        </Form.Group>
                                }                        
                            </Form.Row>
                            
                            {this.state.tempAddress.street2 && 
                                <Form.Row>
                                    <Form.Group as={Col} md="8" controlId="formGridStreet2">
                                        <Form.Label className="form-field-label">Address Line 2</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="street2"
                                            defaultValue={this.state.tempAddress.street2} 
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="formGridUnitNo">
                                        <Form.Label className="form-field-label">Apartment/Unit No</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="unitNo"
                                            defaultValue={this.state.tempAddress.unitNo} 
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                </Form.Row>
                            }
                            </> 
                        }
                        
                        {this.state.userInfo.address.length>0 && 
                            <Form.Row>
                                <Form.Group as={Col} sm="6" controlId="formGridCity">
                                    <Form.Label className="form-field-label">City</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="city"
                                        defaultValue={this.state.tempAddress.city}
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
                                <Form.Group as={Col} sm="6" controlId="formGridPcode">
                                    <Form.Label className="form-field-label">Postcode</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="pcode"
                                        defaultValue={this.state.tempAddress.pcode} 
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm="6" controlId="formGridPhone">
                                    <Form.Label className="form-field-label">Phone</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="phone"
                                        defaultValue={this.state.userInfo.phone} 
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                        }                    
                        
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
                        <Button className="secondary-btn" variant="primary" type="submit">Update</Button>
                    </Form>
                </Container>
                
            </>

        )
    }
}

export default profile
