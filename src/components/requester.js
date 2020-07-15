import React from 'react';
import {Container,Row,Col,Media,Button} from 'react-bootstrap';

function RequesterItem(props) {
    return (
        <Media className="element-requester" key={this.props.index}>
            <img 
                width={64}
                height={64}
                className="mr-3"
                src={this.props.this.props.requester.images[0].imgPath} 
                alt="user's profile picture"
            />
            <Media.Body>
                <Row className="row">
                    <Col sm={5}>
                        <h4>{this.props.requester.displayname}</h4>
                        <h6>{this.props.requester.address[0].city}</h6>
                        {/* <p>{this.props.requester.description}</p> */}
                    </Col>
                    <Col sm={3}> 
                        <Button 
                            className="primary-btn" 
                            name= {this.props.requester._id}
                            
                            onClick={this.handleAcceptRequest}>
                                Accept
                        </Button>
                    </Col>     
                    <Col sm={4}>
                        <Button 
                            className="secondary-btn" 
                            name= {this.props.requester._id}
                            onClick={this.handleRejectRequest}>
                                Reject
                        </Button>                                              
                    </Col>                                                     
                </Row>
            </Media.Body>
        </Media>
    )
}

export default RequesterItem;
