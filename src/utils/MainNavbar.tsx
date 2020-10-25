import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

interface Props{
    logo: string;
}

class MainNavbar extends React.Component<Props>{
    render(){
        return(
            <>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Link to="/">
                        <img
                            alt=""
                            id={"mainNavbarLogo"}
                            src={this.props.logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />{''}
                    </Link>
                    <Navbar.Brand href="#home">  Swarm Robotics</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/visualization">Visualization</Nav.Link>
                            <Nav.Link href="#home">Wiki</Nav.Link>
                            <Nav.Link href="#home">Gallery</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
            );
    }
}

export default MainNavbar