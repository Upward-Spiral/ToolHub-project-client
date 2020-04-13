import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import DefaultLayout from "../layouts/Default";
// import {getGeoCode} from '../utils/geoCode';
import { Button, Field, Control, Input, Card, Content, Media, Container, Level } from 'reactbulma';
import {getUser} from '../utils/auth';

class Search extends Component {
    constructor(props) {
        super(props)

        this.handleSearch = this.handleSearch.bind(this)

        this.state = {
            userLocation:{
                long: 0, 
                latt: 0
            },
            address: ""
        }
    }

    handleSearch (){
        debugger
      
    }

    componentDidMount () {
       debugger
       let temp_user = getUser()
       let lon = temp_user.location.coordinates[0]
       let lat = temp_user.location.coordinates[1]
       let temp_location = {lon,lat}
       this.setState({userLocation:temp_location})
       
        
    }

    render() {
        return (
            <DefaultLayout>
                <div className="search-page">
                    <div className="search-page-upper-part">
                        <h1>search page</h1>
                        <h2>lat: {this.state.location.lat}</h2>
                        <h2>lon: {this.state.location.lon}</h2>
                        <Container fluid>
                            <Level>
                                <Level.Item hasTextCentered>
                                    <Field hasAddons>    
                                        <Control>
                                            <Input placeholder="Text input" />
                                        </Control>
                                        <Control>
                                            <Button info onClick={this.handleSearch}>
                                                
                                                Search
                                            </Button>
                                        </Control>
                                    </Field>
                                </Level.Item>
                            </Level> 
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
