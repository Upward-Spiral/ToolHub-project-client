import React, { Component } from 'react';
import DefaultLayout from "../layouts/Default";
import {getToolList} from '../utils/toolQueries';
import {getUser} from '../utils/auth';
import {shareTool, unshareTool,lendTool} from '../utils/toolQueries';
import { Link } from 'react-router-dom';
import {Container,Row,Col,Button, Alert} from 'react-bootstrap';

class toolshed extends Component {
    constructor(props) {
        super(props)

        this.handleShareButton = this.handleShareButton.bind(this)
        this.handleUnshareButton = this.handleUnshareButton.bind(this)
        this.fetchToolList = this.fetchToolList.bind(this);
        this.handleAcceptButton = this.handleAcceptButton.bind(this)
        // this.handleDetailButton = this.handleDetailButton.bind(this)

        this.state = {
            toolList:[] ,
            showedToolList:[],  // must add filtering feature later  
            shareUpdated: 0
        }
        

    }

    // handleDetailButton (e) {
    //     window.localStorage.setItem("visitedToolId", e.target.name);
    //     this.props.history.push({
    //         pathname:'/tool/detail'
    //     })
    // }

    handleShareButton (e) {
        debugger
        shareTool(e.target.name)
            .then((response)=>{ 
                this.fetchToolList()     
            })
            .catch ((err) => {
                console.log(err)
            })       
    }

    handleUnshareButton (e) {
        debugger
        unshareTool(e.target.name)
            .then((response)=>{
                this.fetchToolList()     
            })
            .catch ((err) => {
                console.log(err)
            })    
    }

    handleAcceptButton(e) {
        let requesterId = e.target.name
        let toolId = e.target.id
        lendTool(requesterId,toolId)
        .then((response)=>{
            this.fetchToolList()     
        })
        .catch ((err) => {
            console.log(err)
        })
    }


    fetchToolList(){
        var temp_tool_list= []
        let userId = getUser()._id
        getToolList(userId)
        .then((response)=>{
            console.log(response)
            temp_tool_list = response ;
            this.setState({toolList:temp_tool_list, showedToolList:temp_tool_list})
        })
        .catch ((err) => {
            console.log(err)
        })
    }

    componentDidMount () {
        this.fetchToolList()     
    }

    render() {
        return (
            <DefaultLayout>
                
                <section id="toolshed">
                    <Link to="/tool/add"><Button id="add-tool-btn"  variant="primary">Add a tool</Button></Link>
                    {this.state.showedToolList.length > 0 ?
                    this.state.showedToolList.map((tool)=>{
                        return (
                            <Container key={tool._id}>                                                                
                                     <Row className="item">
                                        <Col sm={2}>
                                            <img
                                                width={64}
                                                height={64}
                                                className="mr-3"
                                                src={tool.images[0] 
                                                    ?
                                                    tool.images[0].imgPath 
                                                    : 
                                                    "https://res.cloudinary.com/persia/image/upload/v1586933354/toolshare/Layout/tools-avatar_rbb7hn.jpg"}
                                                alt="Generic tool icon"
                                            />
                                        </Col>
                                        <Col className="deatil-col" sm={5}>
                                            <h4>{tool.name}</h4>
                                            <h6>{tool.brand}</h6>
                                            <p>{tool.description}</p>
                                        </Col>
                                        <Col sm={3} >
                                        {tool.requested_by.length >0 &&
                                            tool.requested_by.map((requester)=>{
                                                return (
                                                    <>
                                                <p>requested by:{requester.displayname}</p>
                                                <Button 
                                                className="primary-btn" 
                                                variant="primary"
                                                name= {requester._id}
                                                id={tool._id}
                                                onClick={this.handleAcceptButton}>
                                                    Lend
                                                </Button> 
                                                </>
                                                )
                                            })
                                        
                                        }
                                        </Col>
                                        <Col className="button-col" sm={2}> 
                                            <Row>
                                                <Col>
                                                { 
                                                !tool.lended_to 
                                                && 
                                                tool.shared  
                                                &&                               
                                                    <Button 
                                                        className="secondary-btn share-btn toolshed-unshare-btn" 
                                                        // variant="primary"
                                                        name= {tool._id}
                                                        onClick={this.handleUnshareButton}>
                                                            Shelf
                                                        </Button> 
                                                }  

                                                { tool.shared
                                                    ||
                                                    <Button 
                                                        className="secondary-btn share-btn toolshed-share-btn" 
                                                        // variant="primary"
                                                        name= {tool._id}
                                                        onClick={this.handleShareButton}>
                                                            Offer
                                                        </Button>                                                                                                              
                                                }
                                                {tool.lended_to &&
                                                    <div className="lended-to">
                                                        <h6>Lended to:</h6>

                                                        <Link 
                                                        to={{pathname:'/user/public-page',
                                                        state : { lender:tool.lended_to._id}

                                                        }}>
                                                            { tool.lended_to.displayname}
                                                        </Link>
                                                    </div>
                                                }
                                                </Col>
                                                
                                            </Row>
                                            <Row> 
                                                <Link 
                                                    to={{pathname:'/tool/detail',
                                                    state : { toolId:tool._id}

                                                }}>
                                                    <Button 
                                                    className="primary-btn  detail-btn" 
                                                    // variant="primary"
                                                    >
                                                        Detail
                                                    </Button> 
                                                </Link>
                                            </Row>   
                                        </Col>                                                     
                                    </Row>      
                                
                               
                            </Container>

                        )
                    })
                    :
                    <Alert variant="primary" className="no-data-alert">No Tools to show.</Alert>
                }
                    <Link to="/tool/add"><Button id="add-tool-btn"  variant="primary">Add a tool</Button></Link>

                </section>
            </DefaultLayout>

        )
    }
}

export default toolshed
