import React from 'react';
import backgroundImageStyling from '../../styles/backgroundImageStyling'
import {Button, Form} from "react-bootstrap";
import './SignUp.css';
import Image from "../../utils/Image";
import {Link} from "react-router-dom";


//require any images
const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

class SignUp extends React.Component {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        setTimeout(function () {
            // @ts-ignore, object could possibly be null
            document.getElementById('loginBox').classList.add('fade-in');
        }, 1)
    }

    render() {
        return(
            <section style={background}>
                <div id="loginBox">
                    <Form>
                        <Image id='logo' src={String(logo)} alt='Swarm Robotics Logo'/>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center loginText'}>Email address</Form.Text>
                            <Form.Control className={'loginTextInput text-center'} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Text className={'loginText text-center'}>Password</Form.Text>
                            <Form.Control className={'loginTextInput text-center'} type="password" placeholder="Password" />
                        </Form.Group>

                        <Button id={'loginButton'} variant="primary" type="submit" onClick={verifyLogin()}>
                            Submit
                        </Button>
                        <Form.Text className={"text-muted loginText text-center"}>
                           Forgot Password?
                        </Form.Text>
                    </Form>
                </div>
            </section>
        );
    }
}

export default SignUp