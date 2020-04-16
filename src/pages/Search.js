import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import DefaultLayout from "../layouts/Default";
import {Container,Row,Col,Card,Button,Form,Media} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {getUser} from '../utils/auth';
import {searchTools,BorrowTool,reserveTool} from '../utils/toolQueries';
import {WrappedMap} from '../components/googleMap';


class Search extends Component {
    constructor(props) {
        super(props)

        this.handleSearch = this.handleSearch.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)       
        this.handleDetailButton = this.handleDetailButton.bind(this)

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

            markers:[],
            searchResults:undefined,
            showedResults:undefined,
            address: "",
            user:undefined,
            flag:false
        }
    }

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
                // let goodSearchResults = result.data
                let tempsearchResults = result.data
                let goodSearchResults 
                let temp_flag = false
                if (tempsearchResults.length===0) {
                    temp_flag=true
                }
                goodSearchResults = tempsearchResults.filter((item)=>{
                    return item.owner[0].username !== this.state.user.username
                })
                let markers = goodSearchResults.map((tool)=>{
                    let latLng = {lat:tool.location.coordinates[1],lng:tool.location.coordinates[0]}
                    let title = tool.name
                    return {id:tool._id,position:latLng,title:title}
                })
                console.log(markers)

                this.setState({
                    searchResults: goodSearchResults, 
                    showedResults: goodSearchResults, 
                    markers:markers,
                    flag:temp_flag
                })
            })     
    }

    handleDetailButton (e) {
        window.localStorage.setItem("visitedTool", e.target.name);
        this.props.history.push({
            pathname:'/tool/detail'
        })
    }

    componentDidMount () {
       debugger
       let temp_user = getUser()
       let lng = temp_user.location.coordinates[0]
       let lat = temp_user.location.coordinates[1]
       let temp_location = {lat,lng}
       let temp_searchData = {...this.state.searchData}
       temp_searchData.lat = lat;
       temp_searchData.lng = lng;
       this.setState({
           userLocation:temp_location, 
           searchData:temp_searchData,
           user:temp_user
        })
       
        
    }

    render() {
        return (
            <DefaultLayout>
                <div className="search-page">
                    <div className="search-page-upper-part">
                        <h1>search page</h1>
                        <h6>lat: {this.state.userLocation.lat}</h6>
                        <h6>lng: {this.state.userLocation.lng}</h6>
                        {this.state.showedResults && this.state.showedResults.length > 0  && 
                        <div style={{width:"50vw", height:'50vh'}}>
                            <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                            loadingElement={<div style={{height:"100%"}}/>}
                            containerElement={<div style={{height:"100%"}}/>}
                            mapElement={<div style={{height:"100%"}}/>}
                            markers={this.state.markers}
                            center={this.state.userLocation}
                           
                            />
                        </div> 
                        }
                        <Container fluid id="search-form">
                        
                                    <Form onSubmit={this.handleSearch} className="search-form">
                                        <Form.Row>
                                            <Form.Group controlId="formSearchWord">                                          
                                                <Form.Control 
                                                    name="word" type="text" 
                                                    placeholder="Search" 
                                                    onChange={this.handleInputChange}/>
                                                {/* <Form.Text className="text-muted">
                                                    <p>this search is case-sensitive (Sorry!)</p> 
                                                </Form.Text> */}
                                            </Form.Group>
                                            <Button variant="primary" type="submit" className="search-btn">
                                                Search
                                            </Button>
                                        </Form.Row>
                                    </Form>
                            <Row>
                                <Col><h3>Previous Searches</h3></Col>
                            </Row>
                        </Container>              
                        
                        <Container>
                            <Row>
                                <Col sm={6}>
                                    {this.state.showedResults
                                       ?
                                    this.state.showedResults.map((tool)=>{
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
                                                                <p>{tool.owner[0].displayname}</p>
                                                            </Col>
                                                            <Col sm={2}> 
                                                                <p>{Math.round(tool.distanceFrom/1000)}</p>
                                                                    <p><small>Km away</small></p>
                                                                    <p>{tool.available ? <small>available</small> : <small>unavailable</small> }</p>  

                                                                    <Button 
                                                                        className="tool-detail-btn" 
                                                                        variant="primary"
                                                                        name= {tool._id}
                                                                        onClick={this.handleDetailButton}>
                                                                            Detail
                                                                    </Button>                               
                                                                
                                                            </Col>                                                     
                                                        </Row>      
                                                    </Media.Body>
                                                </Media>
                                            </Container>
                                        )
                                    })
                                   :
                                    // {!this.state.showedResults.length >0 &&
                                        <p></p>
                                    }
                                    {
                                        this.state.flag && 
                                        <h4>Found 0 results! Refine your search and try again.</h4>
                                    }
                                    
                                </Col>
                                <Col sm={6}>
                                                                 
                                </Col>
                            </Row>
                        </Container>
                            
                                                     
                    </div>

                    <Container>
                    <Row>
                        <Col><h3>Previous Searches</h3></Col>
                    </Row>
                        <Row>
                            <Col sm={3}>
                                <Card /* style={{ width: '18rem' }} */>
                                    <Card.Img variant="top" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="previuos search"/>
                                    <Card.Body>
                                        <Card.Title>Search Term</Card.Title>
                                        <Card.Text>
                                        Date
                                        </Card.Text>
                                        <Button variant="primary">Search Again</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={3}>
                                <Card /* style={{ width: '18rem' }} */>
                                    <Card.Img variant="top" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="previuos search"/>
                                    <Card.Body>
                                        <Card.Title>Search Term</Card.Title>
                                        <Card.Text>
                                        Date
                                        </Card.Text>
                                        <Button variant="primary">Search Again</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={3}>
                                <Card /* style={{ width: '18rem' }} */>
                                    <Card.Img variant="top" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="previuos search"/>
                                    <Card.Body>
                                        <Card.Title>Search Term</Card.Title>
                                        <Card.Text>
                                        Date
                                        </Card.Text>
                                        <Button variant="primary">Search Again</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={3}>
                                <Card /* style={{ width: '18rem' }} */>
                                    <Card.Img variant="top" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="previuos search"/>
                                    <Card.Body>
                                        <Card.Title>Search Term</Card.Title>
                                        <Card.Text>
                                        Date
                                        </Card.Text>
                                        <Button variant="primary">Search Again</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm></Col>
                            <Col sm></Col>
                            <Col sm></Col>
                        </Row>
                    </Container>
               </div> 
                
            </DefaultLayout>
        )
    }
}

export default Search
