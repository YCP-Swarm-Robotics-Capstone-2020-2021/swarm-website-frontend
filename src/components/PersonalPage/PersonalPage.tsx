import React from 'react';
import {RouteComponentProps} from "react-router";

import './PersonalPage.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";
import DevCard from "./DevCard/DevCard";
import SponsorCard from "./SponsorCard/SponsorCard";

//Require any images
const logo = require('../../images/swarmLogoIcon.png');

//Get random background image
const background = backgroundImageStyling();

interface personalPageProps extends RouteComponentProps<{id: string}> {}

interface personalPage {
    personalPage: {
        pageType: string,
        pageTitle: string
    }
    
}

class PersonalPage extends React.Component<RouteComponentProps<{id: string}>, personalPage>{
    constructor(props: RouteComponentProps<{id: string}>){
        super(props);
        this.state = {
            personalPage: {
                pageType: '',
                pageTitle: ''
            }
        }
    }

    componentDidMount() {
        setTimeout(function (){
            // @ts-ignore, object could possibly be null
            document.getElementById('cardHolder').classList.add('fade-in');
        }, 1)

        let id = this.props.match.params.id;
        fetch("http://localhost:8000/personalpage/"+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    personalPage: {
                        pageType: data.pageType,
                        pageTitle: data.pageTitle
                    }
                })
            });

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