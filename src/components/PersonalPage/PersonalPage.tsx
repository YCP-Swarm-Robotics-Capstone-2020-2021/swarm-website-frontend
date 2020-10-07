import React from 'react';

import {RouteComponentProps} from "react-router";

import './PersonalPage.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";
import DevCard from "./DevCard/DevCard";
import SponsorCard from "./SponsorCard/SponsorCard";

//Require any images
// @ts-ignore, it doesn't like require
const logo = require('../../images/swarmLogoIcon.png');

//Get random background image
const background = backgroundImageStyling();

interface personalPageProps extends RouteComponentProps<{id: string}> {}


//Define personal page interface to be used with state
export interface personalPage {
    personalPage: {
        id: string,
        pageType: string,
        pageTitle: string
    }
}

//Define card interface to be used with state
interface card {
    card: {
        cardType:  JSX.Element | null
    }
}

class PersonalPage extends React.Component<RouteComponentProps<{id: string}>, personalPage & card>{
    constructor(props: RouteComponentProps<{id: string}>){
        super(props);
        //Initialize state and fields to empty
        this.state = {
            personalPage: {
                id: '',
                pageType: '',
                pageTitle: ''
            },
            card: {
                cardType: null,
            },

        }
        //Bind card type function
        this.setCardType = this.setCardType.bind(this);
    }

    componentDidMount() {
        setTimeout(function (){
            // @ts-ignore, object could possibly be null
            document.getElementById('cardHolder').classList.add('fade-in');
        }, 1)

        //Create request for personalpage information using parameter id
        let pageID = this.props.match.params.id;
        console.log("Page id: " + pageID);
        fetch("http://localhost:8000/personalpage/"+pageID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            //Parse response into json
            .then(response => response.json())
            //Set state using json data
            .then(data => {
                console.log(data);
                this.setState({
                    personalPage: {
                        id: data['id'],
                        pageType: data['pageType'],
                        pageTitle: data['pageTitle']
                    },
                });
                console.log("Page type: " + this.state.personalPage.pageType)

                this.setCardType();
            });



    }

    //Function to set the card type based on the type of the page
    setCardType(){
        //If page type is developer create set card to developer
        if(this.state.personalPage.pageType === "Developer"){
            console.log('Creating Developer Card');
            this.setState({
                card: {
                    cardType: <DevCard personalPage={this.state.personalPage} />
                }
            })
        }else if(this.state.personalPage.pageType === "Sponsor"){
            console.log('Creating Sponsor Card');
            this.setState({
                card: {
                    cardType: <SponsorCard personalPage={this.state.personalPage}/>
                }
            })
        }
    }
    
    render() {

        return(
            <section style={background}>
                <div id='navbarHolder'>
                    <MainNavbar logo={logo}></MainNavbar>
                </div>
                <div id="cardHolder">
                   {this.state.card.cardType}
                </div>
            </section>
        );
    }
}

export default PersonalPage;