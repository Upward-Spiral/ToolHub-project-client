import React from 'react';
import SidePanel from '../components/side-panel';

function Default(props) {
    return (

            <div className="home-page">
                <div >
                    <SidePanel/>
                </div> 
            
                <div className="main-area">
                    {props.children}
                </div>
            </div>
            
    )
}

export default Default;
