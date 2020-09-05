import React, {useEffect} from 'react';
import './LoginBox.css';

import {Image} from "./Image";
import {TextField} from "./TextField";
import {Button} from "./Button";

//require any images
const logo = require('../../images/swarmLogoIcon.png');

export const LoginBox: React.FC = () => {

    function onSubmit(){
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            mode: 'no-cors' as RequestMode,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                username: 'React Hooks POST Request Example'
            })
        };
        fetch('https://webhook.site/e61199ce-9d98-43ae-9e65-08cb7dce6747', requestOptions)
            .then(response => response.json())
            .catch(error => {
                console.error('There was an error!' + error);
            });
    }

    //useEffect will do anything on component mount
    useEffect(() => {
        // @ts-ignore, object could possibly be null
        document.getElementById('loginBox').classList.add('fade-in');

        onSubmit();
    }, []);

    return(
        <div id='loginBox'>
            <form>
                <Image id='logo' src={String(logo)} alt='Swarm Robotics Logo'/>
                <TextField name={'username'} type={'text'} placeholder='Username'/>
                <TextField name={'password'} type={'password'} placeholder='Password'/>
                <Button id={'loginButton'} type={"submit"} text={"Log In"}/>
            </form>
        </div>
    );
};