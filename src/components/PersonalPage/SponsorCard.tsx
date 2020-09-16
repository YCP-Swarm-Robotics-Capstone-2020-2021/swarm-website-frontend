import React from 'react';
import {Card, Image, ListGroup} from 'react-bootstrap';
import "./SponsorCard.css"
const logo = require('../../images/swarmLogoIcon.png');

class SponsorCard extends React.Component{

    render(){
        return(
        <Card id="profileCard" bg="dark" text="white">
            <Image id="companyPic" src={logo} rounded ></Image>
            <Card.Title id="companyName" style={{textAlign:"center"}}>Beckton Dickinson</Card.Title>
            <Card.Body>
                 {/*Sponsor attributes*/}
                 <Card.Title id="companyMissionHeader">Our Mission Statement</Card.Title>
                <Card.Text id="companyMission">We envision a world where our solutions advance healthcare and improve worker and patient safety. To make this world of difference, we leverage who we are as people and what we do as professionals to provide products when and where our customers need them.</Card.Text>
                <Card.Title id="sponserReasonHeading">Why we chose to sponsor this project</Card.Title>
                <Card.Text id="sponsorReason">We believe in the future for swarm robotics in the medical field. We see a future in using nanobot swarm technology as an injection into the human to help treat various diseases and injuries.</Card.Text>
                <Card.Title id="socialMediaHeader">Check us out on social media</Card.Title>
                <ListGroup id="socialMedia" horizontal>
                    <ListGroup.Item id="listItem" variant="secondary" style={{width: "6rem", height: "6rem"}}>
                        <Card.Link className="contributionLink" href="#" ><Card.Img src={logo}></Card.Img></Card.Link>
                    </ListGroup.Item>
                    <ListGroup.Item id="listItem" variant="secondary" style={{width: "6rem", height: "6rem"}}>
                        <Card.Link className="contributionLink" href="#" ><Card.Img src={logo}></Card.Img></Card.Link>
                    </ListGroup.Item>
                    
                </ListGroup>
                </Card.Body>
        </Card>
        );
    }
}

export default SponsorCard