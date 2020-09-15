import React from 'react';
import {Card, Image, ListGroup} from 'react-bootstrap';

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
                    {/*Currently the src is the logo but will have to be changed to profile pic for engineer/sponsor*/}
                    <Image id="profilePic" src={logo} rounded ></Image>
                    <Card.Title id="profileName" style={{textAlign:"center"}}>Test Testineer</Card.Title>
                    {/*If dev display this */}
                    <Card.Text id="gradYear" style={{textAlign:"center"}}>Graduating 2021 with a degree in Electrical Engineering</Card.Text>
                    <Card.Body>
                        
                        {/*Dev attributes*/}
                        {/* <Card.Title id="bioHeader">Biography</Card.Title>
                        <Card.Text id="bio">I am a fictional student studying Electrical Engineering at YCP.</Card.Text>
                        /* If contributions is not null display this *
                        <Card.Title id="contributionHeader">Here are some of my contributions</Card.Title>
                        <ListGroup id="contributions">
                            <ListGroup.Item variant="Dark">
                                <Card.Link className="contributionLink" href="#">My First Contribution</Card.Link>
                            </ListGroup.Item>
                        </ListGroup> */}

                        {/*Sponsor attributes*/}
                        
                    </Card.Body>
                </Card>
            </section>
        );
    }
}

export default PersonalPage;