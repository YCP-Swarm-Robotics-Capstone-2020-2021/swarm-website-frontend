import React from 'react';
import {Card, Image, ListGroup} from 'react-bootstrap';
import "./DevCard.css"
const logo = require('../../images/swarmLogoIcon.png');



class DevCard extends React.Component{

    render(){
        return(
        <Card id="profileCard" bg="dark" text="white">
            {/*Currently the src is the logo but will have to be changed to profile pic for engineer/sponsor*/}
            <Image id="profilePic" src={logo} rounded ></Image>
            <Card.Title id="profileName" style={{textAlign:"center"}}>Test Testineer</Card.Title>
            {/*If dev display this */}
            <Card.Text id="gradYear" style={{textAlign:"center"}}>Graduating 2021 with a degree in Computer Science</Card.Text>
            <Card.Body>
                
                {/*Dev attributes*/}
                <Card.Title id="devRoleHeader">My role in the project</Card.Title>
                <Card.Text id="devRole">Software Engineer</Card.Text>
                <Card.Title id="bioHeader">Biography</Card.Title>
                <Card.Text id="bio">I am a fictional student studying Computer Science from YCP.</Card.Text>
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