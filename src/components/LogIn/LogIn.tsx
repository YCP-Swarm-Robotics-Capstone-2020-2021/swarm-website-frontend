import React from 'react';
import backgroundImageStyling from '../../styles/backgroundImageStyling'
import {Button, Form} from "react-bootstrap";
import './LogIn.css';
import Image from "../../utils/Image";
import {Link} from "react-router-dom";
import {verifyUser} from "./LoginApi";


//require any images
const loginLogo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

interface UserLoginInfo {
    loginInfo: {
        email: string,
        password: string
    }
}


class LogIn extends React.Component<{}> {
    state = {
        loginInfo:{
            username: '',
            password: ''
        }
    }
    componentDidMount() {
        setTimeout(function (){
            // @ts-ignore, object could possibly be null
            document.getElementById('loginBox').classList.add('fade-in');
        }, 1)
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {loginInfo} = this.state;
        const newLoginInfo = {
            ...loginInfo,
            [e.target.name]: e.target.value
        }
        this.setState({loginInfo: newLoginInfo})
        console.log(this.state.loginInfo)
    }

    handleSubmit = (e: React.FormEvent): void => {
        verifyUser(this.state.loginInfo.username, this.state.loginInfo.password)
        e.preventDefault();
    }

    render() {
        return(
            <section style={background}>
                <div id="loginBox">
                    <Form onSubmit={this.handleSubmit}>
                        <Image id='loginLogo' src={String(loginLogo)} alt='Swarm Robotics Logo'/>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center loginText'}>Username</Form.Text>
                            <Form.Control className={'loginTextInput text-center'}
                                          onChange={this.handleChange} type="username"
                                          name={"username"} required placeholder="Enter Username"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Text className={'loginText text-center'}>Password</Form.Text>
                            <Form.Control className={'loginTextInput text-center'}
                                          onChange={this.handleChange}
                                          required type="password" name={"password"}
                                          placeholder="Password" />
                        </Form.Group>

                        <Button id={'loginButton'} variant="primary" type="submit">
                            Login
                        </Button>

                        <Link to="/signup">
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
}

export default LogIn