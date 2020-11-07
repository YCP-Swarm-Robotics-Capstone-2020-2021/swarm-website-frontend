import React from 'react';

import './HomePage.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";
import { Button } from 'react-bootstrap';
import {RouteComponentProps} from "react-router-dom";
import verifyUserIsLoggedIn from "../../utils/verifiyUserIsLoggedIn/verifyLoggedIn";

//require any images
const logo = require('../../images/swarmLogoIcon.png');

const background = backgroundImageStyling();

interface HomeProps extends  RouteComponentProps<{}>{}

interface HomeState{
    loggedIn: boolean
}

class HomePage extends React.Component<HomeProps, HomeState>{

    constructor(props: HomeProps) {
        super(props);

        verifyUserIsLoggedIn().then((value => {
            if(value){
                props.history.push('/');
            }
        })).catch((error) => {
           console.log("There was a problem loading the page: " + error);
        });

        this.state = {
            loggedIn: true
        }

    }

    render(){
        if(!this.state.loggedIn){
            return <div />
        }

        return(
            <section style={background}>
                <MainNavbar logo={logo}/>

                <div id={'missionStatement'}>
                    <div >
                        <h1 className={'fontLarge'}>Automation</h1>
                        <h1 className={'fontLarge'}>Execution</h1>
                        <h3 className={'fontMedium'}>For Controlled Environments</h3>
                    </div>
                    <div id={'missionStatementButton'}>
                        <Button id={'visualizationRedirectButton'}>Visualization</Button>{' '}
                    </div>
                </div>


            </section>
        );
    }
}
export default HomePage