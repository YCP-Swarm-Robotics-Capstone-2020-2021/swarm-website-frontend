import React from "react";
import {Nav, Navbar, Dropdown, Modal, Form, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {newWikiData} from "./postInterfaces/newWikiData";
// import {postWiki} from "../components/Wiki/postWiki";
import {url} from "./DetermineUrl";

interface Props{
    logo: string;
}

interface State{
    wikiDropdownItems:  JSX.Element[],
    addWikiModalShow: boolean,
    newWiki: newWikiData
}

class MainNavbar extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            wikiDropdownItems: [],
            addWikiModalShow: false,
            newWiki: {title: '', briefDescription: ''}
        }
    }

    buildWikiDropDown = async () => {
        let response = await fetch(url+'/wiki', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        let json = await response.json();

        for(const wiki of json){
            this.setState({wikiDropdownItems: this.state.wikiDropdownItems.concat(
                    <Dropdown.Item key={wiki['id']} href={"/wiki/"+wiki['id']}>{wiki['title']}</Dropdown.Item>
                )
            })
        }
    }

    postWiki = async () => {
        let response = await fetch(url+'/wiki', {
            method: "POST",
            body: JSON.stringify(this.state.newWiki),
            headers:{
                "Content-Type": 'application/json'
            }
        })
        let json = await response.json();

        if(!response.ok){
            console.log('Adding new wiki failed...');
        }else{
            window.location.href = '/wiki/'+json['id'];
        }
    }

    //modal show
    handleShow = () => {
        this.setState({
            addWikiModalShow: true
        })
    }

    //modal hide
    handleHide = () => {
        this.setState({
            addWikiModalShow: false
        })
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newWikiInfo = this.state.newWiki;
        const newNewWikiInfo = {
            ...newWikiInfo,
            [e.target.name]: e.target.value
        }
        this.setState({newWiki: newNewWikiInfo})
    }

    handleNewWikiSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.postWiki();
    }

    componentDidMount() {
        this.buildWikiDropDown();
    }

    render(){
        return(
            <>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Link to="/home">
                        <img
                            alt=""
                            id={"mainNavbarLogo"}
                            src={this.props.logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />{''}
                    </Link>
                    <Navbar.Brand href="/home">  Swarm Robotics</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/visualization">Visualization</Nav.Link>
                            <Nav.Link href="/gallery">Gallery</Nav.Link>
                            <Dropdown id="wikiDropdown">
                                <Dropdown.Toggle variant="success">
                                    Wikis
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {this.state.wikiDropdownItems}
                                    <Dropdown.Divider />
                                    <Dropdown.Item id="addWikiLink" onClick={() => this.handleShow()}>Add Wiki</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Nav>
                    </Navbar.Collapse>
                    <Modal id="newWikiModal" show={this.state.addWikiModalShow} onHide={this.handleHide}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a wiki</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form id="newWikiForm" onSubmit={this.handleNewWikiSubmit}>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name="title" as="input" required onChange={this.handleChange}/>
                                    <Form.Label className='mt-3'>Description</Form.Label>
                                    <Form.Control name="briefDescription" as='textarea' rows={3} required onChange={this.handleChange}></Form.Control>
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