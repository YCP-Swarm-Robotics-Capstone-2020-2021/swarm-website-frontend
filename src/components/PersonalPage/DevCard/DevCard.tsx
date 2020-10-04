import React from 'react';
import {Card, Image, ListGroup} from 'react-bootstrap';
import {userProps, personalPage} from "../PersonalPage";
import "./DevCard.css"
// @ts-ignore, it doesn't like require
const swarmLogo = require('../../../images/swarmLogoIcon.png');

//Define the DevPage item
interface developerPage{
    developerPage: {
        id: string,
        pageType: string,
        pageTitle: string,
        expectedGraduationYear: string,
        biography: string,
        motivationForWorking: string,
        bio : string
    }    
}

interface developer {
    developer: {
        id: string,
        username: string,
        password: string | null,
        email: string,
        firstName: string,
        lastName: string,
        teamRole: string,
        page: string
    }
}

// interface personalPageProps {
//     personalPage: {
//         id: string,
//         pageType: string,
//         pageTitle: string
//     }
// }

// interface userProps {
//     userProps: {
//         id: string,
//         username: string,
//         password?: string | null,
//         email: string,
//         firstName: string,
//         lastName: string,
//     }
// }


class DevCard extends React.Component<personalPage & userProps, developerPage & developer>{
    //Setting the props
    constructor(props: personalPage & userProps){
        super(props);
        this.state = {
            //Initialize state for interfaces
            developerPage: {
                id: "",
                pageType: "",
                pageTitle: "",
                expectedGraduationYear: "",
                biography: "",
                motivationForWorking: "",
                bio : ""
            },

            developer: {
                id: "",
                username: "",
                password: null,
                email: "",
                firstName: "",
                lastName: "",
                teamRole: "",
                page: ""
            }
        }
        
    }
    onComponentDidMount() {
        //Request and set developer based on user passed in as prop
        let developerID = this.props.user.id;
        fetch("http://localhost:8000/developer/"+developerID+'/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    developer: {
                        id: data['id'],
                        username: data['username'],
                        password: data['password'],
                        email: data['email'],
                        firstName: data['firstName'],
                        lastName: data['lastName'],
                        teamRole: data['teamRole'],
                        page: data['page']
                    }
                })

            });
        //Since this is a developer page request the personal page it from the dev page api on the backend
        let personalPageID = this.props.personalPage.id;
        fetch('http://localhost:8000/devpersonalpage/' + personalPageID + '/',{
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    developerPage: {
                        id: data['id'],
                        pageType: data['pageType'],
                        pageTitle: data['pageTitle'],
                        expectedGraduationYear: data['expectedGraduationYear'],
                        biography: data['biography'],
                        motivationForWorking: data['motivationForWorking'],
                        bio : data['bio']
                    }
                })
            })
    }


    render(){
        return(
        <Card id="profileCard" bg="dark" text="white">
            {/*Currently the src is the logo but will have to be changed to profile pic for engineer/sponsor*/}
            <Image id="profilePic" src={swarmLogo} rounded ></Image>
            <Card.Title id="profileName" style={{textAlign:"center"}}>{this.state.developer.firstName}{this.state.developer.lastName}</Card.Title>
            <Card.Text id="gradYear" style={{textAlign:"center"}}>Graduating in {this.state.developerPage.expectedGraduationYear}</Card.Text>
            <Card.Body>
                
                {/*Dev attributes*/}
                <Card.Title id="devRoleHeader">My role in the project</Card.Title>
                <Card.Text id="devRole">{this.state.developer.teamRole}</Card.Text>
                <Card.Title id="bioHeader">My motivation in this project</Card.Title>
                <Card.Text id="bio">{this.state.developerPage.motivationForWorking}</Card.Text>
                <Card.Title id="bioHeader">A bit about me</Card.Title>
                <Card.Text id="bio">{this.state.developerPage.bio}</Card.Text>
                {/* If contributions is not null display this */}
                {/* This will also need to be turned into a for loop */}
                <Card.Title id="contributionHeader">Here are some of my contributions</Card.Title>
                <ListGroup id="contributions" variant="flush">
                    <ListGroup.Item id="devListItem" variant="secondary">
                        <Card.Link className="contributionLink" href="#">My First Contribution</Card.Link>
                    </ListGroup.Item>
                    <ListGroup.Item id="devListItem" variant="secondary">
                        <Card.Link className="contributionLink" href="#">My Second Contribution</Card.Link>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
        );
    }
}

export default DevCard