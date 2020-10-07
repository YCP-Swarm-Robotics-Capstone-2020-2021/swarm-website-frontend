import React from 'react';
import {Card, Image, ListGroup} from 'react-bootstrap';
import {personalPage} from "../PersonalPage";
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
        id: string,
        pageType: string,
        pageTitle: string,
        companyMission: string,
        sponsorReason: string,
        companyLink: string,
        twitterLink: string,
        instagramLink: string,
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


class SponsorCard extends React.Component<personalPage, sponsorPage & sponsor>{
    constructor(props: personalPage){
        super(props);
        this.state = {
            sponsorPage: {
                id: '',
                pageType: '',
                pageTitle: '',
                companyMission:'',
                sponsorReason: '',
                companyLink: '',
                twitterLink: 'https://twitter.com/BDandCo',
                instagramLink: '#'

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

    componentDidMount() {
        //Should make requests for sponsor info
        console.log('http://localhost:8000/sponsor/?page=' + this.props.personalPage.id);
        fetch('http://localhost:8000/sponsor/?page=' + this.props.personalPage.id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data[0]);
                this.setState({
                    sponsor: {
                        id: data[0]['id'],
                        username: data[0]['username'],
                        password: null,
                        email: data['email'],
                        firstName: data[0]['firstName'],
                        lastName: data[0]['lastName'],
                        companyName: data[0]['companyName'],
                        page: data[0]['page']
                    }
                })
                //TODO request sponsor page details
                fetch('http://localhost:8000/sponsorpersonalpage/?page=' + this.props.personalPage.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        this.setState({
                            sponsorPage: {
                                id: data[0]['id'],
                                pageType: data[0]['pageType'],
                                pageTitle: data[0]['pageTitle'],
                                companyMission: data[0]['missionStatement'],
                                sponsorReason: data[0]['reasonForSponsorship'],
                                companyLink: data[0]['companyLink'],
                                twitterLink: 'https://twitter.com/BDandCo',
                                instagramLink: '#'

                            }
                        })
                    })
            });


    }



    //TODO Create fetch request to retrieve devpage info
    
    render(){
        return(
        <Card id="profileCard" bg="dark" text="white">
            <Image id="companyPic" src={companyLogo} rounded ></Image>
            <Card.Title id="companyName">{this.state.sponsor.companyName}</Card.Title>
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