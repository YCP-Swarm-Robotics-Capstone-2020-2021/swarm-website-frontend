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
    componentDidMount() {
        // @ts-ignore, object could possibly be null
        document.getElementsByTagName("BODY")[0].classList.add('pageBody');

        setTimeout(function (){
            // @ts-ignore, object could possibly be null
            document.getElementById('cardHolder').classList.add('fade-in');
        }, 1)
    }
    
    render() {
        return(
            <section className="pageBody" style={background}>
                <div id='navbarHolder'>
                    <MainNavbar logo={logo}></MainNavbar>
                </div>
                <div id="cardHolder">
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
                            </ListGroup>  */}

                            {/*Sponsor attributes*/}
                            <Card.Title id="companyMissionHeader">Our Mission Statement</Card.Title>
                            <Card.Text id="companyMission">We envision a world where our solutions advance healthcare and improve worker and patient safety. To make this world of difference, we leverage who we are as people and what we do as professionals to provide products when and where our customers need them.</Card.Text>
                            <Card.Title id="sponserReasonHeading">Why we chose to sponsor this project</Card.Title>
                            <Card.Text id="sponsorReason">We believe in the future for swarm robotics in the medical field. We see a future in using nanobot swarm injected into the human to help treat various diseases and injuries.</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </section>
        );
    }
}

export default PersonalPage;