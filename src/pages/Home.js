import React, { Component } from 'react';

import DefaultLayout from "../layouts/Default";


class home extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <DefaultLayout>
                
                <div className="columns is-multiline is-tablet">
                    <div className="column is-5">
                        <div className="card home-card">
                            <div className="card-image">
                                <figure className="image is-3by2">
                                    <img className="home-card-img" src="https://res.cloudinary.com/persia/image/upload/v1586649334/toolshare/Layout/find_a_tool_xb9v0q.jpg" alt="find a tool"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media"> 
                                    <div className="media-content">
                                        <p className="title is-4">Find a tool</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-5">
                        <div className="card home-card">
                            <div className="card-image">
                                <figure className="image is-3by2  ">
                                    <img className="home-card-img" src="https://res.cloudinary.com/persia/image/upload/v1586651915/toolshare/Layout/toolbox_kl52cu.jpg" alt="add a tool"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">                               
                                    <div className="media-content">
                                        <p className="title is-4">Add a tool</p>                               
                                    </div>
                                </div>                               
                            </div>
                        </div>
                    </div>
                    <div className="column is-5">
                        <div className="card home-card">
                            <div className="card-image">
                                <figure className="image is-3by2  ">
                                    <img className="home-card-img" src="https://res.cloudinary.com/persia/image/upload/v1586652210/toolshare/Layout/laptop-level-tool_ly0yj6.jpg" alt="start a project"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">Start a project</p>
                                    </div>
                                </div>                               
                            </div>
                        </div>
                    </div>
                    <div className="column is-5">
                        <div className="card home-card">
                            <div className="card-image">
                                <figure className="image is-3by2  ">
                                    <img className="home-card-img" src="https://res.cloudinary.com/persia/image/upload/v1586652702/toolshare/Layout/inspiration_j3kb3y.jpg" alt="get inspired"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">Get inspired</p>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
      
        )
    }
}

export default home
