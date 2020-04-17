
import React, { Component } from 'react';
import DefaultLayout from "../layouts/Default";
import {getUser} from '../utils/auth';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {Container,Row,Col,Media,Button} from 'react-bootstrap';

class Requests extends Component {
    constructor(props) {
        super(props)

        this.handleAcceptButton = this.handleAcceptButton.bind(this)
        this.handleRejectButton = this.handleRejectButton.bind(this)
        this.fetchRequestList = this.fetchRequestList.bind(this);
        // this.handleDetailButton = this.handleDetailButton.bind(this)

        this.state = {
            requestList:[] ,
            showedRequestList:[],  // must add filtering feature later  
            requestaccepted: 0
        }
        

    }

    // handleDetailButton (e) {
    //     window.localStorage.setItem("visitedToolId", e.target.name);
    //     this.props.history.push({
    //         pathname:'/tool/detail'
    //     })
    // }

    handleAcceptButton (e) {
        debugger
        // acceptRequest(e.target.name)
        //     .then((response)=>{ 
        //         this.fetchRequestList()     
        //     })
        //     .catch ((err) => {
        //         console.log(err)
        //     })       
    }

    handleRejectButton (e) {
        debugger
        // rejectRequest(e.target.name)
        //     .then((response)=>{
        //         this.fetchRequestList()     
        //     })
        //     .catch ((err) => {
        //         console.log(err)
        //     })    
    }


    fetchRequestList(){
        // var temp_tool_list= []
        // getRequestList()
        // .then((response)=>{
        //     console.log(response)
        //     temp_tool_list = response ;
        //     this.setState({toolList:temp_tool_list, showedRequestList:temp_tool_list})
        // })
        // .catch ((err) => {
        //     console.log(err)
        // })
    }

    componentDidMount () {
        let tempUser = getUser()
        if (tempUser.new_reqs) {
            this.fetchRequestList()
        } else {

        }
             
    }

    render() {
        return (
            <DefaultLayout>
                <Container fluid>
                    <Row>
                        <Col><h1>Toolshed</h1></Col>
                    </Row>
                </Container>
                
                <section id="Requests">
                    {this.state.showedRequestList.length > 0 ?
                    this.state.showedRequestList.map((req)=>{
                        return (

                            <Container  key={req._id}>
                                <Media className="reqshed-element" >
                                    <img
                                        width={64}
                                        height={64}
                                        className="mr-3"
                                        src={req.images[0] 
                                            ?
                                             req.images[0].imgPath 
                                            : 
                                            "https://res.cloudinary.com/persia/image/upload/v1586933354/toolshare/Layout/tools-avatar_rbb7hn.jpg"}
                                        alt="Generic tool icon"
                                    />
                                    <Media.Body>
                                        <Row>
                                            <Col sm={10}>
                                                <h4>{req.displayname}</h4>
                                                <h6>{req.brand}</h6>
                                                <p>{req.description}</p>
                                            </Col>
                                            <Col sm={2}>                                  
                                                
                                                    <Button 
                                                        className="offer-it-btn" 
                                                        variant="primary"
                                                        name= {req._id}
                                                        onClick={this.handleAcceptButton}>
                                                            Accept!
                                                        </Button> 
                                                    
                                                    <Button 
                                                        className="offer-it-btn" 
                                                        variant="primary"
                                                        name= {req._id}
                                                        onClick={this.handleRejectButton}>
                                                            Reject!
                                                        </Button>
                                               
{/*                                                 
                                                <Link 
                                                    to={{pathname:'/tool/detail',
                                                    state : { toolId:tool._id}

                                                }}>
                                                    <Button 
                                                    className="tool-detail-btn" 
                                                    variant="primary"
                                                    >
                                                        Detail
                                                    </Button> 
                                                </Link> */}

                                              
                                                
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


export default Requests
