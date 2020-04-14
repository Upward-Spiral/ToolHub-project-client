import React, { Component } from 'react';
import {signup} from "../utils/auth";
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor() {
        super()

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            response: 0 ,
            tempUser: {
                username:"",
                displayname  : "",  
                email : "",
                password : "",   
                password_check : "",
                
            }, 
            error:null   
        }
    }

    handleInputChange (event) {
        // debugger
        let temp_user = {...this.state.tempUser};
        temp_user[event.target.name] = event.target.value;
        this.setState({tempUser:temp_user})
    }

    handleFormSubmit(event) {
       event.preventDefault();
        debugger
        signup(this.state.tempUser)
        .then((response) => {
            if (response.status===200) {
                this.setState({error:null}, ()=>{
                    this.props.history.push({
                        pathname:`/signup-second`
                    })
                })
            } else  {
                this.setState({error:response})
                console.log(response)
            }
            
            
        })
        .catch((error)=> {
            console.log(error.response);
            this.setState({error: error.response && error.response.data})
        });
    }


    render() {
            return (          
                <div>
                   
                    <div className= "signup-form"> 
                    <h1 class="title is-1 page-title">Signup</h1>  
                    <h4 class="title is-4">Page 1 of 2</h4>               
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="field">
                                <label className="label">Username:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="username" 
                                        value={this.state.tempUser.username} 
                                        onChange={this.handleInputChange}/>   {/* the handler gets the event object by default */}
                                </div>
                            </div>
                            
                            
                            <div className="field">
                                <label className="label">Displayname:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="displayname" 
                                        value={this.state.tempUser.displayname} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            
                            <div className="field">
                                <label className="label">Email:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="email" 
                                        name="email" 
                                        value={this.state.tempUser.email} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Password:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="password" 
                                        name="password" 
                                        value={this.state.tempUser.password} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Repeat Password:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="password" 
                                        name="password_check" 
                                        value={this.state.tempUser.password_check} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="btn-group">
                                <input className="button is-link" type="submit" value="Next" />
                                <button class="button is-light back-btn"><Link to="/">Back</Link></button>
                            </div>
                            
                        </form>
                        
                    </div>
                </div>
            )
        // }
        
  
    }
}


export default Signup;
