import React from 'react';
import backgroundImageStyling from '../../styles/backgroundImageStyling'
import {Button, Form} from "react-bootstrap";
import './LogIn.css';
import Image from "../../utils/Image";
import {Link} from "react-router-dom";
import {verifyUser} from "./LoginApi";
import { useHistory } from 'react-router-dom'

//require any images
const loginLogo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

interface Login{
    status: boolean
}

function IncorrectLogin(props: Login) {
    if (!props.status) {    return null;  }
    return (
        <div className="">
            Warning!
        </div>
    );
}

class LogIn extends React.Component<{}> {
    state = {
        loginInfo:{
            username: '',
            password: '',
            incorrectLogin: false,
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
    }

    handleSubmit = async (e: React.FormEvent)=> {
        e.preventDefault();

        const response = await verifyUser(this.state.loginInfo.username, this.state.loginInfo.password);
        console.log(response)
        if(response.Status){
        }

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

                        <IncorrectLogin status={this.state.loginInfo.incorrectLogin}/>

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