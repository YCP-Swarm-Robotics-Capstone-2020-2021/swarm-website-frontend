import React from 'react';

import './WikiLanding.css';

class WikiLanding extends React.Component{
    render(){
        return(
            <div>
                <div id="statDiv">
                    <h1>This wiki has</h1>
                    <ul id="statList">
                        <li>8 entries</li>
                        <li>3 contributors</li>
                        <li>26 comments</li>
                        <li>12 images</li>
                    </ul>
                </div>
                <div id="graphDiv">
                    <h4>Graph of activity over time?</h4>
                </div>
            </div>
        );
    }
}

export default WikiLanding