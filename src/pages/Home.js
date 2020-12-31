import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getUser } from "../utils/auth"
import Profile from './profile'
import Feed from './Feed'
import ToolDetail from './Tool-detail'
import Toolshed from './toolshed'
import Requests from './Requests'
import Settings from './Settings'
import Search from './Search'
import AddTool from './Add-tool'
import AddProject from './Add-project'
import AllProjects from './Projects-list'
import PublicPage from './PublicPage'
import Dashboard from './Dashboard'
import Logout from './logout'
import { Button, Container, Card, ListGroup } from 'react-bootstrap'

class Home extends Component {
    constructor() {
        super()

        this.setToday = this.setToday.bind(this)

        this.state = {
            user: {},
            tempImgUrl: "",
            today: null
        }

    }

    setToday() {
        let tempDate = new Date()
        let today = tempDate.toDateString()
        return today

    }

    componentDidMount() {
        let temp_user = getUser()
        if (!temp_user.images[0]) {
            let image = "https://res.cloudinary.com/persia/image/upload/v1586683045/toolshare/Layout/avatar_brcvks.png"
            this.setState({ tempImgUrl: image })
        } else {
            this.setState({ tempImgUrl: temp_user.images[0].imgPath })
        }
        let today = this.setToday()
        console.log(temp_user)
        this.setState({ user: temp_user, today: today })


    }

    render() {
        return (
            <Container className="home-page">
                {/* <Row> */}
                <div id="side-panel" /* sm={4} md={4} lg={4} */>
                    <Card className="side-panel-card" style={{ width: '18rem' }}>
                        <Card.Header className="side-panel-header">Hello {this.state.user.displayname}</Card.Header>
                        <Card.Img className="side-panel-img" variant="top" src={this.state.tempImgUrl} />
                        <Card.Body className="side-panel-card-body">
                            <Card.Title>{this.state.today}</Card.Title>
                        </Card.Body>
                        <ListGroup className="side-panel-flush">
                            <ListGroup.Item className="sidebar-list-item"><Link to="/home">Dashboard</Link></ListGroup.Item>
                            <ListGroup.Item className="sidebar-list-item"><Link to="/home/tool/shed">Toolshed</Link></ListGroup.Item>
                            <ListGroup.Item className="sidebar-list-item"><Link to="/home/user/feed">Fellow Craftsmen</Link></ListGroup.Item>
                            <ListGroup.Item className="sidebar-list-item"><Link to="/home/user/requests">Requests</Link></ListGroup.Item>
                            <ListGroup.Item className="sidebar-list-item"><Link to="/home/user/profile">Profile</Link></ListGroup.Item>
                            <ListGroup.Item className="sidebar-list-item"><Link to="/home/user/settings">Settings</Link></ListGroup.Item>
                            <ListGroup.Item>
                                <Link to="/home/logout"><Button variant="secondary bottom" size="lg" block>Logout</Button></Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                </div>
                <div id="main-area"/* sm={8} md={8} lg={8} */>
                    <Container >
                        <Switch>
                            <Route exact path="/home" component={Dashboard} />
                            <Route path="/home/tool/detail" component={ToolDetail} />
                            <Route path="/home/tool/search" component={Search} />
                            <Route path="/home/tool/add" component={AddTool} />
                            <Route path="/home/tool/shed" component={Toolshed} />
                            <Route path="/home/project/add" component={AddProject} />
                            <Route path="/home/project/list" component={AllProjects} />
                            <Route path="/home/user/feed" component={Feed} />
                            <Route path="/home/user/profile" component={Profile} />
                            <Route path="/home/user/public-page" component={PublicPage} />
                            <Route path="/home/user/settings" component={Settings} />
                            <Route path="/home/user/requests" component={Requests} />
                            <Route path="/home/logout" component={Logout} />
                        </Switch>
                    </Container>

                </div>
                {/* </Row> */}
            </Container>
        )
    }
}

export default Home
