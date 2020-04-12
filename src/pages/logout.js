import React, { Component } from 'react';

import {logout} from "../utils/userQueries";

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

               <h1>Logging out ...</h1> 
            </div>
        )
    }
}

export default Logout