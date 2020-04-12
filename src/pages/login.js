import React, { Component } from 'react';
import {login} from "../utils/auth";


class Login extends Component {
    constructor() {
        super()

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            response: 0 ,
            loginData: {
                username:"",  
                password : "", 
            }, 
            newUser:{},
            error: null   
        }
    }

    handleInputChange (event) {
        // debugger
        let temp_user = {...this.state.loginData};
        temp_user[event.target.name] = event.target.value;
        this.setState({loginData:temp_user})
    }

    handleFormSubmit(event) {
        event.preventDefault();
        debugger
        login(this.state.loginData)
        .then((response) => {
            if (response.status===201) {
                this.setState({error:null}, ()=>{
                    this.props.history.push({
                        pathname:`/user/home`
                    })
                })
            } else {
                this.setState({error:response.data.messageBody}, ()=>{
                    this.props.history.push({
                        pathname:`/login`
                    })
                })
            }
            
            
        })
        .catch((error)=> {
            console.log(error);
            this.setState({error: error})
        });
    }

    render() {
            return (          
                <div>
                    {this.state.error ?
                        <div>
                            <h6>Something went wrong!</h6>
                            {/* <h6>{this.state.error}</h6> */}
                        </div>:
                        ""     
                    }
                    <div className= "add-form">                  
                        <form onSubmit={this.handleFormSubmit}>

                            <div className="field">
                                <label className="label">Username:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="username" 
                                        required
                                        value={this.state.loginData.username} 
                                        onChange={this.handleInputChange}/>  {/* the handler gets the event object by default */}
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Password:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="password" 
                                        name="password" 
                                        required
                                        value={this.state.loginData.password} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                            <input className="button is-link" type="submit" value="Login" />
                        </form>
                        
                    </div>
                </div>
            )
        // }
        
  
    }
}

export default Login;
