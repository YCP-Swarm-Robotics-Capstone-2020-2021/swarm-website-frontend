import React from 'react';
import {Tab, Tabs, Card, Form, Button, Image, Toast, Modal} from "react-bootstrap";
import {entryData} from "../../../utils/getInterfaces/entryData";
import {commentData} from "../../../utils/getInterfaces/commentData";
import {headingData} from "../../../utils/getInterfaces/headingData";

import {newCommentData} from "../../../utils/postInterfaces/newCommentData";

import {postComment} from "./postComment";

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
    newComment: newCommentData
    headings: headingData[]
    headingElements: JSX.Element[]
    headingEditElements: JSX.Element[]
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
            commentElements: [],
            newComment: {text: '', user: 0},
            headings: [],
            headingElements: [],
            headingEditElements: []
        };
        this.handleHide = this.handleHide.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleCommentTextChange = this.handleCommentTextChange.bind(this);
        this.handleNewCommentSubmit = this.handleNewCommentSubmit.bind(this);
    }

    handleHide(){
        this.setState({
            replyModalShow: false,
            replyModalQuote: ""
        })
    }

    handleShow(commentId: string){
        //@ts-ignore
        let commentText = document.getElementById("commentText" + commentId).textContent.toString();
        //@ts-ignore
        let commentUser = document.getElementById("commentUser" + commentId).textContent.toString();
        this.setState({
            replyModalShow: true,
            replyModalQuote: commentUser+": \""+commentText+"\""
        })
    }

    //update state when text is change in form
    handleCommentTextChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            newComment: {
                text: e.target.value,
                user: this.state.newComment.user
            }
        });
    }

    handleNewCommentSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        postComment({
            text: this.state.newComment.text,
            user: 1
        }, this.state.data.comments, this.state.data.id)
    }

    getEntry(){
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
                            let commentData = data as commentData;
                            fetch("http://localhost:8000/user/"+data['user']+"/", {
                                method: 'GET',
                                headers:{
                                    'Content-Type': 'application/json'
                                }
                            }).then(response => {
                                if(!response.ok){
                                    console.log("error retrieving user information for comment "+commentId);
                                }else{
                                    return response.json()
                                }
                            }).then(data => {
                                this.setState({
                                    comments: this.state.comments.concat(data as commentData),
                                    commentElements: this.state.commentElements.concat(
                                        <Toast id={"comment"+commentData['id']} key={commentId} className='comment'>
                                            <Toast.Header>
                                                <Image src={logo} roundedCircle width={25} height={25}/>
                                                <strong className="mr-auto ml-2" id={"commentUser"+commentData['id']}>{data['username']}</strong>
                                                <small className="mr-1">{commentData['dateTime'].substring(0,10)}</small>
                                                <Button variant="success" className="replyButton ml-1" size="sm" onClick={() => this.handleShow(commentData['id'].toString())}><small>reply</small></Button>
                                            </Toast.Header>
                                            <Toast.Body id={"commentText"+commentData['id']}>{commentData['text']}</Toast.Body>
                                        </Toast>
                                    )
                                })
                            })
                        })
                })

                //get headingData/headingElements
                this.state.data.headings.forEach(headingId => {
                    fetch("http://localhost:8000/heading/"+headingId+"/", {
                        method: 'GET',
                        headers:{
                            "Content-type": "application/json"
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            this.setState({
                                headings: this.state.headings.concat(data as headingData),
                                headingElements: this.state.headingElements.concat(
                                    <div>
                                        <Card.Title>{data['title']}</Card.Title>
                                        <Card.Text>{data['text']}</Card.Text>
                                    </div>
                                ),
                                headingEditElements: this.state.headingEditElements.concat(
                                    <div>
                                        <Form.Control className="heading" value={data['title']}></Form.Control>
                                        <Form.Control value={data['text']} as="textarea" rows={4}></Form.Control>
                                    </div>
                                )
                            })
                        })
                })
            })
    }



    componentDidUpdate(prevProps: Readonly<entryProps>, prevState: Readonly<entryState>) {
        if(prevProps.id !== this.props.id){
            this.setState({
                commentElements: []
            })
            this.getEntry();
        }
    }

    componentDidMount() {
        //get entry object
        this.getEntry();
    }

    render(){
        return(
            <Tabs id="tabs" defaultActiveKey="details" variant="pills" bg="dark" transition={false}>
                <Tab eventKey="details" title="Details" transition={false}>
                    <Card id="sideBarCard">
                        <Card.Body>
                            <Card.Title>{this.state.data.title}</Card.Title>
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
                            <Card.Text>{this.state.data.text}</Card.Text>
                            {this.state.headingElements}
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
                    <Form id="newCommentForm" onSubmit={this.handleNewCommentSubmit}>
                        <Form.Group>
                            <Image id="newCommentProfPic" src={logo} roundedCircle width={50} height={50} />
                            <Form.Control as="textarea" rows={3} placeholder="Leave a comment" onChange={this.handleCommentTextChange} />
                        </Form.Group>
                        <Button variant="success" type="submit">Comment</Button>
                    </Form>

                    {this.state.commentElements}

                </Tab>
                <Tab eventKey="edit" title="Edit" transition={false}>
                    <Form id="editForm">
                        <Form.Group>
                            <Form.Control id="title" value={this.state.data.title}></Form.Control>
                            {this.state.headingEditElements}
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

