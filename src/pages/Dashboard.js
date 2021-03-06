import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

function Dashboard (props){
        return (
            <div className="card-board">
                {/* <Container fluid> */}
                {/* <Row> */}
                {/* <Col sm={5}>                                */}
                <Card className="dashboard-card" style={{ width: '18rem' }}>
                    <Card.Img variant="top" /* fluid */ src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" />
                    <Card.Body>
                        <Link to="/home/tool/search"><Card.Title className="dashboard-card-title">Find a tool</Card.Title></Link>
                    </Card.Body>
                </Card>
                {/* </Col> */}
                {/* <Col sm={5}> */}
                <Card className="dashboard-card" style={{ width: '18rem' }}>
                    <Card.Img variant="top" /* fluid */ src="https://res.cloudinary.com/persia/image/upload/v1586651915/toolshare/Layout/toolbox_kl52cu.jpg" />
                    <Card.Body>
                        <Link to="/home/tool/add"><Card.Title className="dashboard-card-title">Add a tool</Card.Title></Link>
                    </Card.Body>
                </Card>
                {/* </Col>        */}

                {/* <Col sm={5}> */}
                <Card className="dashboard-card" style={{ width: '18rem' }}>
                    <Card.Img variant="top" /* fluid */ src="https://res.cloudinary.com/persia/image/upload/v1586652210/toolshare/Layout/laptop-level-tool_ly0yj6.jpg" />
                    <Card.Body>
                        <Link to="/home/project/add"><Card.Title className="dashboard-card-title">Start a project</Card.Title></Link>
                    </Card.Body>
                </Card>
                {/* </Col> */}
                {/* <Col sm={5}> */}
                <Card className="dashboard-card" style={{ width: '18rem' }}>
                    <Card.Img variant="top" /* fluid */ src="https://res.cloudinary.com/persia/image/upload/v1586652702/toolshare/Layout/inspiration_j3kb3y.jpg" />
                    <Card.Body>
                        <Link to="/home/project/list"><Card.Title className="dashboard-card-title">Get inspired</Card.Title></Link>
                    </Card.Body>
                </Card>
                {/* </Col> */}
                {/* </Row> */}
                {/* </Container> */}
            </div>
        )
    }

export default Dashboard
