import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from "../layouts/Default";
import {Container,Row,Col,Card} from 'react-bootstrap';


class home extends Component {
    constructor(props) {
        super(props)
        this.state = {            
        }
    }

    render() {
        return (
            <DefaultLayout> 
                <div className="card-board">
                    <Container fluid>
                        <Row>
                            {/* <Col sm={5}>                                */}
                                <Card className="home-page-card" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" fluid src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" />
                                    <Card.Body>
                                        <Link to="/tool/search"><Card.Title className="home-page-card-title">Find a tool</Card.Title></Link>
                                    </Card.Body>
                                </Card>
                            {/* </Col> */}
                            {/* <Col sm={5}> */}
                                <Card className="home-page-card" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" fluid src="https://res.cloudinary.com/persia/image/upload/v1586651915/toolshare/Layout/toolbox_kl52cu.jpg" />
                                    <Card.Body>
                                        <Link to="/tool/add"><Card.Title className="home-page-card-title">Add a tool</Card.Title></Link>
                                    </Card.Body>
                                </Card>
                            {/* </Col>        */}
                        </Row>
                        <Row>
                            {/* <Col sm={5}> */}
                                <Card className="home-page-card" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" fluid src="https://res.cloudinary.com/persia/image/upload/v1586652210/toolshare/Layout/laptop-level-tool_ly0yj6.jpg" />
                                    <Card.Body>
                                        <Link to="/project/add"><Card.Title className="home-page-card-title">Start a project</Card.Title></Link> 
                                    </Card.Body>
                                </Card>
                            {/* </Col> */}
                            {/* <Col sm={5}> */}
                                <Card className="home-page-card" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" fluid src="https://res.cloudinary.com/persia/image/upload/v1586652702/toolshare/Layout/inspiration_j3kb3y.jpg" />
                                    <Card.Body>
                                        <Link to="/project/list"><Card.Title className="home-page-card-title">Get inspired</Card.Title></Link>
                                    </Card.Body>
                                </Card>                                                            
                            {/* </Col> */}
                        </Row>
                    </Container>
                </div>
            </DefaultLayout>    
        )
    }
}

export default home
