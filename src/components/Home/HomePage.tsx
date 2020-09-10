import React from 'react';

import './HomePage.css';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import {Nav, NavDropdown} from "react-bootstrap";
import {Navbar} from "react-bootstrap";

//require any images
const logo = require('../../images/swarmLogoIcon.png');

const background = backgroundImageStyling();
//const styleSheet = styles();

class HomePage extends React.Component{

    componentDidMount() {
        //set the global body to the settings required
    }

    render(){
        return(
            <section style={background}>
                <>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        <Navbar.Brand href="#home">  Swarm Robotics</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#home">Visualization</Nav.Link>
                                <Nav.Link href="#home">Wiki</Nav.Link>
                                <Nav.Link href="#home">Gallery</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </>
            </section>
        )
    }
}
export default HomePage