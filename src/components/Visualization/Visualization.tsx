import React from 'react';

import './Visualization.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";
import { Button } from 'react-bootstrap';
import {RouteComponentProps} from "react-router-dom";
import verifyUserIsLoggedIn from "../../utils/verifiyUserIsLoggedIn/verifyLoggedIn";

//require any images
const logo = require('../../images/swarmLogoIcon.png');

const background = backgroundImageStyling();

interface Visualization extends  RouteComponentProps<{}>{}

interface VisualizationState {
}

class Visualization extends React.Component<Visualization, VisualizationState>{

    constructor(props: Visualization) {
        super(props);

        verifyUserIsLoggedIn().then((value => {
            if(value){
                props.history.push('/');
            }
        })).catch((error) => {
           console.log("There was a problem loading the page: " + error);
        });
    }

    render(){
        return(
            <section style={background}>
                <MainNavbar logo={logo}/>


            </section>
        );
    }
}
export default Visualization