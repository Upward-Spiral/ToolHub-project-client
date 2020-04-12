import React, { Component } from 'react';
import DefaultLayout from "../layouts/Default";
import {UploadToolImg,createNewTool} from '../utils/toolQueries';
import {getCatL0List, getCatL1List, getCatL2List} from '../utils/service'

class AddTool extends Component {
    constructor(props) {
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleCatL0Select = this.handleCatL0Select.bind(this);
        this.handleCatL1Select = this.handleCatL1Select.bind(this);
        this.handleCatL2Select = this.handleCatL2Select.bind(this);

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
                images: []

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
        
        createNewTool(this.state.tempToolInfo)
        .then(res => {
            if (res.status===200){
                console.log('added: ', res);
                // let newToolId = res.data._id
                this.props.history.push({
                    pathname:`/tool/shed`
                })
            }
        })
        .catch(err => {
            console.log("Error while adding the thing: ", err);
        });
    }  

    handleCatL0Select (e) {
        debugger
        let selected_cat0 = e.target.value
        let temp_cat_list = getCatL1List(selected_cat0);
        let temp_tool = {...this.state.tempToolInfo};
        if (temp_tool.category.length>0 ){
            temp_tool.category.splice(0,1,selected_cat0)
        }else{
            temp_tool.category.push(selected_cat0)
        }
        
        this.setState({catL1List:temp_cat_list, selectedCatL0: selected_cat0, tempToolInfo:temp_tool})
    }

    handleCatL1Select (e) {
        debugger
        let selected_cat1 = e.target.value;
        let selected_tree = [this.state.selectedCatL0, selected_cat1]
        let temp_cat_list = getCatL2List(selected_tree);
        let temp_tool = {...this.state.tempToolInfo};
        if (temp_tool.category.length>1 ){
            temp_tool.category.splice(1,1,selected_cat1)
        }else{
            temp_tool.category.push(selected_cat1)
        }
        this.setState({catL2List:temp_cat_list, selectedCatL1: selected_cat1, tempToolInfo:temp_tool})
    }

    handleCatL2Select (e) {
        debugger
        let selected_cat2 = e.target.value;
        let temp_tool = {...this.state.tempToolInfo};
        if (temp_tool.category.length>2 ){
            temp_tool.category.splice(2,1,selected_cat2)
        }else{
            temp_tool.category.push(selected_cat2)
        }
        this.setState({selectedCatL2: selected_cat2, tempToolInfo:temp_tool})
    }

    componentDidMount () {
        debugger
        let temp_cat0_list = getCatL0List();
        this.setState({catL0List:temp_cat0_list})
    }

    render() {
        return (
            <DefaultLayout>
                <div className= "add-form">                  
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="field">
                            <label className="label">Name:</label>
                            <div className="control">
                                <input
                                    className="input" 
                                    type="text" 
                                    name="name" 
                                    value={this.state.tempToolInfo.name} 
                                    onChange={this.handleInputChange}/>   {/* the handler gets the event object by default */}
                            </div>
                        </div>                      
                        
                        <div className="field">
                            <label className="label">Brand:</label>
                            <div className="control">
                                <input
                                    className="input" 
                                    type="text" 
                                    name="brand" 
                                    value={this.state.tempToolInfo.brand} 
                                    onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        
                        <div className="field">
                            <label className="label">Model No.:</label>
                            <div className="control">
                                <input
                                    className="input" 
                                    type="text" 
                                    name="modelNo" 
                                    value={this.state.tempToolInfo.modelNo} 
                                    onChange={this.handleInputChange}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Main Category:</label>
                            <div className="control">
                                <select 
                                    className="select" 
                                    name="category" 
                                    id="category-select" 
                                    defaultValue={this.state.selectedCatL0}
                                    onChange={this.handleCatL0Select}>
                                        {this.state.catL0List.map((catName)=>{
                                            return (
                                                <option
                                                    key={catName} 
                                                    value={catName} 
                                                    // selected={catName===this.state.selectedCatL0} 
                                                    >{catName}
                                                </option>
                                            )
                                        })}
                                </select>                                    
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">First subcategory:</label>
                            <div className="control">
                                <select 
                                    className="select" 
                                    name="subcategory1" 
                                    id="subcategory1-select" 
                                    defaultValue={this.state.selectedCatL1}
                                    onChange={this.handleCatL1Select}
                                    disabled={this.state.selectedCatL0===""}>
                                        {this.state.selectedCatL0!=="" &&
                                        this.state.catL1List.map((catName)=>{
                                            return (
                                                <option 
                                                    key= {catName}
                                                    value={catName} 
                                                    // selected={catName===this.state.selectedCatL1} 
                                                    >
                                                        {catName}
                                                </option>
                                            )
                                        })}
                                </select>    
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Second subcategory:</label>
                            <div className="control">
                                <select 
                                    className="select" 
                                    name="subcategory2" 
                                    id="subcategory2-select"
                                    defaultValue={this.state.selectedCatL2}
                                    onChange={this.handleCatL2Select} 
                                    disabled={/* this.state.selectedCatL1==="" &&  */this.state.catL2List===[]}>
                                        {this.state.catL2List!==[] &&
                                        this.state.catL2List.map((catName)=>{
                                            return (
                                                <option
                                                    key= {catName}
                                                    value={catName} 
                                                    // selected={catName===this.state.selectedCatL2} 
                                                    >
                                                        {catName}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Description:</label>
                            <div className="control">
                            <textarea 
                                className="textarea" 
                                name="description"
                                placeholder="Give it a brief description"
                                value={this.state.tempToolInfo.description}
                                onChange={this.handleInputChange}
                                ></textarea>
                                {/* <input
                                    className="input" 
                                    type="textarea" 
                                    name="description" 
                                    value={this.state.tempToolInfo.description} 
                                    onChange={this.handleInputChange}/> */}
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Choose image:</label>
                            <div className="control">
                                <input
                                    className="input" 
                                    type="file" 
                                    name="tool-img" 
                                    onChange={this.handleFileUpload}/>
                            </div>
                        </div>

                    

                        <input className="button is-link" type="submit" value="Add" />
                    </form>
                        
                </div>
            </DefaultLayout>
            
        )
    }
}

export default AddTool
