import React, { Component }                     from 'react';
import { Link }                                 from 'react-router-dom';
import { getUser}                               from '../utils/auth';
import { getToolList, getBorrowedToolList }     from '../utils/toolQueries';
import { shareTool, unshareTool,lendTool }      from '../utils/toolQueries';
import { Container,Row,Col,Button, Alert }      from 'react-bootstrap';
//import DefaultLayout                        from "../layouts/Default";

class toolshed extends Component {
    constructor(props) {
        super(props)

        this.handleShareButton      = this.handleShareButton.bind(this);
        this.handleUnshareButton    = this.handleUnshareButton.bind(this);
        this.fetchToolList          = this.fetchToolList.bind(this);
        this.handleAcceptButton     = this.handleAcceptButton.bind(this); 

        this.state = {
            toolList:[] ,
            showedToolList:[],  // must add filtering feature later  
            borrowedList:[],
            showedBorrowedList:[],
            shareUpdated: 0
        }
    }

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
        debugger
        var temp_tool_list = []
        var temp_borrowed_list = []
        let userId = getUser()._id
        getToolList(userId)
        .then((response)=>{
            console.log('own:',response)
            temp_tool_list = response ;
            getBorrowedToolList(userId)
            .then((resp)=>{
                console.log('boroowed:',resp);
                temp_borrowed_list = resp;
                this.setState({
                    toolList:temp_tool_list, 
                    showedToolList:temp_tool_list,
                    borrowedList: temp_borrowed_list,
                    showedBorrowedList: temp_borrowed_list
                })
            })
            .catch ((err) => {
                console.log('error in getting borrowed list:',err)
            })
        })
        .catch ((err) => {
            console.log('error in getting tool list:',err)
        })
    }

    componentDidMount () {
        this.fetchToolList()     
    }

    render() {
        return (
                
                <section id="toolshed">
                    <Link to="/tool/add"><Button id="add-tool-btn"  variant="primary">Add a tool</Button></Link>
                    {this.state.showedBorrowedList.length > 0 ?
                    <>
                        <h1 className="title page-title">Borrowd<span></span></h1>
                        {this.state.showedBorrowedList.map((tool)=>{
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
                                            <Col className="deatil-col" sm={8}>
                                                <h4>{tool.name}</h4>
                                                <h6>{tool.brand}</h6>
                                                <p>{tool.description}</p>
                                            </Col>
                                            <Col className="button-col" sm={2}> 
                                                <Row>
                                                    <Col> 
                                                                                
                                                        {/* <Button 
                                                            className="secondary-btn share-btn toolshed-unshare-btn" 
                                                            // variant="primary"
                                                            name= {tool._id}
                                                            onClick={this.handleReturnButton}>
                                                                Return
                                                            </Button>  */}
                                                    </Col>   
                                                </Row>
                                                <Row> 
                                                    <Link 
                                                        to={{pathname:'/home/tool/detail',
                                                        state : { toolId:tool._id}
                                                    }}>
                                                        <Button className="primary-btn  detail-btn" >
                                                            Detail
                                                        </Button> 
                                                    </Link>
                                                </Row>   
                                            </Col>                                                     
                                        </Row>  
                                </Container>
                            )
                        })}
                    </>  
                    :
                    <Alert variant="primary" className="no-data-alert">No Tools to show.</Alert>
                    }
                    {this.state.showedToolList.length > 0 ?
                    <>
                        <h1 className="title page-title">My own<span></span></h1>
                        {this.state.showedToolList.map((tool) => {
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
                                                            <h6>Lended to</h6>

                                                            <Link 
                                                            to={{pathname:'/home/user/public-page',
                                                            state : { lender:tool.lended_to[0]._id}

                                                            }}>
                                                                <strong>{ tool.lended_to[0].displayname}</strong>
                                                            </Link>
                                                        </div>
                                                    }
                                                    </Col>
                                                    
                                                </Row>
                                                <Row> 
                                                    <Link 
                                                        to={{pathname:'/home/tool/detail',
                                                        state : { toolId:tool._id}
                                                    }}>
                                                        <Button className="primary-btn  detail-btn" >
                                                            Detail
                                                        </Button> 
                                                    </Link>
                                                </Row>   
                                            </Col>                                                     
                                        </Row> 
                                </Container>

                            )
                        })}
                    </> 
                    :
                    <Alert variant="primary" className="no-data-alert">No Tools to show.</Alert>
                    }
                    <Link to="/tool/add"><Button id="add-tool-btn"  variant="primary">Add a tool</Button></Link>

                </section>
            
        )
    }
}

export default toolshed
