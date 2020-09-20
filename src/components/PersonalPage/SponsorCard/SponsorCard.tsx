import React from 'react';
import {Card, Image, ListGroup} from 'react-bootstrap';
import "./SponsorCard.css"
const companyLogo = require('../../../images/bd.svg');
const instagramLogo = require('../../../images/socialMediaIcons/Instagram_Glyph_White-2.svg');
const twitterLogo = require('../../../images/socialMediaIcons/Twitter_Social_Icon_Rounded_Square_White.svg');

const swarmLogo = require('../../../images/swarmLogoIcon.png');

/*
    The Sponsor will be passed in as the prop as it provides basic info including id which
    can be used to query the rest of the info needed for the page
*/

interface SponsorPage {
    SponsorPage: {
     //Declaring all props for the component
    companyName: string;
    companyMission: string;
    sponsorReason: string;
    twitterLink: string;
    instagramLink: string;
    }
}

class SponsorCard extends React.Component<{}, SponsorPage>{
    
    // Setting prop values
    constructor(props: SponsorPage){
        super(props);
        this.state ={
            SponsorPage: {
                companyName: "Becton Dickinson",
                companyMission:"We envision a world where our solutions advance healthcare and improve worker and patient safety. To make this world of difference, we leverage who we are as people and what we do as professionals to provide products when and where our customers need them.",
                sponsorReason: "We believe in the future for swarm robotics in the medical field. We see a future in using nanobot swarm technology as an injection into the human to help treat various diseases and injuries.",
                twitterLink: "#",
                instagramLink: "#"
            
        }
        
    };
}
    //TODO write componentDidMount
    //Should make requests for user info

    //TODO Create fetch request to retrieve devpage info
    
    render(){
        return(
        <Card id="profileCard" bg="dark" text="white">
            <Image id="companyPic" src={companyLogo} rounded ></Image>
            <Card.Title id="companyName" style={{textAlign:"center"}}>{this.state.SponsorPage.companyName}</Card.Title>
            <Card.Body>
                 {/*Sponsor attributes*/}
                 <Card.Title id="companyMissionHeader">Our Mission Statement</Card.Title>
                <Card.Text id="companyMission">{this.state.SponsorPage.companyMission}</Card.Text>
                <Card.Title id="sponserReasonHeading">Why we chose to sponsor this project</Card.Title>
                <Card.Text id="sponsorReason">{this.state.SponsorPage.sponsorReason}</Card.Text>
                <Card.Title id="socialMediaHeader">Check us out on social media</Card.Title>
                <ListGroup id="socialMedia" horizontal>
                    <ListGroup.Item id="listItem" variant="secondary" style={{width: "6rem", height: "6rem"}}>
                        <Card.Link className="twitterLink" href={this.state.SponsorPage.twitterLink} ><Card.Img src={twitterLogo}></Card.Img></Card.Link>
                    </ListGroup.Item>
                    <ListGroup.Item id="listItem" variant="secondary" style={{width: "6rem", height: "6rem"}}>
                        <Card.Link className="instagramLink" href={this.state.SponsorPage.instagramLink} ><Card.Img src={instagramLogo} style={{filter: "invert(100%)", backgroundColor: "black", borderRadius: "7px"}}></Card.Img></Card.Link>
                    </ListGroup.Item>
                    
                </ListGroup>
                </Card.Body>
        </Card>
        );
    }
}

export default SponsorCard