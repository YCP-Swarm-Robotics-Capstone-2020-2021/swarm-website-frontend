import React from 'react';
import {Card, Image, ListGroup} from 'react-bootstrap';
import "./DevCard.css"
const swarmLogo = require('../../../images/swarmLogoIcon.png');

/*
    User will be the prop for this component, passed in from the personal page component.
    This will provide the user info, and provide necessary info the query the info the dev page. ie username/id
*/
interface DevPage{
    DevPage: {
        profileName: string,
        gradYear: string,
        degree: string,
        teamRole: string,
        bio : string
    }    
}


class DevCard extends React.Component<{}, DevPage>{
    //Setting the props
    constructor(props: DevPage){
        super(props);
        this.state = {
            DevPage: {
                profileName: "Test Testineer",
                gradYear: "2021",
                degree: "Computer Science",
                teamRole: "Software Engineer",
                bio: "I am a fictional student studying Computer Science at YCP" 
            }
        }
        
    }
    //TODO write componentDidMount
    //Should make requests for user info

    //TODO Create fetch request to retrieve devpage info
    render(){
        return(
        <Card id="profileCard" bg="dark" text="white">
            {/*Currently the src is the logo but will have to be changed to profile pic for engineer/sponsor*/}
            <Image id="profilePic" src={swarmLogo} rounded ></Image>
            <Card.Title id="profileName" style={{textAlign:"center"}}>{this.state.DevPage.profileName}</Card.Title>
            <Card.Text id="gradYear" style={{textAlign:"center"}}>Graduating in {this.state.DevPage.gradYear} with a degree in {this.state.DevPage.degree}</Card.Text>
            <Card.Body>
                
                {/*Dev attributes*/}
                <Card.Title id="devRoleHeader">My role in the project</Card.Title>
                <Card.Text id="devRole">{this.state.DevPage.teamRole}</Card.Text>
                <Card.Title id="bioHeader">A bit about me</Card.Title>
                <Card.Text id="bio">{this.state.DevPage.bio}</Card.Text>
                {/* If contributions is not null display this */}
                {/* This will also need to be turned into a for loop */}
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