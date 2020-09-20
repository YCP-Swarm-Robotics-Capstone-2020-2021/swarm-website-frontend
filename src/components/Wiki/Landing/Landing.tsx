import React from 'react';

import {Card} from 'react-bootstrap';

import './Landing.css';

class Landing extends React.Component{
    render(){
        return(
            <div id="wikiLanding">
                <Card bg="dark" text="white">
                    <Card.Body>
                        <Card.Title>This wiki has...</Card.Title>
                        <ul id="statList">
                            <li>8 entries</li>
                            <li>3 contributors</li>
                            <li>26 comments</li>
                            <li>12 images</li>
                        </ul>
                    </Card.Body>
                    <div id="graph">
                        <p>Graph of activity over time?</p>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Landing