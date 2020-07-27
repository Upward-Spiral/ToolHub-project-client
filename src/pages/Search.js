import React, { Component }     from 'react';
import { Link }                 from 'react-router-dom';
import { getUser }              from '../utils/auth';
import { searchTools }          from '../utils/toolQueries';
import { WrappedMap }           from '../components/googleMap';
import { Container,Row,Col,Card,Button,Form,Media } from 'react-bootstrap';


class Search extends Component {
    constructor(props) {
        super(props)

        this.handleSearch = this.handleSearch.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)       
        // this.handleDetailButton = this.handleDetailButton.bind(this)

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
        debugger
        event.preventDefault();
        debugger
        let theSearchData = this.state.searchData
        searchTools(theSearchData)
            .then((result)=>{
                // let tempsearchResults = result.data
                let goodSearchResults 
                let temp_flag = false
                if (result.length === 0) {
                    temp_flag=true
                }
                var temp_user = getUser()
                goodSearchResults = result.filter((item)=>{
                    return item.owner[0].username !== temp_user.username
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
                <div className="search-page">                
                    <Container fluid id="search-form">
                        <Row>
                            <Col>
                            <Form onSubmit={this.handleSearch} className="search-form">
                                    <Form.Row>
                                        <Form.Group controlId="formSearchWord">                                          
                                            <Form.Control 
                                                name="word" type="text" 
                                                placeholder="Search" 
                                                onChange={this.handleInputChange}/>
            
                                        </Form.Group>
                                        <Button variant="primary" type="submit" className="search-btn">
                                            Search
                                        </Button>
                                    </Form.Row>
                                </Form>
                            </Col>
                            
                        </Row>     
                    </Container> 
                    <Container className="map">
                        <Row>       
                            {this.state.showedResults && this.state.showedResults.length > 0  && 
                            <div style={{width:"40vw", height:'40vh', 'borderRadius': '10px' }}>
                                <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                                loadingElement={<div style={{height:"100%"}}/>}
                                containerElement={<div style={{height:"100%"}}/>}
                                mapElement={<div style={{height:"100%"}}/>}
                                markers={this.state.markers}
                                center={this.state.userLocation}
                                
                                />
                            </div> 
                            }     
                        </Row>     
                    </Container>                                     
                    <Container id="search-results">
                        <Row>
                            <Col>
                                {this.state.showedResults
                                    ?
                                    this.state.showedResults.map((tool)=>{
                                        return (
                                            <Container  key={tool._id}>
                                                <Media className="item" >
                                                    <Col sm={3}>
                                                        <img
                                                            width={128}
                                                            height={128}
                                                            className="mr-3"
                                                            src={tool.images[0] 
                                                                ?
                                                                tool.images[0].imgPath 
                                                                : 
                                                                "https://res.cloudinary.com/persia/image/upload/v1586933354/toolshare/Layout/tools-avatar_rbb7hn.jpg"}
                                                            alt="Generic tool icon"
                                                        /> 
                                                        <p className="status">
                                                            {tool.available 
                                                            ? 
                                                            <small className="ok-message"><strong>available</strong></small> 
                                                            : 
                                                            <small className="error-message"><strong>unavailable</strong></small> }
                                                        </p>
                                                    </Col>
                                                    <Col sm={9}>
                                                        <Media.Body>
                                                            <Row>
                                                                <Col sm={9}>
                                                                    <h4 className="mt-3">{tool.name}</h4>
                                                            <h5>Category: {tool.category[0]}, {tool.category[1]}, {tool.category.length === 3 && tool.category[2]}</h5>
                                                                    <h6>Brand: {tool.brand}</h6>
                                                                    <br/>
                                                                    <p>{tool.description}</p>
                                                                    <p>Owner: {tool.owner[0].displayname}</p>
                                                                </Col>
                                                                <Col sm={3}> 
                                                                    <p className="mt-3">{Math.round(tool.distanceFrom/1000)} <small>Km away</small></p>
                                                                    <p></p>
                                                                    
                                                                    <Link 
                                                                        to={{pathname:'/home/tool/detail',
                                                                        state : { toolId:tool._id}
                                                                    }}>
                                                                        <Button className="primary-btn  detail-btn">
                                                                            Detail
                                                                        </Button> 
                                                                    </Link>
                                                                </Col>                                                     
                                                            </Row>      
                                                        </Media.Body>        
                                                    </Col>
                                                    
                                                </Media>
                                            </Container>
                                        )
                                    })
                                    :
                                    <p></p>
                                }
                                {
                                    this.state.flag && 
                                    <h4>Found 0 results! Refine your search and try again.</h4>
                                }                                  
                            </Col>                              
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col className="previous-search"><h4>Previous Searches</h4></Col>
                        </Row>
                        <Row>
                            <Col sm={3}>
                                <Card className="previous-search-card"/* style={{ width: '18rem' }} */>
                                    <Card.Img variant="top" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="previuos search"/>
                                    <Card.Body>
                                        <Card.Title>Search Term</Card.Title>
                                        <Card.Text>
                                        Date
                                        </Card.Text>
                                        <Button variant="primary" className="secondary-btn">Search Again</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={3}>
                                <Card className="previous-search-card"/* style={{ width: '18rem' }} */>
                                    <Card.Img variant="top" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="previuos search"/>
                                    <Card.Body>
                                        <Card.Title>Search Term</Card.Title>
                                        <Card.Text>
                                        Date
                                        </Card.Text>
                                        <Button variant="primary" className="secondary-btn">Search Again</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={3}>
                                <Card className="previous-search-card"/* style={{ width: '18rem' }} */>
                                    <Card.Img variant="top" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="previuos search"/>
                                    <Card.Body>
                                        <Card.Title>Search Term</Card.Title>
                                        <Card.Text>
                                        Date
                                        </Card.Text>
                                        <Button variant="primary" className="secondary-btn">Search Again</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={3}>
                                <Card className="previous-search-card"/* style={{ width: '18rem' }} */>
                                    <Card.Img variant="top" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="previuos search"/>
                                    <Card.Body>
                                        <Card.Title>Search Term</Card.Title>
                                        <Card.Text>
                                        Date
                                        </Card.Text>
                                        <Button variant="primary" className="secondary-btn">Search Again</Button>
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
            
        )
    }
}

export default Search
