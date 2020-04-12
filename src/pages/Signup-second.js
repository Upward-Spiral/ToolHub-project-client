import React, { Component } from 'react';
import {signupSecond} from "../utils/auth";
import {getTempUserId} from "../utils/auth";

class SignupSecond extends Component {
    constructor() {
        super()

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            response: 0 ,
            tempUserInfo: {
                firstname: "",
                lastname: "",
                phone: "",
                street1:"",
                street2: "",
                lotNo: "",
                unitNo: "",
                city: "",
                pcode: "",
                // email: "",
                _id : ""
            }, 
            error:null   
        }
    }

    handleInputChange (event) {
        // debugger
        let temp_user = {...this.state.tempUserInfo};
        temp_user[event.target.name] = event.target.value;
        this.setState({tempUserInfo:temp_user})
    }

    handleFormSubmit(event) {
       event.preventDefault();
        debugger
        signupSecond(this.state.tempUserInfo)
        .then((response) => {
            if (response.status===200) {
                this.setState({error:null}, ()=>{
                    this.props.history.push({
                        pathname:`/signup-confirm`
                    })
                })
            } else {
                console.log(response);
            }
            
            
        })
        .catch((error)=> {
            console.log(error.response);
            this.setState({error: error.response && error.response.data})
        });
    }

    componentDidMount () {
        // debugger
        let temp_user_info = {...this.state.tempUserInfo};
        temp_user_info._id = getTempUserId() ;
        this.setState({tempUserInfo:temp_user_info})
    }

    render() {
            return (          
                <div>

                    <div className= "add-form">                  
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="field">
                                <label className="label">Firstname:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="firstname" 
                                        value={this.state.tempUserInfo.firstname} 
                                        onChange={this.handleInputChange}/>   {/* the handler gets the event object by default */}
                                </div>
                            </div>
                            
                            
                            <div className="field">
                                <label className="label">Lastname:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="lastname" 
                                        value={this.state.tempUserInfo.lastname} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>
{/*                             
                            <div className="field">
                                <label className="label">Email:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="email" 
                                        name="email" 
                                        value={this.state.tempUserInfo.email} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div> */}

                            <div className="field">
                                <label className="label">Phone number:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="phone" 
                                        value={this.state.tempUserInfo.phone} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Street (Address line 1):</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="street1" 
                                        value={this.state.tempUserInfo.street1} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Buildin/House number:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="lotNo" 
                                        value={this.state.tempUserInfo.lotNo} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Street (Address line 2):</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="street2" 
                                        value={this.state.tempUserInfo.street2} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Unit/Apartment number:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="unitNo" 
                                        value={this.state.tempUserInfo.unitNo} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">pcode:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="pcode" 
                                        value={this.state.tempUserInfo.pcode} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">City:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="city" 
                                        value={this.state.tempUserInfo.city} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                        

                            <input className="button is-link" type="submit" value="Signup" />
                        </form>
                        
                    </div>
                </div>
            )
        // }
        
  
    }
}

export default SignupSecond
