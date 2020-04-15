import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import DefaultLayout from "../layouts/Default";
import {Container,Row,Col,Card,Button,Form,Media} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {getUser} from '../utils/auth';
import {searchTools,borrowTool,reserveTool} from '../utils/toolQueries';
import {InitialMap} from '../components/googleMap';


class Search extends Component {
    constructor(props) {
        super(props)

        this.handleSearch = this.handleSearch.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBorrowButton = this.handleBorrowButton.bind(this)
        this.handleReserveButton = this.handleReserveButton.bind(this)

        // binding map functions
        // this.handleMapClick = this.handleMapClick.bind(this)
        //this.handleMarkerClick = this.handleMarkerClick.bind(this)
        // this.handleMarkerClose = this.handleMarkerClose.bind(this)
        // this.handleChange = this.handleChange.bind(this)
        // this.updatingContent = this.updatingContent.bind(this)

        this.state = {
            userLocation:{
                 lat: 0,
                lng: 0 
               
            },
            searchData: {
                lat:0,
                lng:0,
                word:""
            },
            // {lat:52,lng:4},{lat:52.988,lng:4.134}
            markers:[],
            toolList:undefined,
            address: ""
        }
    }

    // Map functions
    // handleMapClick () {
    //     return 1
    // }
    // handleMarkerClick (targetMarker) {
    //     let tempMarkers = this.state.markers
    //     let marker = 
    //     return 1
    // }

    // handleMarkerClose () {
    //     return 1
    // }

    // handleChange () {
    //     return 1
    // }


    handleInputChange (event) {
        // debugger
        let temp_searchData = {...this.state.searchData};
        temp_searchData[event.target.name] = event.target.value;
        this.setState({searchData:temp_searchData})
    }

    handleSearch (event){
        event.preventDefault();
        debugger
        let theSearchData = this.state.searchData
        searchTools(theSearchData)
            .then((result)=>{
                let tempToolList = result.data
                let markers = tempToolList.map((tool)=>{
                    let latLng = {lat:tool.location.coordinates[1],lng:tool.location.coordinates[0]}
                    let title = tool.name
                    return {id:tool._id,position:latLng,title:title}
                })
                console.log(markers)
                this.setState({toolList:result.data, markers:markers})
            })
      
    }

    handleBorrowButton (e) {
        debugger
        borrowTool(e.target.name)
            .then((response)=>{ 
                this.fetchToolList()     
            })
            .catch ((err) => {
                console.log(err)
            })       
    }

    handleReserveButton (e) {
        debugger
        reserveTool(e.target.name)
            .then((response)=>{
                this.fetchToolList()     
            })
            .catch ((err) => {
                console.log(err)
            })    
    }

    componentDidMount () {
       debugger
       let temp_user = getUser()
       let lng = temp_user.location.coordinates[0]
       let lat = temp_user.location.coordinates[1]
       let temp_location = {lat,lng}
       let temp_searchData = {...this.state.searchData}
       temp_searchData.latt = lat;
       temp_searchData.long = lng;
       this.setState({userLocation:temp_location, searchData:temp_searchData})
       
        
    }

    render() {
        return (
            <DefaultLayout>
                <div className="search-page">
                    <div className="search-page-upper-part">
                        <h1>search page</h1>
                        <h2>lat: {this.state.userLocation.lat}</h2>
                        <h2>lng: {this.state.userLocation.lng}</h2>
                        {this.state.toolList && 
                        <div style={{width:"50vw", height:'50vh'}}>
                            <InitialMap /* googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBTM6vT7ygkZ9wufF1ptGOTMzf8fQ6a2Hw`} */
                            // loadingElement={<div style={{height:"100%"}}/>}
                            containerElement={<div style={{height:"100%"}}/>}
                            mapElement={<div style={{height:"100%"}}/>}
                            markers={this.state.markers}
                            defaultCenter={this.state.userLocation}
                            // defaultCenterLng={this.state.userLocation.long}
                            />
                        </div> 
                        }
                        <Container fluid id="search-form">
                            <Row>
                                <Col>
                                    <Form onSubmit={this.handleSearch}>
                                        <Form.Group controlId="formSearchWord">                                          
                                            <Form.Control 
                                                name="word" type="text" 
                                                placeholder="Search" 
                                                onChange={this.handleInputChange}/>
                                            <Form.Text className="text-muted">
                                                <p>this search is case-sensitive (Sorry!)</p> 
                                            </Form.Text>
                                        </Form.Group>
                                        <Button variant="primary" type="submit" /* onClick={this.handleSearch} */>
                                            Search
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>              
                            
                        <Container>
                            <Row>
                                <Col sm={6}>
                                    {this.state.toolList && 
                                        this.state.toolList.map((tool)=>{
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
                                                                <Col sm={10}>
                                                                    <h4>{tool.name}</h4>
                                                                    <h5>{tool.category[0]}</h5>
                                                                    <h6>{tool.brand}</h6>
                                                                    <br/>
                                                                    <p>{tool.description}</p>
                                                                </Col>
                                                                <Col sm={2}> 
                                                                    <p>{Math.round(tool.distanceFrom/1000)}</p>
                                                                        <p><small>Km away</small></p>
                                                                        <p>{tool.available ? <small>available</small> : <small>unavailable</small> }</p>                                 
                                                                    {tool.available ? 
                                                                        <Button 
                                                                            className="offer-it-btn" 
                                                                            variant="primary"
                                                                            name= {tool._id}
                                                                            onClick={this.handleBorrowButton}>
                                                                                Borrow it!
                                                                            </Button> 
                                                                        : 
                                                                        <Button 
                                                                            className="offer-it-btn" 
                                                                            variant="primary"
                                                                            name= {tool._id}
                                                                            onClick={this.handleReserveButton}>
                                                                                Reserve it!
                                                                            </Button>
                                                                    }
                                                                </Col>                                                     
                                                            </Row>      
                                                        </Media.Body>
                                                    </Media>
                                                </Container>
                                            )
                                        })
                                    } 
                                </Col>
                                <Col sm={6}>
                                                                 
                                </Col>
                            </Row>
                        </Container>
                            
                                                     
                    </div>

                    <Container>
                        <Row>
                            <Col sm={3}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="previuos search"/>
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        Search Term
                                        </Card.Text>
                                        <Button variant="primary">Search Again</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={3}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="previuos search"/>
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        Search Term
                                        </Card.Text>
                                        <Button variant="primary">Search Again</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={3}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="previuos search"/>
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        Search Term
                                        </Card.Text>
                                        <Button variant="primary">Search Again</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={3}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="previuos search"/>
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        Search Term
                                        </Card.Text>
                                        <Button variant="primary">Search Again</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm>sm=true</Col>
                            <Col sm>sm=true</Col>
                            <Col sm>sm=true</Col>
                        </Row>
                    </Container>
               </div> 
                
            </DefaultLayout>
        )
    }
}

export default Search
