import React from 'react';

import './HomePage.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";
import { Button } from 'react-bootstrap';
import {cookies} from '../../utils/Cookies';

//require any images
const logo = require('../../images/swarmLogoIcon.png');

const background = backgroundImageStyling();


class HomePage extends React.Component{

    componentDidMount() {
        console.log(cookies.get('myTestCookie'));
    }

    render(){
        return(
            <section style={background}>
                <MainNavbar logo={logo}></MainNavbar>

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