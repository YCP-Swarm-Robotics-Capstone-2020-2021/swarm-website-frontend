import React from 'react';
import {Tab, Tabs, Card, Form, Button, Image, Toast, Modal} from "react-bootstrap";
import {entryData} from "../../../utils/responseInterfaces/entryData";
import {commentData} from "../../../utils/responseInterfaces/commentData";

import './Entry.css';

const logo = require('../../../images/swarmLogoIcon.png');

/*
* There's a warning that gets produced in the console when interacting with the Tab component below (switching b/t details/comment/details tabs)
* react-bootstrap is aware of this warning but they do not have a fix for it yet it seems.
*
* warning:
* "findDOMNode is deprecated in StrictMode..."
*
* This can be suppressed by passing {false} to the 'transition' prop in the Tabs/Tab components.
* So no fancy fade in/out transitions between tabs :(
* */

interface entryState{
    replyModalShow: boolean
    replyModalQuote: string
    data: entryData
    comments: commentData[]
    commentElements: JSX.Element[]
}

interface entryProps{
    id: string
}

//component has no props, hence {}
class Entry extends React.Component<entryProps, entryState>{
    constructor(props: entryProps) {
        super(props);
        this.state = {
            replyModalShow : false,
            replyModalQuote: "test",
            data: {id: 0, title: '', text: '', sideBar: 0, comments: [], contributors: [], headings: [], log: []},
            comments: [],
            commentElements: []
        };
        this.handleHide = this.handleHide.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleHide(){
        this.setState({
            replyModalShow: false,
            replyModalQuote: ""
        })
    }

    handleShow(commentId: string){
        //@ts-ignore
        let commentText = document.getElementById("comment" + commentId).childNodes[1].textContent.toString();

        this.setState({
            replyModalShow: true,
            replyModalQuote: commentText
        })
    }

    componentDidMount() {
        //get entry object
        fetch('http://localhost:8000/entry/' + this.props.id + '/', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({data: data as entryData})
            })
            .then(() => {
                //get commentData/commentElements
                this.state.data.comments.forEach(commentId => {
                    fetch("http://localhost:8000/comment/" + commentId + '/', {
                        method: 'GET',
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            this.setState({
                                comments: this.state.comments.concat(data as commentData),
                                commentElements: this.state.commentElements.concat(
                                    <Toast id="comment1" key={commentId} className='comment'>
                                        <Toast.Header>
                                            <Image src={logo} roundedCircle width={25} height={25}/>
                                            <strong className="mr-auto ml-2">Tim Jefferson</strong>
                                            <small className="mr-1">11 mins ago</small>
                                            <Button variant="success" className="replyButton ml-1" size="sm" onClick={() => this.handleShow("1")}><small>reply</small></Button>
                                        </Toast.Header>
                                        <Toast.Body>{data['text']}</Toast.Body>
                                    </Toast>
                                )
                            })
                        })
                })
            })
    }

    render(){
        return(
            <Tabs id="tabs" defaultActiveKey="details" variant="pills" bg="dark" transition={false}>
                <Tab eventKey="details" title="Details" transition={false}>
                    <Card id="sideBarCard">
                        <Card.Body>
                            <Card.Title>Milestone 1</Card.Title>
                            <Card.Text>Test Text</Card.Text>
                            <Card.Text>Test Text</Card.Text>
                            <Card.Text>Test Text</Card.Text>
                            <Card.Text>Test Text</Card.Text>
                            <Card.Text>Test Text</Card.Text>
                            <Card.Text>Test Text</Card.Text>
                            <Card.Text>Test Text</Card.Text>
                            <Card.Text>Test Text</Card.Text>
                            <Card.Text>Test Text</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card id="detailsCard" bg="dark" text="white">
                        <h2>{this.state.data.title}</h2>
                        <Card.Body>
                            <Card.Title>A heading</Card.Title>
                                <Card.Text>The text that goes with the above heading. Crazy stuff
                                    Crazy stuffCrazy stuffCrazy stuffCrazy stuffCrazy stuffCrazy stuffCrazy stuffCrazy stuff
                                    Crazy stuffCrazy stuffCrazy stuffCrazy stuffCrazy stuffCrazy stuffCrazy stuffCrazy stuff
                                    Crazy stuffCrazy stuffCrazy stuff</Card.Text>
                            <Card.Title>Another heading</Card.Title>
                                <Card.Text>The text that goes with the above heading. Crazy stuff</Card.Text>
                            <Card.Subtitle>A sub heading</Card.Subtitle>
                                <Card.Text>Sub heading text</Card.Text>
                        </Card.Body>
                    </Card>

                </Tab>
                <Tab eventKey="comments" title="Comments" transition={false}>
                    <Modal id="replyModal" show={this.state.replyModalShow} onHide={this.handleHide}>
                        <Modal.Header closeButton>
                            <Modal.Title>Reply</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Control as="textarea" rows={5} value={this.state.replyModalQuote}/>
                                </Form.Group>
                                <Button variant="success" type="submit">Comment</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    <Form id="newCommentForm">
                        <Form.Group>
                            <Image id="newCommentProfPic" src={logo} roundedCircle width={50} height={50} />
                            <Form.Control as="textarea" rows={3} placeholder="Leave a comment" />
                        </Form.Group>
                        <Button variant="success" type="submit">Comment</Button>
                    </Form>

                    {this.state.commentElements}

                </Tab>
                <Tab eventKey="edit" title="Edit" transition={false}>
                    <Form id="editForm">
                        <Form.Group>
                            <Form.Control id="title" value={this.state.data.title}></Form.Control>
                            <Form.Control className="heading" value="Heading"></Form.Control>
                            <Form.Control value="Heading text" as="textarea" rows={4}></Form.Control>

                            <Form.Control className="heading" value="Heading 2"></Form.Control>
                            <Form.Control value="Heading text 2" as="textarea" rows={4}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id="sideBarLabel">Sidebar</Form.Label>
                        </Form.Group>
                        <Form.Group id="sideBarEdit">
                            <Form.Control className="float-left" value="Test"></Form.Control>
                            <Form.Control className="float-right" value="Test 2"></Form.Control>

                            <Form.Control className="float-left" value="Test"></Form.Control>
                            <Form.Control className="float-right" value="Test 2"></Form.Control>

                            <Form.Control className="float-left" value="Test"></Form.Control>
                            <Form.Control className="float-right" value="Test 2"></Form.Control>
                        </Form.Group>
                        <Form.Group id="submitGroup">
                            <Button variant="success" type="submit">Save</Button>
                        </Form.Group>
                    </Form>
                </Tab>
            </Tabs>
        );
    }
}

export default Entry

