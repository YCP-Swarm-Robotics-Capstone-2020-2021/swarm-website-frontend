import React from 'react';

import './EntryMenu.css';

class EntryMenu extends React.Component{
    render(){
        return(
            <div id='entryMenu'>
                <div id='menuWikiTitle'>
                    <h1>Simulation and Algorithm Design</h1>
                </div>
                <hr></hr>
                <div id='menuEntries'>
                    <ul id='entryList'>
                        <li>Design</li>
                        <li>Requirements</li>
                        <li>1st Milestone</li>
                        <li>2nd Milestone</li>
                        <li>Final Milestone</li>
                        <li>Technical Report that was hard</li>
                    </ul>
                </div>
                <div id='lastUpdated'>
                    <h4>Last Updated:</h4>
                    <h4>9/7/2020</h4>
                </div>
            </div>
        );
    }
}

export default EntryMenu