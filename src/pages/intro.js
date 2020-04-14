import React from 'react';
import IntroNav from '../components/intro-nav';
import IntroFooter from '../components/intro-footer';

function intro() {
    return (
        <div>
            <IntroNav/>
            <div class="container is-tablet">
                <div class="notification">
                <figure class="image is-128x128">
                    <img src="https://bulma.io/images/placeholders/256x256.png"/>
                </figure>
                    This container is <strong>fullwidth</strong> <em>until</em> the <code>tablet</code> breakpoint.
                </div>
            </div>
            <IntroFooter/>
        </div>
    )
}

export default intro;
