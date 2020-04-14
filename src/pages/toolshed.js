import React, { Component } from 'react';
import DefaultLayout from "../layouts/Default";
import {getToolList} from '../utils/userQueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class toolshed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toolList:[] ,
            showedToolList:[]  // must add filtering feature later  
        }
    }
// 
    componentDidMount () {
        getToolList()
        .then((response)=>{
            let temp_tool_list = response ;
            this.setState({toolList:temp_tool_list})  
        })
        
    }

    render() {
        return (
            <DefaultLayout>
                <h1 className="title is-1 page-title">Toolshed</h1>
                <section id="toolshed">
                {this.state.toolList.map((tool)=>{
                    return (

                        <div key={tool._id} className="box">
                            <article className="media">
                                <div className="media-left">
                                <figure className="image is-64x64">
                                    <img src={tool.images[0]&&tool.images[0].imgPath} alt="tool"/>
                                </figure>
                                </div>
                                <div className="media-content">
                                <div className="content tool-card-middle">
                                    <p>
                                    <strong>{tool.name}</strong> <small>{tool.shared ? <span>Shared</span> : <span>Not shared</span>}</small> 
                                    <br/>
                                    {tool.brand}
                                    </p>
                                </div>
                                <nav className="level is-mobile">
                                    <div className="level-left">
                                        <h6 className="level-item" aria-label="reply">
                                            <div class="buttons">
                                                <button class="button is-primary">Primary</button>
                                                <button class="button is-link">Link</button>
                                            </div>
                                        </h6>
                                        <h6 className="level-item" aria-label="retweet">
                                            <span className="icon is-small">
                                            <i className="fas fa-retweet" aria-hidden="true"></i>
                                            </span>
                                        </h6>
                                        <h6 className="level-item" aria-label="like">
                                            <span className="icon is-small">
                                                <FontAwesomeIcon icon="check-square" />
                                            <i className="fas fa-heart" aria-hidden="true"></i>
                                            </span>
                                        </h6>
                                    </div>
                                </nav>
                                </div>
                            </article>
                        </div>

                    )
                })}
                <div className="buttons">
                    <button className="button is-primary"><Link to="/tool/add">Add a tool</Link></button>
                </div>
                </section>
                
            </DefaultLayout>

        )
    }
}

export default toolshed
