import React from 'react';
import {Tab, Tabs, Card, Form, Button, Image, Toast, Modal} from "react-bootstrap";
import EntryEditForm from "../EntryEditForm/EntryEditForm";

import {entryData} from "../../../utils/getInterfaces/entryData";
import {commentData} from "../../../utils/getInterfaces/commentData";
import {headingData} from "../../../utils/getInterfaces/headingData";
import {newCommentData} from "../../../utils/postInterfaces/newCommentData";
import {deleteHeading} from "../EntryEditForm/deleteHeading";
import {postComment} from "./postComment";
import {deleteComment} from "./deleteComment";

import './Entry.css';
import {sideBarData} from "../../../utils/getInterfaces/sideBarData";
import {userData} from "../../../utils/getInterfaces/userData";
import {url} from "../../../utils/DetermineUrl";
import {wikiData} from "../../../utils/getInterfaces/wikiData";
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
    deleteCommentShow: boolean
    commentToDelete: number
    data: entryData
    sideBar: sideBarData
    sideBarElements: JSX.Element[]
    comments: commentData[]
    commentElements: JSX.Element[]
    newComment: newCommentData
    headings: headingData[]
    headingElements: JSX.Element[]
    headingEditElements: JSX.Element[]
}

interface entryProps{
    id: string,
    currentUser: userData,
    wiki: wikiData,
}

//component has no props, hence {}
class Entry extends React.Component<entryProps, entryState>{
    constructor(props: entryProps) {
        super(props);
        this.state = {
            replyModalShow : false,
            replyModalQuote: "test",
            deleteCommentShow: false,
            commentToDelete: 0,
            data: {id: 0, title: '', text: '', sideBar: 0, comments: [], contributors: [], headings: [], log: []},
            sideBar: {id: 0, content: {}},
            sideBarElements: [],
            comments: [],
            commentElements: [],
            newComment: {text: '', user: 0},
            headings: [],
            headingElements: [],
            headingEditElements: []
        };
    }

    handleReplyHide = () => {
        this.setState({
            replyModalShow: false,
            replyModalQuote: ""
        })
    }

    handleReplyShow = (commentId: string) => {
        //@ts-ignore
        let commentText = document.getElementById("commentText" + commentId).textContent.toString();
        //@ts-ignore
        let commentUser = document.getElementById("commentUser" + commentId).textContent.toString();
        this.setState({
            replyModalShow: true,
            replyModalQuote: commentUser+": \""+commentText+"\""
        })
    }

    handleDeleteCommentShow = (commentId: number): void => {
        this.setState({
            deleteCommentShow: true,
            commentToDelete: commentId
        });
    }

    handleDeleteCommentHide = () => {
        this.setState({
            deleteCommentShow: false,
            commentToDelete: 0
        });
    }

    //update state when text is change in form
    handleCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newComment: {
                text: e.target.value,
                user: this.state.newComment.user
            }
        });
    }

    handleNewCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postComment({
            text: this.state.newComment.text,
            user: this.props.currentUser.id
        }, this.state.data.comments, this.state.data.id)
    }

    getEntry(){
        fetch(url+'/entry/' + this.props.id, {
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
                    fetch(url+'/comment/' + commentId, {
                        method: 'GET',
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            let commentData = data as commentData;
                            fetch(url+'/user/'+data['user'], {
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
                                let deleteButton: JSX.Element = <></>;
                                if(commentData['user'] === this.props.currentUser.id){
                                    deleteButton = <Button className="ml-1" variant="danger" size="sm" onClick={() => this.handleDeleteCommentShow(commentData['id'])}><span>x</span></Button>;
                                }
                                this.setState({
                                    comments: this.state.comments.concat(data as commentData),
                                    commentElements: this.state.commentElements.concat(
                                        <Toast id={"comment"+commentData['id']} key={commentId} className='comment'>
                                            <Toast.Header>
                                                <Image src={logo} roundedCircle width={25} height={25}/>
                                                <strong className="mr-auto ml-2" id={"commentUser"+commentData['id']}>{data['username']}</strong>
                                                <small className="mr-1">{commentData['dateTime'].substring(0,10)}</small>
                                                <Button id="replyButton" variant="success" className="ml-1" size="sm" onClick={() => this.handleReplyShow(commentData['id'].toString())}><small>reply</small></Button>
                                                {deleteButton}
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
                    fetch(url+'/heading/'+headingId, {
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
                                    <div id="headingDiv">
                                        <Card.Title>{data['title']}</Card.Title>
                                        <Card.Text>{data['text']}</Card.Text>
                                    </div>
                                ),
                                headingEditElements: this.state.headingEditElements.concat(
                                    <div>
                                        <Form.Control className="heading" value={data['title']}></Form.Control>
                                        <Form.Control value={data['text']} as="textarea" rows={4}></Form.Control>
                                        <Button onClick={() => deleteHeading(data['id'])}variant="danger">Delete</Button>
                                    </div>
                                )
                            })
                        })
                })
            })
            .then(() => {
                //get sidebar
                fetch(url+'/sidebar/'+this.state.data.sideBar, {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        this.setState({sideBar: data as sideBarData})
                        if(this.state.sideBar.content !== null){
                            for (const [key, value] of Object.entries(this.state.sideBar.content)) {
                                this.setState({
                                    sideBarElements: this.state.sideBarElements.concat(
                                        <Card.Text><span className="sideBarKey"><b>{key}</b></span> <span className="sideBarValue">{value}</span></Card.Text>
                                    )
                                })
                            }
                        }
                    })
            })
    }



    componentDidUpdate(prevProps: Readonly<entryProps>, prevState: Readonly<entryState>) {
        if(prevProps.id !== this.props.id){
            this.setState({
                commentElements: [],
                sideBarElements: [],
                headingElements: [],
                headingEditElements: []
            })
            this.getEntry();
        }
    }

    componentDidMount() {
        //get entry object
        this.getEntry();
    }

    render(){
        let editTabElements: JSX.Element = <></>
        if(this.props.currentUser.accountLevel === 0){
            editTabElements =
                <Tab eventKey="edit" title="Edit" transition={false}>
                    <EntryEditForm headingEditElements={this.state.headingEditElements} entryData={this.state.data} sideBarData={this.state.sideBar} currentUser={this.props.currentUser} wiki={this.props.wiki}></EntryEditForm>
                </Tab>;
        }
        return(
            <Tabs id="tabs" defaultActiveKey="details" variant="pills" bg="dark" transition={false}>
                <Tab eventKey="details" title="Details" transition={false}>
                    <Card id="sideBarCard">
                        <Card.Body>
                            {this.state.sideBarElements}
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
                    <Modal id="replyModal" show={this.state.replyModalShow} onHide={this.handleReplyHide}>
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
                    <Modal id="deleteCommentModal" show={this.state.deleteCommentShow} onHide={this.handleDeleteCommentHide}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete this comment?</p>
                            <Form>
                                <Button variant="danger" type="button" onClick={() => deleteComment(this.state.commentToDelete)}>Delete</Button>
                                <Button className="ml-4" variant="secondary" type="button" onClick={this.handleDeleteCommentHide}>Cancel</Button>
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
                {editTabElements}
            </Tabs>
        );
    }
}

export default Entry

