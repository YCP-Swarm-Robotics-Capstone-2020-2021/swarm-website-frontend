import React from "react";
import {Nav, Navbar, Dropdown, Modal, Form, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {wikiData} from "./getInterfaces/wikiData";

interface Props{
    logo: string;
}

interface State{
    wikiDropdownItems:  JSX.Element[],
    addWikiModalShow: boolean
}

class MainNavbar extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            wikiDropdownItems: [],
            addWikiModalShow: false
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }
    componentDidMount() {
        fetch("http://localhost:8000/wiki", {
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

    //modal show
    handleShow(){
        this.setState({
            addWikiModalShow: true
        })
    }

    //modal hide
    handleHide(){
        this.setState({
            addWikiModalShow: false
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
                                    <Dropdown.Item onClick={() => this.handleShow()}>Add Wiki</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Nav>
                    </Navbar.Collapse>
                    <Modal id="newWikiModal" show={this.state.addWikiModalShow} onHide={this.handleHide}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a wiki</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name="title" as="input" required/>
                                    <Form.Label className='mt-3'>Description</Form.Label>
                                    <Form.Control name="text" as='textarea' rows={3}required></Form.Control>
                                </Form.Group>
                                <Button variant="success" type="submit">Submit</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Navbar>
            </>
            );
    }
}

export default MainNavbar