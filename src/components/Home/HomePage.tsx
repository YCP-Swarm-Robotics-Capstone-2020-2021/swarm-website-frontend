import React from 'react';

import './HomePage.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";

//require any images
const logo = require('../../images/swarmLogoIcon.png');

const background = backgroundImageStyling();
//const styleSheet = styles();

class HomePage extends React.Component{

    render(){
        return(
            <section style={background}>
                <MainNavbar logo={logo}></MainNavbar>
            </section>
        );
    }
}
export default HomePage