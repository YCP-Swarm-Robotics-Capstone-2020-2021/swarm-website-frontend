import React, {useEffect} from 'react';
import './LoginBox.css';

import {Image} from "./Image";
import {TextField} from "./TextField";
import {Button} from "./Button";

//require any images
const logo = require('../../images/swarmLogoIcon.png');

export const LoginBox: React.FC = () => {

    //useEffect will do anything on component mount
    useEffect(() => {
        // @ts-ignore, object could possibly be null
        document.getElementById('loginBox').classList.add('fade-in');
    }, []);

    return(
        <div id='loginBox'>
            <Image id='logo' src={String(logo)} alt='Swarm Robotics Logo'/>
            <TextField type={'text'} placeholder='Username'/>
            <TextField type={'password'} placeholder='Password'/>
            <Button id={'loginButton'} type={"button"} text={"Log In"}/>
        </div>
    );
};