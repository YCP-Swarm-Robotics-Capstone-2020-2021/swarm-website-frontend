import React from 'react';
import backgroundImageStyling from '../../styles/backgroundImageStyling'
import {Button, Form} from "react-bootstrap";
import './LogIn.css';
import Image from "../../utils/Image";
import {Link} from "react-router-dom";


//require any images
const loginLogo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

interface UserLoginInfo {
    loginInfo: {
        email: string,
        password: string
    }
}

class LogIn extends React.Component<{}, UserLoginInfo> {
    constructor(props: any) {
        super(props);
        this.state = {
            loginInfo: {
                email: '',
                password: ''
            }
        };
    }
    componentDidMount() {
        setTimeout(function (){
            // @ts-ignore, object could possibly be null
            document.getElementById('loginBox').classList.add('fade-in');
        }, 1)
    }


    render() {
        return(
            <section style={background}>
                <div id="loginBox">
                    <Form>
                        <Image id='loginLogo' src={String(loginLogo)} alt='Swarm Robotics Logo'/>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center loginText'}>Email address</Form.Text>
                            <Form.Control className={'loginTextInput text-center'} value={this.state.loginInfo.email}
                                          onChange={this.changeEmail} type="email" placeholder="Enter email"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Text className={'loginText text-center'}>Password</Form.Text>
                            <Form.Control className={'loginTextInput text-center'}
                                          onChange={this.changePassword} value={this.state.loginInfo.password}
                                          type="password" placeholder="Password" />
                        </Form.Group>

                        <Button id={'loginButton'} variant="primary" type="submit" onClick={this.submitInfo}>
                            Login
                        </Button>

                        <Link to="/signUp">
                            <Form.Text className={"text-muted text-center"}>
                                Sign up
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
    changeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {loginInfo} = this.state;
        const {value} = event.currentTarget
        const newLoginInfo = {
            ...loginInfo,
            email: value
        };
        this.setState({loginInfo: newLoginInfo})
    }

    changePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {loginInfo} = this.state;
        const {value} = event.currentTarget
        const newLoginInfo = {
            ...loginInfo,
            password: value
        };
        this.setState({loginInfo: newLoginInfo})
    }
    submitInfo = (event: React.MouseEvent<HTMLButtonElement>): void => {
        console.log(this.state.loginInfo);
    }
}

export default LogIn