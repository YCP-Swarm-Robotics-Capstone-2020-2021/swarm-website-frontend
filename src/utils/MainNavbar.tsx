import React from "react";
import {Nav, Navbar, Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {wikiData} from "./getInterfaces/wikiData";

interface Props{
    logo: string;
}

interface State{
    wikiDropdownItems:  JSX.Element[]
}

class MainNavbar extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            wikiDropdownItems: []
        }
    }
    componentDidMount() {
        fetch("http://localhost:8000/wiki/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                data.forEach((wiki: wikiData) => {
                    this.setState({wikiDropdownItems: this.state.wikiDropdownItems.concat(
                            <Dropdown.Item key={wiki.id} href={"/wiki/"+wiki.id}>{wiki.title}</Dropdown.Item>
                        )
                    })
                })
            })
    }

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
                            <Nav.Link href="#home">Visualization</Nav.Link>
                            <Nav.Link href="#home">Gallery</Nav.Link>
                            <Dropdown id="wikiDropdown">
                                <Dropdown.Toggle variant="success">
                                    Wikis
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {this.state.wikiDropdownItems}
                                    <Dropdown.Divider />
                                    <Dropdown.Item>Add Wiki</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
            );
    }
}

export default MainNavbar