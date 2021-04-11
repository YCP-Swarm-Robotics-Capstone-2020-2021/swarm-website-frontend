import React from 'react';

import './Log.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";

const logo = require('../../images/swarmLogoIcon.png');

const background = backgroundImageStyling();

interface LogProps{

}

interface LogState{

}

class Log extends React.Component<LogProps, LogState>{
    
    constructor(props: LogProps) {
        super(props);
    }

    render(){
        return(
            <section style={background}>
                <MainNavbar logo={logo}/>
            </section>
        )
    }
}

export default Log