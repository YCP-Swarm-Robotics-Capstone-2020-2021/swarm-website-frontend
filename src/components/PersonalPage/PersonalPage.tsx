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
        id: string,
        pageType: string,
        pageTitle: string
    }
}

interface card {
    card: {
        cardType:  JSX.Element
    }
}

class PersonalPage extends React.Component<RouteComponentProps<{id: string}>, personalPage & card>{
    constructor(props: RouteComponentProps<{id: string}>){
        super(props);
        this.state = {
            personalPage: {
                id: '',
                pageType: '',
                pageTitle: ''
            },
            card: {
                cardType: <DevCard/>,
            }
        }
        this.setCardType = this.setCardType.bind(this);
    }

    componentDidMount() {
        setTimeout(function (){
            // @ts-ignore, object could possibly be null
            document.getElementById('cardHolder').classList.add('fade-in');
        }, 1)

        let id = this.props.match.params.id;
        fetch("http://localhost:8000/personalpage/"+id+'/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    personalPage: {
                        id: data['id'],
                        pageType: data['pageType'],
                        pageTitle: data['pageTitles']
                    }
                })
                this.setCardType();
            });        
    }

    setCardType(){
        if(this.state.personalPage.pageType === "Developer"){
            console.log("Dev");
            this.setState({
                card: {
                    cardType: <DevCard/>
                }
            })
        }else if(this.state.personalPage.pageType === "Sponsor"){
            this.setState({
                card: {
                    cardType: <SponsorCard/>
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