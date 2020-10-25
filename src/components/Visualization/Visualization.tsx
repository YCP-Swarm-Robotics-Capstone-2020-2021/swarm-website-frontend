import React from 'react';
import backgroundImageStyling from '../../styles/backgroundImageStyling'
import {Button, Form} from "react-bootstrap";
import Image from "../../utils/Image";
import {Link, RouteComponentProps} from "react-router-dom";
import MainNavbar from "../../utils/MainNavbar";
const logo = require('../../images/swarmLogoIcon.png');

const background = backgroundImageStyling();




class Visualization extends React.Component<any, any>{
    render() {
        return (
            <section>
                <MainNavbar logo={logo}></MainNavbar>
                <p>Hi there</p>
            </section>

        );
    }
}

export default Visualization