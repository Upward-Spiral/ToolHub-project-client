import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {getUser} from "../utils/auth";
import {Button,Container,Row,Col,Card,ListGroup} from 'react-bootstrap';

class SidePanel extends Component {
    constructor() {
        super()

        this.state = {
            user:{},
            tempImgUrl: ""
        }
                 
        }

    componentDidMount () {
        let temp_user = getUser();
        if (!temp_user.images[0]) {
            let image = "https://res.cloudinary.com/persia/image/upload/v1586683045/toolshare/Layout/avatar_brcvks.png"
            this.setState({tempImgUrl: image })
        } else {
            this.setState({tempImgUrl:temp_user.images[0].imgPath})
        }    
        this.setState({user:temp_user});
        console.log(temp_user);

    }

    render() {
        return (
            <Container className="side-panel-contents">
                <Row>
                    <Col>
                        <Card className="side-panel-card" style={{ width: '18rem' }}>
                            <Card.Header className="side-panel-header">Today's date</Card.Header>
                            <Card.Img className="side-panel-img" variant="top" src={this.state.tempImgUrl} />
                            <Card.Body className="side-panel-card-body">
                                <Card.Title>{this.state.user.displayname}</Card.Title> 

                            </Card.Body>
                            <ListGroup className="side-panel-flush">
                                <ListGroup.Item className="sidebar-list-item"><Link to="/user/home">Dashboard</Link></ListGroup.Item>
                                <ListGroup.Item className="sidebar-list-item"><Link to="/tool/shed">Toolshed</Link></ListGroup.Item>
                                <ListGroup.Item className="sidebar-list-item"><Link to="/user/feed">Fellow Craftsmen</Link></ListGroup.Item>
                                <ListGroup.Item className="sidebar-list-item"><Link to="/user/requests">Requests</Link></ListGroup.Item>
                                <ListGroup.Item className="sidebar-list-item"><Link to="/user/profile">Profile</Link></ListGroup.Item>
                                <ListGroup.Item className="sidebar-list-item"><Link to="/user/settings">Settings</Link></ListGroup.Item>
                                {/* <ListGroup.Item className="sidebar-list-item"><Link to="/">Intro</Link></ListGroup.Item> */}
                                <ListGroup.Item>
                                    <Link to="/logout"><Button variant="secondary bottom" size="lg" block>Logout</Button></Link>
                                </ListGroup.Item>    
                        </ListGroup>
                        </Card>
                            
                    </Col>
                </Row>
            </Container>
                     

        )
    }
}

export default SidePanel
