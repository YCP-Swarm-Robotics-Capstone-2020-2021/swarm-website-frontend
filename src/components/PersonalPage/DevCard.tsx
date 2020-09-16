import React from 'react';
import {Card, Image, ListGroup} from 'react-bootstrap';
import "./DevCard.css"
const swarmLogo = require('../../images/swarmLogoIcon.png');



class DevCard extends React.Component{

    render(){
        let profileName = "Test Testineer";
        let gradYear = 2021;
        let degree = "Computer Science";
        let teamRole = "Software Engineer";
        let bio = "I am a fictional student studying Computer Science from YCP.";
        return(
        <Card id="profileCard" bg="dark" text="white">
            {/*Currently the src is the logo but will have to be changed to profile pic for engineer/sponsor*/}
            <Image id="profilePic" src={swarmLogo} rounded ></Image>
        <Card.Title id="profileName" style={{textAlign:"center"}}>{profileName}</Card.Title>
            {/*If dev display this */}
            <Card.Text id="gradYear" style={{textAlign:"center"}}>Graduating in {gradYear} with a degree in {degree}</Card.Text>
            <Card.Body>
                
                {/*Dev attributes*/}
                <Card.Title id="devRoleHeader">My role in the project</Card.Title>
                <Card.Text id="devRole">{teamRole}</Card.Text>
                <Card.Title id="bioHeader">A bit about me</Card.Title>
                <Card.Text id="bio">{bio}</Card.Text>
                {/* If contributions is not null display this */}
                <Card.Title id="contributionHeader">Here are some of my contributions</Card.Title>
                <ListGroup id="contributions" variant="flush">
                    <ListGroup.Item id="listItem" variant="secondary">
                        <Card.Link className="contributionLink" href="#">My First Contribution</Card.Link>
                    </ListGroup.Item>
                    <ListGroup.Item id="listItem" variant="secondary">
                        <Card.Link className="contributionLink" href="#">My Second Contribution</Card.Link>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
        );
    }
}

export default DevCard