import React from 'react';

import './Logs.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";
import {RouteComponentProps} from "react-router-dom";
import verifyUserIsLoggedIn from "../../utils/verifiyUserIsLoggedIn/verifyLoggedIn";
import { ReactComponent } from '*.svg';

const logo = require('../../images/swarmLogoIcon.png');

const background = backgroundImageStyling();

interface LogProps extends RouteComponentProps<{}>{

}

interface LogState{

}

class Log extends React.Component<LogProps, LogState>{
    
    constructor(props: LogProps) {
        super(props);
    }

    render(){
        return(
            <MainNavbar logo={logo}/>
        )
    }
}

export default Log