import React, { Component } from 'react'
import DefaultLayout from "../layouts/Default";
import {Container,Row,Col,Media,Button,Card} from 'react-bootstrap';
import {getProfile} from '../utils/userQueries';
import moduleName from '../utils/toolQueries';

class PublicPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toolThumbIx : 0,
            projectThumbIx: 0,
            user: {},
            toolList: [],
            showedToolList:[]         
        }
    }

    // loadUserDetails () {
    //     let {displayname,city,images}
    // }

    HandleToolListNext () {
        let tempIx = this.state.toolThumbIx +4
        let temp_stl = this.state.toolList.slice(tempIx,tempIx+4)
        this.setState({toolThumbIx:tempIx,showedToolList:temp_stl})
    }

    componentDidMount () {
        debugger
        
        let userId = this.props.location.state.lender
        getProfile(userId)
        .then((response)=>{
            // this.loadUserDetails(response)
            console.log(response)
            this.setState({user:response})

        })
        getToolList(userId)
        .then((response)=>{
            // this.loadToolList(response)
            console.log(response)
            this.setState({toolList:response})

        })
        
    }

    render() {
        return (
            
        <DefaultLayout>
            <h1>Public Profile</h1>
            <Container>               
                    <Media>
                        <Media.Body>
                            <h5>{this.state.user.displayname}</h5>
                            <p>{this.state.user.address.city}</p>
                        </Media.Body>
                            <img
                                width={256}
                                height={256}
                                className="ml-3"
                                src={this.state.user.images[0].imgPath}
                                alt="user picture"
                            />
                    </Media>    
            </Container>
            <Container>
                <Row>
                    {this.state.toolList.length > 0 &&
                        this.state.showedToolList.map((tool)=>{
                            <Col xs={12} sm={6} md={3}>
                                <Card style={{ width: '10rem' }}>
                                    <Card.Img variant="top" src={tool.images[0].imgPath} />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                    </Card>
                            </Col>
                        })
                    }
                    
                    <Button variant="outline-light" className="tool-carousel"> > </Button>
                    
                </Row>
            </Container>
                        
        </DefaultLayout>
        )
    }
}


export default PublicPage;
