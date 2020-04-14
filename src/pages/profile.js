import React, { Component } from 'react';
import DefaultLayout from "../layouts/Default";
import {getUser} from "../utils/auth";

class profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            response: 0 ,
            userInfo: {
                displayname: "",
                firstname: "",
                lastname: "",
                phone: "",
                street1:"",
                street2: "",
                lotNo: "",
                unitNo: "",
                city: "",
                pcode: "",
                email: "",
                new_reqs: false,
                friendsNo:0,
                // imgPath: "",
                _id : ""
            }, 
            error:null 
        }
    }

    componentDidMount () {
        debugger
        let temp_user = getUser();
        let temp_user_info = {...this.state.userInfo};
        temp_user_info._id = temp_user._id;
        temp_user_info.street1 = temp_user.address[0].street1
        temp_user_info.street2 = temp_user.address[0].street2
        temp_user_info.lotNo = temp_user.address[0].lotNo
        temp_user_info.unitNo = temp_user.address[0].unitNo
        temp_user_info.city = temp_user.address[0].city
        temp_user_info.pcode = temp_user.address[0].pcode
        temp_user_info.displayname = temp_user.displayname
        temp_user_info.firstname = temp_user.firstname
        temp_user_info.lastname = temp_user.lastname
        temp_user_info.phone = temp_user.phone
        temp_user_info.email = temp_user.email
        temp_user_info.new_reqs = temp_user.new_reqs
        temp_user_info.friendsNo = temp_user.buddies.length

        if (temp_user.images[0]) {
            temp_user_info.imgPath = temp_user.images[0].imgPath
        } else {
            temp_user_info.imgPath = "https://res.cloudinary.com/persia/image/upload/v1586683045/toolshare/Layout/avatar_brcvks.png"
        }

        


        this.setState({userInfo:temp_user_info})
    }

    render() {
        return (
            <DefaultLayout>
                <h1>profile page</h1>
                <div className= "add-form">                  
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="field">
                                <label className="label">Firstname:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="firstname" 
                                        value={this.state.userInfo.firstname} 
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
                                        value={this.state.userInfo.lastname} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Phone number:</label>
                                <div className="control">
                                    <input
                                        className="input" 
                                        type="text" 
                                        name="phone" 
                                        value={this.state.userInfo.phone} 
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
                                        value={this.state.userInfo.street1} 
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
                                        value={this.state.userInfo.lotNo} 
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
                                        value={this.state.userInfo.street2} 
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
                                        value={this.state.userInfo.unitNo} 
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
                                        value={this.state.userInfo.pcode} 
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
                                        value={this.state.userInfo.city} 
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>

                        

                            <input className="button is-link" type="submit" value="Update" />
                        </form>
                        
                    </div>
            </DefaultLayout>

        )
    }
}

export default profile
