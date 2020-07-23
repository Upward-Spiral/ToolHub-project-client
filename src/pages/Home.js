import React, { Component }     from 'react';
import {Switch,Route}           from 'react-router-dom';
import { Link }                 from 'react-router-dom';
import {getUser}                from "../utils/auth";
import Profile                  from './profile';
import Feed                     from './Feed';
import ToolDetail               from './Tool-detail';
import Toolshed                 from './toolshed';
import Requests                 from './Requests';
import Settings                 from './Settings';
import Search                   from './Search';
import AddTool                  from './Add-tool';
import AddProject               from './Add-project';
import AllProjects              from './Projects-list';
import PublicPage               from './PublicPage';
import Dashboard                from './Dashboard';
import {Button,Container,Row,Col,Card,ListGroup} from 'react-bootstrap';

class Home extends Component {
    constructor() {
        super()

        this.setToday = this.setToday.bind(this)

        this.state = {
            user:{},
            tempImgUrl: "",
            today: null
        }
                 
    }

    setToday () {
        let tempDate = new Date();
        let today = tempDate.toDateString()
        return today

    }

    componentDidMount () {
        let temp_user = getUser();
        if (!temp_user.images[0]) {
            let image = "https://res.cloudinary.com/persia/image/upload/v1586683045/toolshare/Layout/avatar_brcvks.png"
            this.setState({tempImgUrl: image })
        } else {
            this.setState({tempImgUrl:temp_user.images[0].imgPath})
        }
        let today = this.setToday()
        console.log(temp_user);    
        this.setState({user:temp_user, today:today});
        

    }

    render() {
        return (
            <Container className="side-panel-contents">
                <Row>
                    <Col sm={4}>
                        <Card className="side-panel-card" style={{ width: '18rem' }}>
                            <Card.Header className="side-panel-header">Hello {this.state.user.displayname}</Card.Header>
                            <Card.Img className="side-panel-img" variant="top" src={this.state.tempImgUrl} />
                            <Card.Body className="side-panel-card-body">
                                <Card.Title>{this.state.today}</Card.Title> 

                            </Card.Body>
                            <ListGroup className="side-panel-flush">
                                <ListGroup.Item className="sidebar-list-item"><Link to="/user/home">Dashboard</Link></ListGroup.Item>
                                <ListGroup.Item className="sidebar-list-item"><Link to="/tool/shed">Toolshed</Link></ListGroup.Item>
                                <ListGroup.Item className="sidebar-list-item"><Link to="/user/feed">Fellow Craftsmen</Link></ListGroup.Item>
                                <ListGroup.Item className="sidebar-list-item"><Link to="/user/requests">Requests</Link></ListGroup.Item>
                                <ListGroup.Item className="sidebar-list-item"><Link to="/user/profile">Profile</Link></ListGroup.Item>
                                <ListGroup.Item className="sidebar-list-item"><Link to="/user/settings">Settings</Link></ListGroup.Item>
                                <ListGroup.Item>
                                    <Link to="/logout"><Button variant="secondary bottom" size="lg" block>Logout</Button></Link>
                                </ListGroup.Item>    
                        </ListGroup>
                        </Card>
                            
                    </Col>
                    <Col sm={8}>
                        <Switch> 
                            <Route exact path="/" component={Dashboard}/>
                            <Route path="/tool/detail" component={ToolDetail}/>
                            <Route path="/tool/search" component={Search}/>
                            <Route path="/tool/add" component={AddTool}/>
                            <Route path="/tool/shed" component={Toolshed}/>
                            <Route path="/project/add" component={AddProject}/>
                            <Route path="/project/list" component={AllProjects}/>
                            <Route path="/user/feed" component={Feed}/>
                            <Route path="/user/profile" component={Profile}/>
                            <Route path="/user/public-page" component={PublicPage}/>
                            <Route path="/user/settings" component={Settings}/>
                            <Route path="/user/requests" component={Requests}/>
                            <Route path="/logout" component={Logout}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home
