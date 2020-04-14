import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import DefaultLayout from "../layouts/Default";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {getGeoCode} from '../utils/geoCode';
import { Button, Field, Control, Input, Card, Content, Media, Container, Level } from 'reactbulma';
import {getUser} from '../utils/auth';
import {searchTools} from '../utils/toolQueries';

class Search extends Component {
    constructor(props) {
        super(props)

        this.handleSearch = this.handleSearch.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

        this.state = {
            userLocation:{
                long: 0, 
                latt: 0
            },
            searchData: {
                latt:0,
                long:0,
                word:""
            },
            toolList:undefined,
            address: ""
        }
    }

    handleInputChange (event) {
        // debugger
        let temp_searchData = {...this.state.searchData};
        temp_searchData[event.target.name] = event.target.value;
        this.setState({searchData:temp_searchData})
    }

    handleSearch (){
        debugger
        
        searchTools(this.state.searchData)
            .then((result)=>{
                this.setState({toolList:result.data})
            })
      
    }

    componentDidMount () {
       debugger
       let temp_user = getUser()
       let lon = temp_user.location.coordinates[0]
       let lat = temp_user.location.coordinates[1]
       let temp_location = {lon,lat}
       let temp_searchData = {...this.state.searchData}
       temp_searchData.latt = lat;
       temp_searchData.long = lon;
       this.setState({userLocation:temp_location, searchData:temp_searchData})
       
        
    }

    render() {
        return (
            <DefaultLayout>
                <div className="search-page">
                    <div className="search-page-upper-part">
                        <h1>search page</h1>
                        <h2>lat: {this.state.userLocation.lat}</h2>
                        <h2>lon: {this.state.userLocation.lon}</h2>
                        <Container fluid>
                            <Level>
                                <Level.Item hasTextCentered>
                                    <Field hasAddons>    
                                        <Control>
                                            <Input name="word" placeholder="Enter a name" onChange={this.handleInputChange}/>
                                        </Control>
                                        <Control>
                                            <Button info onClick={this.handleSearch}>     
                                                Search
                                            </Button>
                                        </Control>
                                    </Field>
                                </Level.Item>
                            </Level>
                            {this.state.toolList && 
                                this.state.toolList.map((tool)=>{
                                    return (
                                        <div key={tool._id} className="box">
                                            <article className="media">
                                                {/* <div className="media-left">
                                                    <figure className="image is-64x64">
                                                        <img src={tool.images[0]&&tool.images[0].imgPath} alt="tool"/>
                                                    </figure>
                                                </div> */}
                                                <div className="media-content">
                                                    <div className="content">
                                                        <div class="tile is-ancestor">
                                                            <div class="tile is-parent">
                                                                <article class="tile is-child is-2">                                       
                                                                    <figure class="image is-64x64">
                                                                            <img src={tool.images[0]&&tool.images[0].imgPath} alt="tool"/>
                                                                    </figure>  
                                                                </article>
                                                            </div>
                                                            <div class="tile is-vertical is-7">
                                                                
                                                                    <div class="tile is-parent is-vertical">
                                                                        <article class="tile is-child  is-primary">
                                                                            <h3>{tool.name}</h3>
                                                                            <h5>{tool.category[0]}</h5>
                                                                        </article>
                                                                            <article class="tile is-child  is-warning">
                                                                            {/* <p>Description</p> */}
                                                                            <p>{tool.description}</p>
                                                                        </article>
                                                                    </div>
                                                                
                                                            </div> 
                                                            <div class="tile is-parent is-2">
                                                                <article class="tile is-child ">
                                                                    {/* <p><small>about</small></p> */}
                                                                    <p>{Math.round(tool.distanceFrom/1000)}</p>
                                                                    <p><small>Km away</small></p>
                                                                    <p><small>{tool.available ? <FontAwesomeIcon icon="check-square" /> : <FontAwesomeIcon icon="cross-square" />}</small></p>
                                                                </article>                                                             
                                                            </div>                                                       
                                                        </div>
                                                    </div>
                                                </div>         
                                            </article>
                                        </div>
                                    )
                                })
                                } 
                            <div id="map"></div>    
                        </Container>                       
                    </div>
                    <div className="search-page-lower-part">
                    <Container fluid> 
                        <div className="columns is-multiline is-tablet">
                            <div className="column is-3">
                                <Card>
                                    <Card.Image src='http://bulma.io/images/placeholders/1280x960.png' ratio='4by3' />
                                    <Card.Content>
                                        <Media>    
                                            <Media.Content>
                                                <p is='6'>Search Term</p>    
                                            </Media.Content>
                                        </Media>
                                        <Content>
                                        
                                        <small>11:09 PM - 1 Jan 2016</small>
                                        </Content>
                                    </Card.Content>
                                </Card>
                            </div>
                            <div className="column is-3">
                                <Card>
                                    <Card.Image src='http://bulma.io/images/placeholders/1280x960.png' ratio='4by3' />
                                    <Card.Content>
                                        <Media>
                                            
                                            <Media.Content>
                                                <p is='6'>Search Term</p>
                                                
                                            </Media.Content>
                                        </Media>
                                        <Content>
                                        
                                        <small>11:09 PM - 1 Jan 2016</small>
                                        </Content>
                                    </Card.Content>
                                </Card>
                            </div>
                            <div className="column is-3">
                                <Card>
                                    <Card.Image src='http://bulma.io/images/placeholders/1280x960.png' ratio='4by3' />
                                    <Card.Content>
                                        <Media>
                                            
                                            <Media.Content>
                                                <p is='6'>Search Term</p>
                                                
                                            </Media.Content>
                                        </Media>
                                        <Content>
                                        
                                        <small>11:09 PM - 1 Jan 2016</small>
                                        </Content>
                                    </Card.Content>
                                </Card>
                            </div>
                            <div className="column is-3">
                                <Card>
                                    <Card.Image src='http://bulma.io/images/placeholders/1280x960.png' ratio='4by3' />
                                    <Card.Content>
                                        <Media>
                                            
                                            <Media.Content>
                                                <p is='6'>Search Term</p>
                                                
                                            </Media.Content>
                                        </Media>
                                        <Content>
                                        
                                        <small>11:09 PM - 1 Jan 2016</small>
                                        </Content>
                                    </Card.Content>
                                </Card>
                            </div>
                        </div>
                            
                            

                    </Container>
                    </div>
                </div>
                
                
            </DefaultLayout>
        )
    }
}

export default Search
