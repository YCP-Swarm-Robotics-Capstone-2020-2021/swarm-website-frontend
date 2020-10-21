import React from 'react';
import {Card, Image, ListGroup} from 'react-bootstrap';
import {personalPage} from "../PersonalPage";
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
        contributions: string[] | null,
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

class DevCard extends React.Component<personalPage, developerPage & developer>{
    //Setting the props
    constructor(props: personalPage){
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
                contributions: null
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

    componentDidMount() {
        //Request and set developer based on user passed in as prop
        console.log("Requesting: http://localhost:1337/developer/?page=" + this.props.personalPage.id);
        fetch("http://localhost:1337/developer/?page=" + this.props.personalPage.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(response => response.json())
            .then(data => {
                console.log(data[0]);
                this.setState({
                    developer: {
                        id: data[0]['id'],
                        username: data[0]['username'],
                        password: '',
                        email: data[0]['email'],
                        firstName: data[0]['firstName'],
                        lastName: data[0]['lastName'],
                        teamRole: data[0]['teamRole'],
                        page: data[0]['page']
                    },
                    developerPage: this.state.developerPage,
                })
                //Since this is a developer page request the personal page it from the dev page api on the backend
                fetch('http://localhost:1337/devpersonalpage/' + this.props.personalPage.id,{
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data =>{
                        //console.log("personalPage Data\n" + data);
                        this.setState({
                            developerPage: {
                                id: data['id'],
                                pageType: data['pageType'],
                                pageTitle: data['pageTitle'],
                                expectedGraduationYear: data['expectedGraduationYear'],
                                biography: data['biography'],
                                motivationForWorking: data['motivationForWorking'],
                                contributions: data['contributions']
                            },
                            developer: this.state.developer
                        })
                    })
            });
        //console.log(this.state.developer);

    }


    render(){
        const renderContributions = () => {

            // @ts-ignore, Object is checked to see if it exists before length is tested
            if(this.state.developerPage.contributions != null){

                return <div>
                    <Card.Title id="contributionHeader">Here are some of my contributions</Card.Title>
                    <ListGroup id="contributions" variant="flush">
                        <ListGroup.Item id="devListItem" variant="secondary">
                            <Card.Link className="contributionLink" href="#">My First Contribution</Card.Link>
                        </ListGroup.Item>
                        <ListGroup.Item id="devListItem" variant="secondary">
                            <Card.Link className="contributionLink" href="#">My Second Contribution</Card.Link>
                        </ListGroup.Item>
                    </ListGroup>
                </div>

            }
        }

        return(
            <Card id="profileCard" bg="dark" text="white">
                {/*Currently the src is the logo but will have to be changed to profile pic for engineer/sponsor*/}
                <Image id="profilePic" src={swarmLogo} rounded ></Image>
                <Card.Title id="profileName" >{this.state.developer.firstName} {this.state.developer.lastName}</Card.Title>
                <Card.Text id="gradYear">Graduating in {this.state.developerPage.expectedGraduationYear}</Card.Text>
                <Card.Body>

                    {/*Dev attributes*/}
                    <Card.Title id="devRoleHeader">My role in the project</Card.Title>
                    <Card.Text id="devRole">{this.state.developer.teamRole}</Card.Text>
                    <Card.Title id="bioHeader">My motivation in this project</Card.Title>
                    <Card.Text id="bio">{this.state.developerPage.motivationForWorking}</Card.Text>
                    <Card.Title id="bioHeader">A bit about me</Card.Title>
                    <Card.Text id="bio">{this.state.developerPage.biography}</Card.Text>
                    {/* If contributions is not null display this */}
                    {/* This will also need to be turned into a for loop */}
                    {renderContributions()}
                </Card.Body>
            </Card>
        );
    }
}

export default DevCard