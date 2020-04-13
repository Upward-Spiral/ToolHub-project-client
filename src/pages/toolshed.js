import React, { Component } from 'react';
import DefaultLayout from "../layouts/Default";
import {getToolList} from '../utils/userQueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class toolshed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toolList:[]     
        }
    }

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
                <section id="toolshed">
                {this.state.toolList.map((tool)=>{
                    return (

                        <div key={tool.name} className="box">
                            <article className="media">
                                <div className="media-left">
                                <figure className="image is-64x64">
                                    <img src={tool.images[0]&&tool.images[0].imgPath} alt="tool"/>
                                </figure>
                                </div>
                                <div className="media-content">
                                <div className="content">
                                    <p>
                                    <strong>{tool.name}</strong> <small>@johnsmith</small> <small>31m</small>
                                    <br/>
                                    {tool.description}
                                    </p>
                                </div>
                                <nav className="level is-mobile">
                                    <div className="level-left">
                                    <h6 className="level-item" aria-label="reply">
                                        <span className="icon is-small">
                                        <i className="fas fa-reply" aria-hidden="true"></i>
                                        </span>
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
                </section>
            </DefaultLayout>

        )
    }
}

export default toolshed
