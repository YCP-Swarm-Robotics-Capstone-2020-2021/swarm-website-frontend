import React from 'react';
import {Card} from 'react-bootstrap';

import './PersonalPage.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";

//Require any images
const logo = require('../../images/swarmLogoIcon.png');

//Get random background image
const background = backgroundImageStyling();

class PersonalPage extends React.Component {

    render() {
        return(
            <section id="pageBody" style={background}>
                <div id='navbarHolder'>
                    <MainNavbar logo={logo}></MainNavbar>
                </div>
                <Card id="profileCard" bg="dark" text="white">
                    <Card.Img id="profilePic" variant="top" src={logo}></Card.Img>
                    <Card.Body>
                        <Card.Title id="engineerName">Engineer Name Here</Card.Title>
                    </Card.Body>
                </Card>
            </section>
        );
    }
}

export default PersonalPage;