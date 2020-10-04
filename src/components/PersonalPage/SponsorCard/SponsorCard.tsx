import React from 'react';
import {Card, Image, ListGroup} from 'react-bootstrap';
import {userProps, personalPage} from "../PersonalPage";
import "./SponsorCard.css"
// @ts-ignore, it doesn't like require
const companyLogo = require('../../../images/bd.svg');
// @ts-ignore, it doesn't like require
const instagramLogo = require('../../../images/socialMediaIcons/Instagram_Glyph_White-2.svg');
// @ts-ignore, it doesn't like require
const twitterLogo = require('../../../images/socialMediaIcons/Twitter_Social_Icon_Rounded_Square_White.svg');

// @ts-ignore, it doesn't like require
const swarmLogo = require('../../../images/swarmLogoIcon.png');

interface sponsorPage {
    sponsorPage: {
    companyName: string;
    companyMission: string;
    sponsorReason: string;
    twitterLink: string;
    instagramLink: string;
    }
}

interface sponsor {
    sponsor: {
        id: string,
        username: string,
        password?: string | null,
        email: string,
        firstName: string,
        lastName: string,
        companyName: string,
        page: string
    }
}


class SponsorCard extends React.Component<userProps & personalPage, sponsorPage & sponsor>{
    constructor(props: personalPage & userProps){
        super(props);
        this.state = {
            sponsorPage: {
                companyName: "",
                companyMission:"",
                sponsorReason: "",
                twitterLink: "#",
                instagramLink: "#"
            
            },

            sponsor: {
                id: '',
                username: '',
                password: null,
                email: '',
                firstName: '',
                lastName: '',
                companyName: '',
                page: ''

            }

        
    };
}
    //TODO write componentDidMount
    onComponentDidMount() {
        //Should make requests for sponsor info
        let sponsorID = this.props.user.id;
        fetch('http://localhost:8000/sponsor/' + sponsorID + '/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    sponsor: {
                        id: data['id'],
                        username: data['username'],
                        password: null,
                        email: data['email'],
                        firstName: data['firstName'],
                        lastName: data['lastName'],
                        companyName: data['companyName'],
                        page: data['page']
                    }
                })
            })

        //TODO request sponsor page details
    }



    //TODO Create fetch request to retrieve devpage info
    
    render(){
        return(
        <Card id="profileCard" bg="dark" text="white">
            <Image id="companyPic" src={companyLogo} rounded ></Image>
            <Card.Title id="companyName">{this.state.sponsorPage.companyName}</Card.Title>
            <Card.Body>
                 {/*Sponsor attributes*/}
                 <Card.Title id="companyMissionHeader">Our Mission Statement</Card.Title>
                <Card.Text id="companyMission">{this.state.sponsorPage.companyMission}</Card.Text>
                <Card.Title id="sponserReasonHeading">Why we chose to sponsor this project</Card.Title>
                <Card.Text id="sponsorReason">{this.state.sponsorPage.sponsorReason}</Card.Text>
                <Card.Title id="socialMediaHeader">Check us out on social media</Card.Title>
                <ListGroup id="socialMedia" horizontal>
                    <ListGroup.Item id="sponsorListItem" variant="secondary">
                        <Card.Link id="socialMediaLink" href={this.state.sponsorPage.twitterLink} >
                            <Card.Img id="twitterIcon" src={twitterLogo}></Card.Img>
                        </Card.Link>
                    </ListGroup.Item>
                    <ListGroup.Item id="sponsorListItem" variant="secondary">
                        <Card.Link id="socialMediaLink" href={this.state.sponsorPage.instagramLink} >
                            <Card.Img id="instagramIcon" src={instagramLogo}></Card.Img>
                        </Card.Link>
                    </ListGroup.Item>
                    
                </ListGroup>
                </Card.Body>
        </Card>
        );
    }
}

export default SponsorCard