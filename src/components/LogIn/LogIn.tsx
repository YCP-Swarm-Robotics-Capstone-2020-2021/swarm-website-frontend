import React from 'react';

import Image from "../../utils/Image";
import TextField from '../../utils/TextField';
import Button from '../../utils/Button';

import './LogIn.css';

//require any images
const logo = require('../../images/swarmLogoIcon.png');

//choose random background
let bgNum = Math.floor(Math.random() * 5) + 1
const sectionStyle = {
    backgroundImage: "url(" + require('../../images/loginbgs/bg'+bgNum+'.jpg') + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
    overflow: "hidden"
};

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
            <section style={sectionStyle}>
                <div id='loginBox'>
                    <form>
                        <Image id='logo' src={String(logo)} alt='Swarm Robotics Logo'/>
                        <TextField id={'username'} class={'loginText'} name={'username'} type={'text'} placeholder='Username'/>
                        <TextField id={'password'} class={'loginText'} name={'password'} type={'password'} placeholder='Password'/>
                        <Button class={''} id={'loginButton'} type={"button"} text={"Log In"}/>
                    </form>
                </div>
            </section>
        );
    }
}

export default LogIn