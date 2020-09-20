import React from 'react';
import {Card, Image, ListGroup} from 'react-bootstrap';

import './PersonalPage.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";
import DevCard from "./DevCard/DevCard";
import SponsorCard from "./SponsorCard/SponsorCard";

//Require any images
const logo = require('../../images/swarmLogoIcon.png');

//Get random background image
const background = backgroundImageStyling();

class PersonalPage extends React.Component{
    
    componentDidMount() {
        setTimeout(function (){
            // @ts-ignore, object could possibly be null
            document.getElementById('cardHolder').classList.add('fade-in');
        }, 1)
    }
    
    render() {
        const isDev = false;
        let card;
        if(isDev){
            card = <DevCard/>;
        }else{
            card = <SponsorCard/>;
        }
        return(
            <section style={background}>
                <div id='navbarHolder'>
                    <MainNavbar logo={logo}></MainNavbar>
                </div>
                <div id="cardHolder">
                   {card}
                </div>
            </section>
        );
    }
}

export default PersonalPage;