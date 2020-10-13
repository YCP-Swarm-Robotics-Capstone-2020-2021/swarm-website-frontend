import React from 'react';
import backgroundImageStyling from '../../styles/backgroundImageStyling'
import {Button, Form} from "react-bootstrap";
import './SignUp.css';
import Image from "../../utils/Image";
import {Link, RouteComponentProps} from "react-router-dom";
import {SignUpState, verifyUser} from "./SignUpApi";


//require any images
const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();


interface SignUpProps extends RouteComponentProps<{}>{}

function UserAlreadyExists(){
    return <p>User already exists</p>
}

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

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const signUp = this.state.data;
        const signUpData = {
            ...signUp,
            [e.target.name]: e.target.value
        }
        this.setState({data: signUpData});
        console.log(this.state.data);
    }

    handleSubmit = async (e: React.FormEvent)=> {
        e.preventDefault();

        //First make sure the user doesn't exist

        const response = await verifyUser(this.state.data.username, this.state.data.password);
        if(response.Status){
            return null
        }


        //Create user and redirect to login
        return null
    }

    render() {
        return(
            <section style={background}>
                <div id="signUpBox">
                    <Form onSubmit={this.handleSubmit}>
                        <Image id='signUplogo' src={String(logo)} alt='Swarm Robotics Logo'/>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center signUpText'}>First Name</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'}
                                          name={"firstName"} onChange={this.handleChange}
                                          type="firstName" placeholder="First Name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center signUpText'}>Last Name</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'}
                                          name={"lastName"} onChange={this.handleChange}
                                          type="lastName" placeholder="Last Name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center signUpText'}>Email address</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'}
                                          name={"email"} onChange={this.handleChange}
                                          type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Text className={'signUpText text-center'}>Password</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'}
                                          name={"password"} onChange={this.handleChange}
                                          type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Text className={'signUpText text-center'}>Verify Password</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'}
                                          name={"verifyPassword"} onChange={this.handleChange}
                                          type="password" placeholder="Verify Passowrd" />
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