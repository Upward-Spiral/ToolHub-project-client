import React, { Component } from 'react';
import DefaultLayout from "../layouts/Default";
import {getToolList} from '../utils/toolQueries';
import {shareTool, unshareTool,lendTool} from '../utils/toolQueries';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {Container,Row,Col,Media,Button} from 'react-bootstrap';

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
        getToolList()
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
                    {this.state.showedToolList.length > 0 ?
                    this.state.showedToolList.map((tool)=>{
                        return (

                            <Container  key={tool._id}>
                                <Media className="toolshed-element" >
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
                                    <Media.Body>
                                        <Row>
                                            <Col sm={7}>
                                                <h4>{tool.name}</h4>
                                                <h6>{tool.brand}</h6>
                                                <p>{tool.description}</p>
                                            </Col>
                                            <Col>
                                            {tool.requested_by.length >0 &&
                                                tool.requested_by.map((requester)=>{
                                                    return (
                                                        <>
                                                    <p>requested by:{requester.displayname}</p>
                                                    <Button 
                                                    className="signup-btn" 
                                                    variant="primary"
                                                    name= {requester._id}
                                                    id={tool._id}
                                                    onClick={this.handleAcceptButton}>
                                                        Lend!
                                                    </Button> 
                                                    </>
                                                    )
                                                })
                                            
                                            }
                                            </Col>
                                            <Col sm={2}> 
                                            { tool.lended_to.length ===0 
                                                && 
                                                tool.shared  
                                                &&                               
                                                    <Button 
                                                        className="signup-btn" 
                                                        variant="primary"
                                                        name= {tool._id}
                                                        onClick={this.handleUnshareButton}>
                                                            Shelf it!
                                                        </Button> 
                                                 }  

                                                 { tool.shared
                                                    ||
                                                    <Button 
                                                        className="signup-btn" 
                                                        variant="primary"
                                                        name= {tool._id}
                                                        onClick={this.handleShareButton}>
                                                            Offer it!
                                                        </Button>
                                                       
                                                        
                                                 }
                                               
                                                
                                                <Link 
                                                    to={{pathname:'/tool/detail',
                                                    state : { toolId:tool._id}

                                                }}>
                                                    <Button 
                                                    className="login-btn" 
                                                    variant="primary"
                                                    >
                                                        Detail
                                                    </Button> 
                                                </Link>

                                                {/* <Button 
                                                    className="tool-detail-btn" 
                                                    variant="primary"
                                                    name= {tool._id}
                                                    onClick={this.handleDetailButton}>
                                                        Detail
                                                </Button> */}
                                                
                                            </Col>                                                     
                                        </Row>      
                                    </Media.Body>
                                </Media>
                            </Container>

                        )
                    })
                    :
                    <h6></h6>
                }
                    <Link to="/tool/add"><Button id="add-tool-btn"  variant="primary">Add a tool</Button></Link>

                </section>
            </DefaultLayout>

        )
    }
}

export default toolshed
