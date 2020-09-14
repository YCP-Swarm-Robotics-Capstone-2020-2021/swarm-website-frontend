import React from 'react';

import Image from "../../utils/Image";
import TextField from '../../utils/TextField';
import Button from '../../utils/Button';
import backgroundImageStyling from '../../styles/backgroundImageStyling'

import './LogIn.css';
import {Link} from "react-router-dom";

//require any images
const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

class LogIn extends React.Component {
    componentDidMount() {
        // @ts-ignore, object could possibly be null
        document.getElementsByTagName("BODY")[0].classList.add('loginBody');

        setTimeout(function (){
            // @ts-ignore, object could possibly be null
            document.getElementById('loginBox').classList.add('fade-in');
        }, 1)
    }

    render() {
        return(
            <section style={background}>
                <div id='loginBox'>
                    <form>
                        <Image id='logo' src={String(logo)} alt='Swarm Robotics Logo'/>
                        <TextField id={'username'} class={'loginText'} name={'username'} type={'text'} placeholder='Username'/>
                        <TextField id={'password'} class={'loginText'} name={'password'} type={'password'} placeholder='Password'/>
                        <Link to="/home">
                            <Button class={''} id={'loginButton'} type={"button"} text={"Log In"}/>
                        </Link>
                    </form>
                </div>
            </section>
        );
    }
}

export default LogIn