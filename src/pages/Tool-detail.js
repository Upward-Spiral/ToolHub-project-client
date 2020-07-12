import React, { Component } from 'react';
import DefaultLayout from "../layouts/Default";
import {Col,Button,Card,Form,Container,Row, Image} from 'react-bootstrap';
import {getToolDetails,UploadToolImg,updateToolImage,updateTool,deleteTool, reserveTool} from '../utils/toolQueries';
import {getCatL0List, getCatL1List, getCatL2List} from '../utils/service';
import {shareTool, unshareTool, lendTool, borrowTool, unborrowTool} from '../utils/toolQueries';
import { getUser } from '../utils/auth';


class toolDetail extends Component {
    constructor(props) {
        super(props)

        this.loadToolDetails             = this.loadToolDetails.bind(this)
        this.handleInputChange           = this.handleInputChange.bind(this);
        this.handleFormSubmit            = this.handleFormSubmit.bind(this);
        this.handleFileUpload            = this.handleFileUpload.bind(this);
        this.handleCatL0Select           = this.handleCatL0Select.bind(this);
        this.handleCatL1Select           = this.handleCatL1Select.bind(this);
        this.handleCatL2Select           = this.handleCatL2Select.bind(this);
        this.handleDeleteButton          = this.handleDeleteButton.bind(this);
        this.handleShareButton           = this.handleShareButton.bind(this);
        this.handleImageSelect           = this.handleImageSelect.bind(this);
        this.showNextImage               = this.showNextImage.bind(this);
        this.showPreviousImage           = this.showPreviousImage.bind(this);
        this.handleUnshareButton         = this.handleUnshareButton.bind(this);
        this.handleBorrowButton         = this.handleBorrowButton.bind(this);
        this.handleWithdrawBorrowButton = this.handleWithdrawBorrowButton.bind(this);
        this.handleReserveButton         = this.handleReserveButton.bind(this);

        this.state = {
            
            response: 0 ,
            catL0List:[],
            selectedCatL0: "",
            catL1List:[],
            selectedCatL1: "",
            catL2List:[],
            selectedCatL2: "",
            showedImageIx: null,
            ToolInfo: {
                name: "",
                brand: "",
                modelNo: "",
                category:[],
                description: "",
                images: [],
                shared:false,
                requested_by:[],
                reserved_by: [],
                lended_to: {},
                available: true,
                id:"",
                ownerId:""
                
            }, 
            readOnly: false,
            alreadyRequestedByMe: false,
            alreadyReservedByMe: false,
            error:null ,
            tempCatText: "No subcategory",
            tempImgFile: null   
        }
    }
    
    handleInputChange (event) {
        debugger
        let temp_tool = {...this.state.ToolInfo};
        temp_tool[event.target.name] = event.target.value;
        this.setState({ToolInfo:temp_tool})
    }

    handleImageSelect (e) {
        debugger
        let image = e.target.files[0]
        this.setState({tempImgFile: image})
    }

    showNextImage (e) {
        let Ix = this.state.showedImageIx
        if (Ix < this.state.ToolInfo.images.length-1) {
            this.setState({showedImageIx: Ix+1})
        }
    }

    showPreviousImage (e) {
        let Ix = this.state.showedImageIx
        if (Ix > 0) {
            this.setState({showedImageIx: Ix-1})
        }
    }

    handleFileUpload = (e) => {
        debugger
        console.log("The file to be uploaded is: ", this.state.tempImgFile);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append("tool-img", this.state.tempImgFile);
        
        UploadToolImg(uploadData)
        .then(response => {
            console.log('response is: ', response);
            let newToolImg = {newImg:response,toolId:this.state.ToolInfo.id}
            updateToolImage(newToolImg)
                .then((res)=>{
                    console.log(res)
                    let temp_Tool = {...this.state.ToolInfo};
                    let tempIx = this.state.showedImageIx
                    temp_Tool.images.push(response);
                    this.setState({ ToolInfo:temp_Tool, showedImageIx:tempIx+1});
                })
            
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }
    
    handleCatL0Select (e) {
        debugger
        let selected_cat0 = e.target.value
        let temp_cat_list = getCatL1List(selected_cat0);
        let temp_tool = {...this.state.ToolInfo};
        if (temp_tool.category.length>0 ){
            temp_tool.category.splice(0,1,selected_cat0)
        }else{
            temp_tool.category.push(selected_cat0)
        }
        
        this.setState({catL1List:temp_cat_list, selectedCatL0: selected_cat0, ToolInfo:temp_tool})
    }

    handleCatL1Select (e) {
        debugger
        let selected_cat1 = e.target.value;
        let selected_tree = [this.state.selectedCatL0, selected_cat1]
        let temp_cat_list = getCatL2List(selected_tree);
        let temp_tool = {...this.state.ToolInfo};
        if (temp_tool.category.length>1 ){
            temp_tool.category.splice(1,1,selected_cat1)
        }else{
            temp_tool.category.push(selected_cat1)
        }
        this.setState({catL2List:temp_cat_list, selectedCatL1: selected_cat1, ToolInfo:temp_tool})
    }

    handleCatL2Select (e) {
        debugger
        let selected_cat2 = e.target.value;
        let temp_tool = {...this.state.ToolInfo};
        if (temp_tool.category.length>2 ){
            temp_tool.category.splice(2,1,selected_cat2)
        }else{
            temp_tool.category.push(selected_cat2)
        }
        this.setState({selectedCatL2: selected_cat2, ToolInfo:temp_tool})
    }

    handleDeleteButton(e) {
        let tempToolId = e.target.name
        deleteTool(tempToolId)
            .then((response)=>{
                this.props.history.push({
                    pathname:`/tool/shed`
                })
            })
    }

    handleShareButton (e) {
        debugger
        shareTool(e.target.name)
            .then((response)=>{ 
                console.log(response);
                this.loadToolDetails(response);

            })
            .catch ((err) => {
                console.log(err);
            })       
    }

    handleUnshareButton (e) {
        debugger
        unshareTool(e.target.name)
            .then((response)=>{ 
                console.log(response);
                this.loadToolDetails(response);

            })
            .catch ((err) => {
                console.log(err);
            })  
    }

    handleBorrowButton (e) {
        debugger
        borrowTool(this.state.ToolInfo.id)
            .then((response)=>{
                console.log(response);
                this.loadToolDetails(response);
            })
            .catch ((err) => {
                console.log(err);
            }) 
    }

    handleWithdrawBorrowButton (e) {
        debugger
        unborrowTool(this.state.ToolInfo.id)
            .then((response)=>{
                console.log(response);
                this.loadToolDetails(response);
            })
            .catch ((err) => {
                console.log(err);
            }) 
    }

    handleReserveButton (e) {
        debugger
        reserveTool(this.state.ToolInfo.id)
            .then((response)=>{
                console.log(response);
                this.loadToolDetails(response);
            })
            .catch ((err) => {
                console.log(err);
            }) 
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        debugger
        // let toolID = window.localStorage.getItem("visitedToolId")
        let toolID = this.props.location.state.toolId
        let {name,brand,modelNo,description,category}  = this.state.ToolInfo
        let temp_tool = {name,brand,modelNo,description,category}
        temp_tool.id = toolID

        updateTool(temp_tool)
            .then((response)=>{
                this.loadToolDetails(response)
            })
        
    } 

    loadToolDetails (toolDetails) {
        debugger
        let visitor = getUser();
        let read_only = false;
        let temp_cat0_list = getCatL0List();        
        let temp_tool = {}
        temp_tool.name           = toolDetails.name
        temp_tool.brand          = toolDetails.brand
        temp_tool.category       = toolDetails.category
        temp_tool.description    = toolDetails.description
        temp_tool.images         = toolDetails.images
        temp_tool.modelNo        = toolDetails.modelNo
        temp_tool.owner          = toolDetails.owner
        temp_tool.id             = toolDetails._id
        temp_tool.requested_by   = toolDetails.requested_by
        temp_tool.reserved_by    = toolDetails.reserved_by
        temp_tool.shared         = toolDetails.shared
        temp_tool.lended_to      = toolDetails.lended_to
        temp_tool.available      = toolDetails.available

        if (visitor._id !== temp_tool.owner._id) {
            read_only = true;
        }
        if (temp_tool.requested_by.indexOf(visitor._id)) {
            this.setState({alreadyRequestedByMe:true});
        }
        if (temp_tool.reserved_by.indexOf(visitor._id)) {
            this.setState({alreadyReservedByMe:true})
        }
        let temp_cat0,temp_cat1, temp_cat2,temp_showedImgIx,temp_cat2_list
            temp_cat0 = temp_tool.category[0]
        if (temp_tool.category[1]) {
            temp_cat1 = temp_tool.category[1]
            temp_cat2_list = getCatL2List([temp_cat0,temp_cat1]);
        } else {
            temp_cat1 = ""
        }

        if (temp_tool.category[2]) {
            temp_cat2 = temp_tool.category[2]
        } else {
            temp_cat2 = ""
        }
        let temp_cat1_list = getCatL1List(temp_cat0);
        let numberOfImages = temp_tool.images.length
        if (numberOfImages > 0) {
            temp_showedImgIx = numberOfImages-1
        }
        
        this.setState({ ToolInfo: temp_tool,
                        catL0List: temp_cat0_list,
                        selectedCatL0: temp_cat0,
                        selectedCatL1: temp_cat1,
                        selectedCatL2: temp_cat2,
                        showedImageIx: temp_showedImgIx,
                        catL1List: temp_cat1_list,
                        catL2List: temp_cat2_list,
                        readOnly:read_only
                    })
    }

    componentDidMount () {
        debugger
        // let current_user = getUser()
        let toolID = this.props.location.state.toolId
        getToolDetails(toolID)
        .then((response)=>{
            this.loadToolDetails(response.toolData)
        })
    }

    render() {
        return (
            <DefaultLayout>
                <div >                  
                    <Container className= "add-form update-form">
                        <Row>
                            <Col>
                            <h1 className="title page-title">Tool Detail<span></span></h1>
                            </Col>
                        </Row>
                        <Form className="update-tool-detail-form" onSubmit={this.handleFormSubmit}>                
                            <Row>
                                <Col sm="5" md="6">
                                    <Form.Group className= "tool-detail-form-1" controlId="tool-detail-name">
                                        <Form.Label className="form-field-label">Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="name" 
                                            readOnly = {this.state.readOnly}
                                            value={this.state.ToolInfo.name} 
                                            onChange={this.handleInputChange}/>
                                    </Form.Group>
                                    <Form.Group className= "tool-detail-form-1" controlId="tool-detail-brand">
                                        <Form.Label className="form-field-label">Brand</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="brand" 
                                            readOnly = {this.state.readOnly}
                                            value={this.state.ToolInfo.brand} 
                                            onChange={this.handleInputChange}/>
                                    </Form.Group>
                                    <Form.Group className= "tool-detail-form-1" controlId="tool-detail-model">
                                        <Form.Label className="form-field-label">Model No.:</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="modelNo" 
                                            readOnly = {this.state.readOnly}
                                            value={this.state.ToolInfo.modelNo} 
                                            onChange={this.handleInputChange}/>
                                    </Form.Group>
                                    <Form.Group className="tool-detail-form-1" controlId="tool-detail-cat0">
                                        <Form.Label className="form-field-label">Main Category:</Form.Label>
                                        <Form.Control as="select"
                                            name="category" 
                                            readOnly = {this.state.readOnly}
                                            value={this.state.selectedCatL0}
                                            onChange={this.handleCatL0Select}>

                                            {this.state.catL0List.map((catName)=>{
                                                return (
                                                    <option key={catName} value={catName}>
                                                        {catName}
                                                    </option>
                                                )
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="tool-detail-form-1" controlId="tool-detail-subcat1">
                                        <Form.Label className="form-field-label">First subcategory:</Form.Label>
                                        <Form.Control as="select"
                                            name="subcategory1"
                                            readOnly = {this.state.readOnly} 
                                            value={this.state.selectedCatL1==="" 
                                                    ? 
                                                    this.state.tempCatText 
                                                    : 
                                                    this.state.selectedCatL1 
                                                }
                                            onChange={this.handleCatL1Select}>
                                                
                                            {this.state.catL1List.map((catName)=>{
                                                return (
                                                    <option key= {catName} value={catName}>
                                                        {catName}
                                                    </option>
                                                )
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="tool-detail-form-1" controlId="tool-detail-subcat2">
                                        <Form.Label className="form-field-label">Second subcategory:</Form.Label>
                                        <Form.Control as="select"
                                            name="subcategory2" 
                                            readOnly = {this.state.readOnly}
                                            value={this.state.selectedCatL2==="" && this.state.tempCatText }
                                            onChange={this.handleCatL2Select} 
                                            disabled={this.state.catL2List===[]}>

                                            {this.state.catL2List!==[] &&
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
                                    <Card >
                                        <Card.Img 
                                            variant="top" 
                                            id="tool-detail-img" 
                                            src={this.state.showedImageIx !== null
                                                ?
                                                this.state.ToolInfo.images[this.state.showedImageIx].imgPath
                                                : 
                                                "https://res.cloudinary.com/persia/image/upload/v1586933354/toolshare/Layout/tools-avatar_rbb7hn.jpg"} 
                                        />
                                        <Card.Body> 
                                            <Row>
                                                <Col className="flex-row-center">
                                                    <Button className="image-nav"
                                                            disabled={this.state.showedImageIx >= this.state.ToolInfo.images.length-1}
                                                            onClick={this.showNextImage}
                                                    >
                                                        <Image src="https://res.cloudinary.com/persia/image/upload/v1591398282/toolshare/Layout/left-arrow_dpm7hk.png" roundedCircle className="image-navigation" alt="previous image"/>
                                                    </Button>
                                                    
                                                </Col>
                                                <Col sm="2" lg="2">
                                            <p><span>{this.state.ToolInfo.images.length-this.state.showedImageIx}</span>/<span>{this.state.ToolInfo.images.length}</span></p>
                                                </Col>
                                                <Col className="flex-row-center">
                                                    <Button className="image-nav"
                                                            disabled={this.state.showedImageIx <= 0}
                                                            onClick={this.showPreviousImage}
                                                    >
                                                        <Image src="https://res.cloudinary.com/persia/image/upload/v1591398282/toolshare/Layout/right-arrow_fvsw7s.png" roundedCircle className="image-navigation"
                                                        alt="next image" />
                                                    </Button>
                                                    
                                                </Col>
                                            </Row>
                                            
                                            {!this.state.readOnly && 
                                                <>
                                                    <Card.Title className="flex-row-center">Upload a picture</Card.Title>
                                                    <Row>
                                                        <Col sm="8" md="8">
                                                        <Form.File 
                                                                id="custom-file" 
                                                                name="tool-img"
                                                                onChange={this.handleImageSelect}
                                                            />  
                                                        </Col>
                                                        <Col sm="4" md="4">
                                                            <Button 
                                                                variant="primary" 
                                                                className="primary-btn"
                                                                disabled={this.state.tempImgFile === null}
                                                                onClick={this.handleFileUpload}>
                                                                    Upload
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </>
                                                
                                            }
                                                         
                                        </Card.Body>
                                    </Card>
                                </Col>                              
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="updateToolForm.ControlTextarea1">
                                        <Form.Label className="form-field-label">Description:</Form.Label>
                                        <Form.Control as="textarea" rows="3"
                                            className="textarea" 
                                            name="description"
                                            readOnly = {this.state.readOnly}
                                            placeholder="Give it a brief description"
                                            value={this.state.ToolInfo.description}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                </Col> 
                            </Row>
                            <Row>
                                {this.state.readOnly 
                                    ?
                                    <Col>
                                        {this.state.ToolInfo.available 
                                        ?
                                        <>
                                            {!this.state.alreadyRequestedByMe 
                                                ?
                                                <Button 
                                                    className="primary-btn"
                                                    name={this.state.ToolInfo.id} 
                                                    onClick={this.handleBorrowButton}>
                                                        Request
                                                </Button>
                                                :
                                                <Button 
                                                    className="primary-btn"
                                                    name={this.state.ToolInfo.id} 
                                                    onClick={this.handleWithdrawBorrowButton}>
                                                        Withdraw My Request
                                                </Button>
                                            }
                                        </>    
                                        :
                                        <>
                                            {!this.state.alreadyReservedByMe
                                            ?
                                            <Button 
                                                className="primary-btn"
                                                name={this.state.ToolInfo.id} 
                                                onClick={this.handleReserveButton}>
                                                    Reserve
                                            </Button>
                                            :
                                            <Button 
                                                className="primary-btn"
                                                name={this.state.ToolInfo.id} 
                                                onClick={this.handleWithdrawReserveButton}>
                                                    Withdraw My Reserve
                                            </Button>
                                            }
                                        </>
                                        
                                        }
                                    </Col>
                                    :
                                    <>
                                        <Col sm="9" md="10">
                                            <Button 
                                                className="primary-btn"
                                                name={this.state.ToolInfo.id} 
                                                type="submit">
                                                    Update
                                            </Button>
                                            <Button 
                                                className="delete-btn" 
                                                name= {this.state.ToolInfo.id}
                                                onClick={this.handleDeleteButton}>
                                                    Delete
                                            </Button>
                                        </Col> 
                                        <Col sm="3" md="2" lg="2">
                                            {(!this.state.ToolInfo.shared 
                                                // && !this.state.ToolInfo.lended_to
                                                // && this.state.ToolInfo.reserved_by.length === 0
                                                &&
                                                <Button 
                                                    className="secondary-btn info-btn" 
                                                    name= {this.state.ToolInfo.id}
                                                    onClick={this.handleShareButton}>
                                                        Offer
                                                </Button>
                                            )
                                            ||
                                                <Button 
                                                    className="secondary-btn info-btn" 
                                                    name= {this.state.ToolInfo.id}
                                                    onClick={this.handleUnshareButton}>
                                                        Shelf
                                                </Button>
                                            }  
                                        </Col>
                                    </>                            
                                }    
                            </Row>                                
                        </Form>                      
                    </Container>                               
                </div>
            </DefaultLayout>

        )
    }
}

export default toolDetail
