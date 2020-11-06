import React from 'react';

import './HomePage.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";
import { Button } from 'react-bootstrap';
import{Redirect} from "react-router";
import {RouteComponentProps} from "react-router-dom";
import verifyUserIsLoggedIn from "../../utils/verifiyUserIsLoggedIn/verifyLoggedIn";

//require any images
const logo = require('../../images/swarmLogoIcon.png');

const background = backgroundImageStyling();

interface HomeProps extends  RouteComponentProps<{}>{}

interface HomeState{
    loggedIn: boolean;
}

function NotLoggedIn(props: { failedLogin: boolean; }){
    const isLoggedIn = props.failedLogin;
    if(isLoggedIn){
        return <Redirect to="/"/>;
    }
    return null
}

class HomePage extends React.Component<HomeProps, HomeState>{

    constructor(props: HomeProps) {
        super(props);
        this.state = {
            loggedIn: false,
        }
    }

    componentDidMount() {
        this.setState({loggedIn: verifyUserIsLoggedIn()});

        if(!this.state.loggedIn){
            this.props.history.push('/')
        }

    }

    render(){
        return(
            <section style={background}>
                <NotLoggedIn failedLogin={this.state.loggedIn} />

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