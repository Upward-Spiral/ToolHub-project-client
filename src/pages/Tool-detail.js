import React, { Component } from 'react';
import DefaultLayout from "../layouts/Default";
import {Container,Row,Col,Media,Button,Card,Form} from 'react-bootstrap';
import {getToolDetails,UploadToolImg} from '../utils/toolQueries';
import {getCatL0List, getCatL1List, getCatL2List} from '../utils/service';
import {getUser} from '../utils/auth';

class toolDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            response: 0 ,
            catL0List:[],
            selectedCatL0: "",
            catL1List:[],
            selectedCatL1: "",
            catL2List:[],
            selectedCatL2: "",
            showedImage: "",
            ToolInfo: {
                name: "",
                brand: "",
                modelNo: "",
                category:[],
                description: "",
                images: []
                
            }, 
            error:null ,
            tempCatText: "No subcategory"   
        }
    }
    
    handleInputChange (event) {
        // debugger
        let temp_tool = {...this.state.tempToolInfo};
        temp_tool[event.target.name] = event.target.value;
        this.setState({tempToolInfo:temp_tool})
    }

    handleFileUpload = (e) => {
        // debugger
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append("tool-img", e.target.files[0]);
        
        UploadToolImg(uploadData)
        .then(response => {
            console.log('response is: ', response);
            // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
            let temp_Tool = {...this.state.tempToolInfo};
            temp_Tool.images.push(response);
            this.setState({ tempToolInfo:temp_Tool });
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        debugger
        
        // createNewTool(this.state.tempToolInfo)
        // .then(res => {
        //     if (res.status===200){
        //         console.log('added: ', res);
        //         // let newToolId = res.data._id
        //         this.props.history.push({
        //             pathname:`/tool/shed`
        //         })
        //     }
        // })
        // .catch(err => {
        //     console.log("Error while adding the thing: ", err);
        // });
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

    componentDidMount () {
        debugger
        let temp_cat0_list = getCatL0List();
        let current_user = getUser()
        
        let toolID = window.localStorage.getItem("visitedToolId")
        getToolDetails(toolID)
        .then((response)=>{
            let{name,brand,modelNo,description,category,images}  = response
            let temp_tool = {name,brand,modelNo,description,category,images} 
            
            let temp_cat0,temp_cat1, temp_cat2,temp_showedImg,temp_cat2_list
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
            
            temp_showedImg = temp_tool.images[0].imgPath
            this.setState({ ToolInfo: temp_tool,
                            catL0List: temp_cat0_list,
                            selectedCatL0: temp_cat0,
                            selectedCatL1: temp_cat1,
                            selectedCatL2: temp_cat2,
                            showedImage: temp_showedImg,
                            catL1List: temp_cat1_list,
                            catL2List: temp_cat2_list
                        })

        })
    }

    render() {
        return (
            <DefaultLayout>
                <h1>tool detail page</h1>

                <div className= "add-form update-form">                  
                    <form onSubmit={this.handleFormSubmit}>

                        



                        <Form onSubmit={this.handleFormSubmit} className="update-tool-detail-form">
                            
                            <Form.Row>
                            <Col>
                                <Card style={{ width: '26rem' }} className="tool-detail-form-1">
                                    <Card.Img variant="top" id="tool-detail-img" src={this.state.showedImage} />
                                    <Card.Body>                                
                                        <Card.Text>
                                        upload picture
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                                </Col>
                                <Col>
                                <Form.Group className= "tool-detail-form-1" controlId="tool-detail-name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="name" 
                                        value={this.state.ToolInfo.name} 
                                        onChange={this.handleInputChange}/>
                                </Form.Group>
                                <Form.Group className= "tool-detail-form-1" controlId="tool-detail-brand">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="brand" 
                                        value={this.state.ToolInfo.brand} 
                                        onChange={this.handleInputChange}/>
                                </Form.Group>
                                <Form.Group className= "tool-detail-form-1" controlId="tool-detail-model">
                                    <Form.Label>Model No.:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="modelNo" 
                                        value={this.state.ToolInfo.modelNo} 
                                        onChange={this.handleInputChange}/>
                                </Form.Group>
                                <Form.Group className="tool-detail-form-1" controlId="tool-detail-cat0">
                                    <Form.Label>Main Category:</Form.Label>
                                    <Form.Control as="select"
                                        name="category" 
                                        id="category-select" 
                                        value={this.state.selectedCatL0}
                                        onChange={this.handleCatL0Select}
                                    >
                                    {this.state.catL0List.map((catName)=>{
                                                return (
                                                    <option
                                                        key={catName} 
                                                        value={catName} 
                                                        
                                                        >{catName}
                                                    </option>
                                                )
                                            })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="tool-detail-form-1" controlId="tool-detail-subcat1">
                                    <Form.Label>First subcategory:</Form.Label>
                                    <Form.Control as="select"
                                        name="subcategory1" 
                                        id="subcategory1-select" 
                                        value={this.state.selectedCatL1==="" ? this.state.tempCatText : this.state.selectedCatL1 }
                                        onChange={this.handleCatL1Select}
                                    >
                                    {
                                            this.state.catL1List.map((catName)=>{
                                                return (
                                                    <option 
                                                        key= {catName}
                                                        value={catName}  
                                                        >
                                                            {catName}
                                                    </option>
                                                )
                                            })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="tool-detail-form-1" controlId="tool-detail-subcat2">
                                    <Form.Label>Second subcategory:</Form.Label>
                                    <Form.Control as="select"
                                        name="subcategory2" 
                                        id="subcategory2-select"
                                        value={this.state.selectedCatL2==="" && this.state.tempCatText }
                                        onChange={this.handleCatL2Select} 
                                        disabled={/* this.state.selectedCatL1==="" &&  */this.state.catL2List===[]}
                                    >
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
                            </Form.Row>
                            <Form.Row>
    
                            </Form.Row>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control as="textarea" rows="3"
                                    className="textarea" 
                                    name="description"
                                    placeholder="Give it a brief description"
                                    value={this.state.ToolInfo.description}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>

                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular">
                                <Form.File.Label>Choose image:</Form.File.Label>
                                <Form.File.Input 
                                    type="file" 
                                    name="tool-img" 
                                    onChange={this.handleFileUpload}
                                />
                                </Form.File>
                            </div>
                            
                        </Form>

                        <input className="button is-link" type="submit" value="Add" />
                    </form>
                        
                </div>
            </DefaultLayout>

        )
    }
}

export default toolDetail
