import React from 'react';

import './HomePage.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import styles from "../../styles/styles";

//require any images
const logo = require('../../images/swarmLogoIcon.png');

const background = backgroundImageStyling();
const styleSheet = styles();

class HomePage extends React.Component{

    componentDidMount() {
        //set the global body to the settings required
        document.getElementsByTagName("BODY")[0].classList.add('loginBody');
    }

    render(){
        return(
            <section style={background}>
                <div> ADD FONT HERE</div>
            </section>
        )
    }
}
export default HomePage