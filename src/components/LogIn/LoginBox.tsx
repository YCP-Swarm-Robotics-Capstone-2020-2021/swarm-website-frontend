import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
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
            <form>
                <Image id='logo' src={String(logo)} alt='Swarm Robotics Logo'/>
                <TextField name={'username'} type={'text'} placeholder='Username'/>
                <TextField name={'password'} type={'password'} placeholder='Password'/>
                <Button id={'loginButton'} type={"button"} text={"Log In"}/>
            </form>
        </div>
    );
};