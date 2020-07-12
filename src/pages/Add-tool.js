import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from "../layouts/Default";
import {UploadToolImg,createNewTool} from '../utils/toolQueries';
import {getCatL0List, getCatL1List, getCatL2List} from '../utils/service'
import {getUser} from '../utils/auth';
import {Container,Row,Col,Card,Button,Form} from 'react-bootstrap';

class AddTool extends Component {
    constructor(props) {
        super(props)

        this.handleInputChange   = this.handleInputChange.bind(this);
        this.resetForm           = this.resetForm.bind(this);
        this.handleFormSubmit    = this.handleFormSubmit.bind(this);
        this.handleFileUpload    = this.handleFileUpload.bind(this);
        this.handleCatL0Select   = this.handleCatL0Select.bind(this);
        this.handleCatL1Select   = this.handleCatL1Select.bind(this);
        this.handleCatL2Select   = this.handleCatL2Select.bind(this);

        this.fileInput = React.createRef();

        this.state = {
            response: 0 ,
            catL0List:[],
            selectedCatL0: "",
            catL1List:[],
            selectedCatL1: "",
            catL2List:[],
            selectedCatL2: "",
            tempToolInfo: {
                name: "",
                brand: "",
                modelNo: "",
                category:[],
                description: "",
                images: [],
                locationType:"Point",
                locationLatt:0,
                locationLong:0

            }, 
            error:null   
        }
    }

    handleInputChange (event) {
        // debugger
        let temp_tool = {...this.state.tempToolInfo};
        temp_tool[event.target.name] = event.target.value;
        this.setState({tempToolInfo:temp_tool})
    }

    handleFileUpload = (e) => {
        debugger
        console.log("The file to be uploaded is: ", this.fileInput.current.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        uploadData.append("tool-img", this.fileInput.current.files[0]);
        // uploadData.append("user-id", getUser()._id); for later work on uploading images to each user's folder
        
        UploadToolImg(uploadData)
        .then(response => {
            if (response.status === 200) {
                console.log('response is: ', response);
                let temp_Tool = {...this.state.tempToolInfo};
                temp_Tool.images.push(response.data);
                this.setState({ tempToolInfo:temp_Tool });
            } else {
                let errorMessage = response.message.message + "File name should not include any special characters (!@#$%^&*)"
                this.setState({error:response.message.message})
            }
            
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }  

    handleCatL0Select (e) {
        debugger
        let selected_cat0 = e.target.value;
        let selected_cat1 = "";
        let selected_cat2 = "";
        let temp_tool = {...this.state.tempToolInfo};
        var temp_cat1_list = [...this.state.catL1List] 
        var temp_cat2_list = [];
        if (selected_cat0!=="Choose a category ...") {
            temp_cat1_list = getCatL1List(selected_cat0); 
            temp_cat1_list.unshift("Choose a category ...")          
            if (temp_tool.category.length>0 ){
                temp_tool.category.splice(0,1,selected_cat0);
                temp_tool.category = temp_tool.category.slice(0,1);
            }else{
                temp_tool.category.push(selected_cat0);
            }
        } else {
            temp_cat1_list = [];
            temp_cat2_list = []
            selected_cat0 = "";
            temp_tool.category = [];
        }       
        this.setState({
            catL1List:temp_cat1_list, 
            catL2List:temp_cat2_list,
            selectedCatL0: selected_cat0, 
            selectedCatL1: selected_cat1,
            selectedCatL2: selected_cat2,
            tempToolInfo:temp_tool
        })
    }

    handleCatL1Select (e) {
        debugger
        let selected_cat1 = e.target.value;
        let temp_tool = {...this.state.tempToolInfo};
        let selected_cat2 = "";
        var selected_tree;
        var temp_cat2_list = [];
        if (selected_cat1 !== "Choose a category ...") {
            selected_tree = [this.state.selectedCatL0, selected_cat1];
            temp_cat2_list = getCatL2List(selected_tree);
            if (temp_cat2_list.length > 0) {
                temp_cat2_list.unshift("Choose a category ...");
            }            
            if (temp_tool.category.length>1 ){
                temp_tool.category.splice(1,1,selected_cat1)
                temp_tool.category = temp_tool.category.slice(0,2);
            }else{
                temp_tool.category.push(selected_cat1)
            }
        } else {
            temp_cat2_list = [];
            selected_cat1 = "";
            if (temp_tool.category.length>1 ){
                temp_tool.category = temp_tool.category.slice(0,1);
            }   
        }       
        this.setState({
            catL2List:temp_cat2_list, 
            selectedCatL1: selected_cat1,
            selectedCatL2: selected_cat2, 
            tempToolInfo:temp_tool
        })
    }

    handleCatL2Select (e) {
        debugger
        let selected_cat2 = e.target.value;
        let temp_tool = {...this.state.tempToolInfo};
        if (selected_cat2 !== "Choose a category ...") {
            if (temp_tool.category.length>2 ){
                temp_tool.category.splice(2,1,selected_cat2)
            }else{
                temp_tool.category.push(selected_cat2)
            }
        } else {
            selected_cat2 = "";
            if (temp_tool.category.length>2 ){
                temp_tool.category = temp_tool.category.slice(0,2);
            }
        }
        
        this.setState({selectedCatL2: selected_cat2, tempToolInfo:temp_tool})
    }

    resetForm (e) {
        debugger
        let Temp_Tool_Info = {...this.state.tempToolInfo}
        Temp_Tool_Info.name = "";
        Temp_Tool_Info.brand = "";
        Temp_Tool_Info.modelNo = "";
        Temp_Tool_Info.category = [];
        Temp_Tool_Info.description = "";
        Temp_Tool_Info.images = [];


        this.setState({
            tempToolInfo:Temp_Tool_Info,
            catL0List:[],
            selectedCatL0: "",
            catL1List:[],
            selectedCatL1: "",
            catL2List:[],
            selectedCatL2: ""
        })
    }

    cancelForm (e) {
        this.props.history.push({
            pathname:`/tool/shed`
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        debugger
        
        createNewTool(this.state.tempToolInfo)
        .then(res => {           
            console.log('added: ', res);
            // let newToolId = res.data._id
            this.props.history.push({
                pathname:`/tool/shed`
            })
        })
        .catch(err => {
            console.log("Error while adding the thing: ", err);
        });
    }

    componentDidMount () {
        debugger
        let temp_cat0_list = getCatL0List();
        temp_cat0_list.unshift("Choose a category ...")
        let current_user = getUser()
        let user_long = current_user.location.coordinates[0]
        let user_latt = current_user.location.coordinates[1]
        let temp_tool = {...this.state.tempToolInfo}
        temp_tool.locationLong = user_long
        temp_tool.locationLatt = user_latt
        this.setState({catL0List:temp_cat0_list,tempToolInfo:temp_tool})
    }

    render() {
        return (
            <DefaultLayout>
                <div>
                <Container className="add-tool-frame" fluid>
                    <Row>
                        <Col>
                        <h1 className="title page-title">Add Tool<span></span></h1>
                        </Col>
                    </Row>
                    <Form className= "add-tool-form" onSubmit={this.handleFormSubmit}>
                        <Row>
                            <Col sm="5" md="6">
                                <Form.Group controlId="FormGridName">
                                    <Form.Label className="form-field-label">Name:</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="name" 
                                        autoComplete="New-name"
                                        value={this.state.tempToolInfo.name}
                                        onChange={this.handleInputChange} 
                                    />
                                </Form.Group>
                                <Form.Group controlId="FormGridBrand">
                                    <Form.Label className="form-field-label">Brand:</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="brand" 
                                        autoComplete="New-brand"
                                        value={this.state.tempToolInfo.brand}
                                        onChange={this.handleInputChange} 
                                    />
                                </Form.Group>
                                <Form.Group controlId="FormGridModelNo">
                                    <Form.Label className="form-field-label">Model No.:</Form.Label>
                                    <Form.Control                                        
                                        type="text"
                                        name="modelNo" 
                                        autoComplete="New-modelNo"
                                        value={this.state.tempToolInfo.modelNo}
                                        onChange={this.handleInputChange} 
                                    />
                                </Form.Group>
                                <Form.Group controlId="addToolForm.ControlSelectL0">
                                    <Form.Label className="form-field-label">Main Category:</Form.Label>
                                    <Form.Control as="select"
                                        name="category" 
                                        placeholder="Choose a category ..." 
                                        value={this.state.selectedCatL0}
                                        onChange={this.handleCatL0Select}
                                    >
                                        {this.state.catL0List.map((catName)=>{
                                                return (
                                                    <option key={catName} value={catName}>
                                                        {catName}
                                                    </option>
                                                )
                                            })}    
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="addToolForm.ControlSelectL1">
                                    <Form.Label className="form-field-label">Subcategory 1:</Form.Label>
                                    <Form.Control as="select"
                                        name="subcategory1" 
                                        value={this.state.selectedCatL1}
                                        onChange={this.handleCatL1Select}
                                        disabled={this.state.selectedCatL0===""}
                                    >
                                        {this.state.selectedCatL0!=="" &&
                                            this.state.catL1List.map((catName)=>{
                                                return (
                                                    <option key= {catName} value={catName}>
                                                        {catName}
                                                    </option>
                                                )
                                            })}    
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="addToolForm.ControlSelectL2">
                                    <Form.Label className="form-field-label">Subcategory 2:</Form.Label>
                                    <Form.Control as="select"
                                        name="subcategory2" 
                                        defaultValue={this.state.selectedCatL2}
                                        onChange={this.handleCatL2Select} 
                                        disabled={this.state.catL2List.length === 0}
                                    >
                                        {this.state.catL2List.length > 0 &&
                                            this.state.catL2List.map((catName)=>{
                                                return (
                                                    <option key= {catName} value={catName}>
                                                        {catName}
                                                    </option>
                                                )
                                            })}    
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col sm="7" md="6">
                                <Card style={{ width: '100%' }}>
                                    {this.state.tempToolInfo.images.length>0 
                                        ? 
                                        <Card.Img variant="top" src={ this.state.tempToolInfo.images[0].imgPath}/>
                                        :
                                        <Card.Img variant="top" src={"https://res.cloudinary.com/persia/image/upload/v1586933354/toolshare/Layout/tools-avatar_rbb7hn.jpg"}/>
                                    }
                                    <Card.Body>
                                        <Card.Title className="flex-row-center">Upload a picture</Card.Title>
                                        <Row>
                                            <Col sm="8" md="8">
                                                <Form.File 
                                                    id="custom-file"
                                                    ref={this.fileInput} 
                                                    name="tool-img"/>
                                            </Col>
                                            <Col sm="4" md="4">
                                                <Button 
                                                    variant="primary" 
                                                    className="primary-btn"
                                                    onClick={this.handleFileUpload}>
                                                        Upload
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className="error-message">{this.state.error}</p>
                                            </Col>
                                        </Row>
                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="addToolForm.ControlDescription">
                                    <Form.Label className="form-field-label">Description:</Form.Label>
                                    <Form.Control as="textarea" rows="3"
                                        name="description"
                                        placeholder="Give it a brief description"
                                        value={this.state.tempToolInfo.description}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                            </Col>                           
                        </Row>
                        <Row>
                            <Col sm="9" md="10">
                                <Button 
                                    className="primary-btn" 
                                    variant="primary" 
                                    type="submit">
                                        Add
                                </Button>            
                                <Button 
                                    className="back-btn" 
                                    variant="secondary" 
                                    onClick={this.resetForm}>
                                        Reset
                                </Button>
                            </Col>
                            <Col sm="9" md="2">
                               <Button 
                                    className="back-btn" 
                                    variant="secondary">
                                        <Link to="/tool/shed">Cancel</Link>
                                </Button> 
                            </Col>
                        </Row>
                        
                    </Form>
                </Container>
                                      
                </div>
            </DefaultLayout>
            
        )
    }
}

export default AddTool
