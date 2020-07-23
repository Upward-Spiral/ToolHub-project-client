
import React, { Component }                 from 'react';
import { Link }                             from 'react-router-dom';
import { getUser }                          from '../utils/auth';
import { getRequestList, lendTool }         from '../utils/toolQueries';
import { Container,Row,Col,Media,Button }   from 'react-bootstrap';
// import RequesterItem from '../components/requester';
//import DefaultLayout from "../layouts/Default";

class Requests extends Component {
    constructor(props) {
        super(props)

        this.handleAcceptRequest = this.handleAcceptRequest.bind(this)
        this.handleRejectRequest = this.handleRejectRequest.bind(this)
        this.fetchRequestList    = this.fetchRequestList.bind(this);

        this.state = {
            requestList:[] ,
            showedRequestList:[],  // must add filtering feature later  
            requestaccepted: 0
        }
    }

    handleAcceptRequest (e) {
        debugger
        lendTool(e.target.name, e.target.value)
            .then((response)=>{ 
                console.log(response)
                this.fetchRequestList()     
            })
            .catch ((err) => {
                console.log(err)
            })       
    }

    handleRejectRequest (e) {
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
        debugger
        var tool_list
        getRequestList()
            .then((response)=>{
                console.log(response)
                tool_list = response ;
                this.setState({requestList:tool_list, showedRequestList:tool_list})
            })
            .catch ((err) => {
                console.log(err)
            })
        // this.setState({toolList:tool_list, showedToolList:tool_list})
        
    }

    componentDidMount () {
        debugger
        let tempUser = getUser()
        if (tempUser.new_reqs) {
            this.fetchRequestList()
        }        
    }
    render() {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col>
                        <h1 className="title page-title">Requests<span></span></h1>
                        </Col>
                    </Row>
                </Container>
                
                <section id="Requests">
                    {this.state.showedRequestList.length > 0 ?
                        this.state.showedRequestList.map((tool)=>{
                        return (
                            <Container  key={tool._id}>
                                <Media className="element-tool" >
                                    <img
                                        width={256}
                                        height={256}
                                        // className="mr-3 ml-3 mt-3 mb-3"
                                        src={tool.images[0] 
                                            ?
                                             tool.images[0].imgPath 
                                            : 
                                            "https://res.cloudinary.com/persia/image/upload/v1586933354/toolshare/Layout/tools-avatar_rbb7hn.jpg"}
                                        alt="Generic tool icon"
                                    />
                                    <Media.Body>
                                        {tool.lended_to.length === 0
                                        ?
                                        <>
                                            <Row className="mt-3 ml-3">
                                                <h6>Requsted by:</h6>
                                            </Row>                                                               
                                            {tool.requested_by.map((requester,index ) => {
                                                return (
                                                    // <RequesterItem
                                                    //     index = {index}
                                                    //     requester = {requester}
                                                    //     tool = {tool}
                                                    //     onRequestAccept={this.handleAcceptRequest}
                                                    //     onrequestReject

                                                    <Media className="element-requester" key={index}>
                                                        <img 
                                                            width={64}
                                                            height={64}
                                                            className="mr-3"
                                                            src={requester.images[0].imgPath} 
                                                            alt="user's profile"
                                                        />
                                                        <Media.Body>
                                                            <Row className="row">
                                                                <Col sm={5}>
                                                                    <h4>{requester.displayname}</h4>
                                                                    <h6>{requester.address[0].pcode} {requester.address[0].city} </h6>
                                                                    {/* <p>{requester.description}</p> */}
                                                                </Col>
                                                                <Col sm={3}> 
                                                                    <Button 
                                                                        className="primary-btn" 
                                                                        name = {requester._id}
                                                                        value = {tool._id}
                                                                        onClick={this.handleAcceptRequest}>
                                                                            Accept
                                                                    </Button>
                                                                </Col>     
                                                                <Col sm={4}>
                                                                    <Button 
                                                                        className="secondary-btn" 
                                                                        name= {requester._id}
                                                                        value = {tool._id}
                                                                        onClick={this.handleRejectRequest}>
                                                                            Reject
                                                                    </Button>                                              
                                                                </Col>                                                     
                                                            </Row>
                                                        </Media.Body>
                                                    </Media> 
                                                )
                                            })}
                                        </>
                                        :
                                        <> 
                                            <Row className="mt-3 ml-3">
                                                <h6>Reserved by:</h6>
                                            </Row> 
                                            {tool.reserved_by.map((reserver,index) => {
                                                return (
                                                    <Media className="element-reserver" key={index}>
                                                        <img 
                                                            width={64}
                                                            height={64}
                                                            className="mr-3"
                                                            src={reserver.images[0].imgPath} 
                                                            alt="user's profile"
                                                        />
                                                        <Media.Body>
                                                            <Row className="row">
                                                                <Col sm={5}>
                                                                    <h4>{reserver.displayname}</h4>
                                                                    <h6>{reserver.address[0].city}</h6>
                                                                    {/* <p>{reserver.description}</p> */}
                                                                </Col>
                                                                {/* <Col sm={3}> 
                                                                    <Button 
                                                                        className="primary-btn" 
                                                                        name= {reserver._id}
                                                                        onClick={this.handleAcceptButton}>
                                                                            Accept!
                                                                    </Button>
                                                                </Col>      */}
                                                                <Col sm={4}>
                                                                    <Button 
                                                                        className="secondary-btn" 
                                                                        name= {reserver._id}
                                                                        onClick={this.handleRejectButton}>
                                                                            Reject!
                                                                    </Button>                                              
                                                                </Col>                                                     
                                                            </Row>
                                                        </Media.Body>
                                                    </Media> 
                                                )
                                            })}
                                        </>
                                        
                                         
                                        }
                                            
                                       
                                             
                                    </Media.Body>
                                </Media>
                            </Container>

                        )
                    })
                    :
                    <h6>No requests to show!</h6>
                }
                    <Link to="/tool/add"><Button id="add-tool-btn"  variant="primary">Back</Button></Link>

                </section>
            </>

        )
    }
}


export default Requests
