import React from 'react';

import './PersonalPage.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";

//Require any images
const logo = require('../../images/swarmLogoIcon.png');

//Get random background image
const background = backgroundImageStyling();

class PersonalPage extends React.Component {

    render() {
        return(
            <section style={background}>
                <div id='pageColumn'>
                    <MainNavbar logo={logo}></MainNavbar>
                </div>
            </section>
        );
    }
}

export default PersonalPage;