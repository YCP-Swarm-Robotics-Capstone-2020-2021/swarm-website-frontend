import React from 'react';
import backgroundImageStyling from '../../styles/backgroundImageStyling'
import {Button, Form} from "react-bootstrap";
import './SignUp.css';
import Image from "../../utils/Image";
import {Link, RouteComponentProps} from "react-router-dom";


//require any images
const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

interface SignUpState{
    userCreateSuccess: boolean,
    userCreateFail: boolean,
    data:{
        firstName: string,
        lastName: string,
        username: string,
        password: string,
        verifyPassword: string,
        email: string
    }
}

interface SignUpProps extends RouteComponentProps<{}>{}

class SignUp extends React.Component<SignUpProps, SignUpState> {

    constructor(props: any) {
        super(props);
        this.state={
            userCreateFail: false,
            userCreateSuccess: false,
            data:{
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                verifyPassword: '',
                email: ''
            }
        }
    }

    componentDidMount() {
        setTimeout(function () {
            // @ts-ignore, object could possibly be null
            document.getElementById('signUpBox').classList.add('fade-in');
        }, 1)
    }

    render() {
        return(
            <section style={background}>
                <div id="signUpBox">
                    <Form>
                        <Image id='signUplogo' src={String(logo)} alt='Swarm Robotics Logo'/>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center signUpText'}>First Name</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'} type="email" placeholder="First Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center signUpText'}>Last Name</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'} type="email" placeholder="Last Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center signUpText'}>Email address</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Text className={'signUpText text-center'}>Password</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'} type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Text className={'signUpText text-center'}>Verify Password</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'} type="password" placeholder="Verify Passowrd" />
                        </Form.Group>
                        <Button id={'signUpButton'} variant="primary" type="submit">
                            Sign Up
                        </Button>
                        <Link to="/">
                            <Form.Text className={"text-muted text-center"}>
                                Login
                            </Form.Text>
                        </Link>
                        <Form.Text className={"text-muted text-center"}>
                           Forgot Password
                        </Form.Text>
                    </Form>
                </div>
            </section>
        );
    }
}

export default SignUp