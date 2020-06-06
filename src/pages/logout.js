import React, { Component } from 'react';

import {logout} from "../utils/userQueries";
import { Container, Alert } from 'react-bootstrap';

class Logout extends Component {
    constructor() {
        super()

        this.state = {
            response: "",
            error:null
        }
    }

    componentDidMount() {
        // debugger
        logout()
        .then(response => {
            console.log(response)
            this.setState({
                response: response.data.messageBody, 
                error:null}, 
                ()=> {
                    this.props.history.push("/")
                }
            )
        })
        .catch((error)=> {
            console.log(error);
            this.setState({error: error})
        });
        
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Alert variant="primary" className="logout-alert">Logging out ...</Alert>
                </Container>
            </div>
        )
    }
}

export default Logout