import React from 'react';

import './PersonalPage.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";
import DevCard from "./DevCard/DevCard";
import SponsorCard from "./SponsorCard/SponsorCard";
import verifyUserIsLoggedIn from "../../utils/verifiyUserIsLoggedIn/verifyLoggedIn";
import {RouteComponentProps} from "react-router-dom";

//Require any images
const logo = require('../../images/swarmLogoIcon.png');

//Get random background image
const background = backgroundImageStyling();
interface PersonalPageProps extends  RouteComponentProps<{}>{}

class PersonalPage extends React.Component<PersonalPageProps, {}>{

    constructor(props: any){
        super(props);
        verifyUserIsLoggedIn().then((value => {
            if(value){
                props.history.push('/');
            }
        })).catch((error) => {
            console.log("There was a problem loading the page: " + error);
        });

    }


    componentDidMount() {
        setTimeout(function (){
            // @ts-ignore, object could possibly be null
            document.getElementById('cardHolder').classList.add('fade-in');
        }, 1)
    }

    render() {
        const isDev = true;
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