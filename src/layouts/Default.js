import React from 'react';
import SidePanel from '../components/side-panel';

function Default(props) {
    return (
        <div>
            <div className="home-page">
                <div id="side-panel">
                    <SidePanel/>
                </div> 
            
                <div className="main-area">
                    {props.children}
                </div>
            </div>
            
        </div>
    )
}

export default Default;
