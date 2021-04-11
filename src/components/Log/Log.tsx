import React from 'react';

import './Log.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";
import {ListGroup, Card} from "react-bootstrap";

const logo = require('../../images/swarmLogoIcon.png');

const background = backgroundImageStyling();

interface LogProps{

}

interface LogState{

}

class Log extends React.Component<LogProps, LogState>{
    
    constructor(props: LogProps) {
        super(props);
    }

    render(){
        return(
            <section style={background}>
                <MainNavbar logo={logo}/>
                    <Card id="card" bg="dark" text="white">
                        <ListGroup horizontal>
                            <ListGroup.Item id="topRow" variant="dark">Device ID</ListGroup.Item>
                            <ListGroup.Item id="topRow" variant="dark">Date</ListGroup.Item>
                            <ListGroup.Item id="topRow" variant="dark">Time</ListGroup.Item>
                        </ListGroup>
                    </Card>
            </section>
        )
    }
}

export default Log