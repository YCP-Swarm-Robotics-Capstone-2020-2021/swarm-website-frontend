import React from 'react';
import {Tab, Tabs, Card, Form, Button, Image, Toast, Modal} from "react-bootstrap";
import EntryEditForm from "../EntryEditForm/EntryEditForm";

import {entryData} from "../../../utils/getInterfaces/entryData";
import {commentData} from "../../../utils/getInterfaces/commentData";
import {headingData} from "../../../utils/getInterfaces/headingData";
import {changeData} from "../../../utils/getInterfaces/changeData";
import {newCommentData} from "../../../utils/postInterfaces/newCommentData";

import './Entry.css';
import {sideBarData} from "../../../utils/getInterfaces/sideBarData";
import {userData} from "../../../utils/getInterfaces/userData";
import {wikiData} from "../../../utils/getInterfaces/wikiData";
import {getEntry, getComment, getUser, getHeading, getSideBar, postComment, deleteComment, getAllChanges} from "./apiCalls";
const logo = require('../../../images/swarmLogoIcon.png');

/*
* There's a warning that gets produced in the console when interacting with the Tab component below (switching b/t details/comment/edit tabs)
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
    changes: changeData[]
    changeElements: JSX.Element[]
}

interface entryProps{
    id: string,
    currentUser: userData,
    wiki: wikiData,
    reloadWiki: () => void
}

/**
 * Displays a chosen entry chosen in <EntryMenu/> in the <Wiki/> components #rightPane div
 */
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
            changes: [],
            changeElements: []
        };
    }

    //used whenever a comment/heading/any kind of update is posted and we need updated entry data
    reloadEntry = () => {
        this.setState({
            data: {id: 0, title: '', text: '', sideBar: 0, comments: [], contributors: [], headings: [], log: []},
            sideBar: {id: 0, content: {}},
            sideBarElements: [],
            comments: [],
            commentElements: [],
            newComment: {text: '', user: 0},
            headings: [],
            headingElements: [],
            changes: [],
            changeElements: []
        }, () => {
            this.getEntry();
        })
    }

    //used to hide/show the #replyModal below
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
            replyModalQuote: commentUser+": \""+commentText+"\"" //get the comment a user is replying to's comment, will be put in #replyModal's textarea
        })
    }

    //used to hide/show the #deleteCommentModal below
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

    //update state when text is change in new comment form
    handleCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newComment: {
                text: e.target.value,
                user: this.state.newComment.user
            }
        });
    }

    //form submission handler for posting a new comment, if successful call reloadEntry() to get updated data
    handleNewCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let result = await postComment({
            text: this.state.newComment.text,
            user: this.props.currentUser.id
        }, this.state.data.comments, this.state.data.id);

        if(result){
            this.reloadEntry();
        }
    }

    //form submission handler for deleting a comment, if successful hide the #deleteCommentModal and call reloadEntry() to get updated data
    handleDeleteCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let response = await deleteComment(this.state.commentToDelete);

        if(!response.ok){
            console.log("Removing comment failed...");
        }else{
            this.handleDeleteCommentHide();
            this.reloadEntry();
        }
    }

    //Get the chosen entry's data and build the needed state JSX.Element arrays (comments, headings, etc.)
    getEntry = async () => {
        //get entry data
        let responseEntries = await getEntry(this.props.id);
        let jsonEntries = await responseEntries.json();

        this.setState({
            data: jsonEntries as entryData
        })

        //get comment data/build elements
        for(const commentId of jsonEntries['comments']){
            let responseComments = await getComment(commentId);
            let jsonComment = await responseComments.json();

            let responseUser = await getUser(jsonComment['user']);
            let jsonUser = await responseUser.json();

            let deleteButton: JSX.Element = <></>;
            if(jsonComment['user'] === this.props.currentUser.id){
                deleteButton = <Button className="ml-1" variant="danger" size="sm" onClick={() => this.handleDeleteCommentShow(jsonComment['id'])}><span>x</span></Button>;
            }
            this.setState({
                comments: this.state.comments.concat(jsonComment as commentData),
                commentElements: this.state.commentElements.concat(
                    <Toast id={"comment"+jsonComment['id']} key={commentId} className='comment'>
                        <Toast.Header>
                            <Image src={logo} roundedCircle width={25} height={25}/>
                            <strong className="mr-auto ml-2" id={"commentUser"+jsonComment['id']}>{jsonUser['username']}</strong>
                            <small className="mr-1">{jsonComment['dateTime'].substring(0,10)}</small>
                            <Button id="replyButton" variant="success" className="ml-1" size="sm" onClick={() => this.handleReplyShow(jsonComment['id'].toString())}><small>reply</small></Button>
                            {deleteButton}
                        </Toast.Header>
                        <Toast.Body id={"commentText"+jsonComment['id']}>{jsonComment['text']}</Toast.Body>
                    </Toast>
                )
            })
        }

        //get heading data/build elements
        for(const headingId of jsonEntries['headings']){
            let responseHeading = await getHeading(headingId);
            let jsonHeading = await responseHeading.json();

            this.setState({
                headings: this.state.headings.concat(jsonHeading as headingData),
                headingElements: this.state.headingElements.concat(
                    <div id="headingDiv">
                        <Card.Title>{jsonHeading['title']}</Card.Title>
                        <Card.Text>{jsonHeading['text']}</Card.Text>
                    </div>
                )
            })
        }

        //get sideBar data/build elements
        let responseSideBar = await getSideBar(jsonEntries['sideBar']);
        let jsonSideBar = await responseSideBar.json();

        this.setState({sideBar: jsonSideBar as sideBarData})
        if(this.state.sideBar.content !== null){
            for (const [key, value] of Object.entries(this.state.sideBar.content)) {
                this.setState({
                    sideBarElements: this.state.sideBarElements.concat(
                        <Card.Text><span className="sideBarKey"><b>{key}</b></span> <span className="sideBarValue">{value}</span></Card.Text>
                    )
                })
            }
        }

        //get change data/build elements, reverse sort as to sort (newest -> oldest)
        let responseChanges = await getAllChanges(this.props.id);
        let jsonChanges = await responseChanges.json();

        for(const change of jsonChanges){
            let responseUser = await getUser(change['user_id']);
            let jsonUser = await responseUser.json();
            this.setState({
                changes: this.state.changes.concat(change as changeData),
                changeElements: this.state.changeElements.concat(
                    <Toast className={'change'}>
                        <Toast.Header>
                            <Image src={logo} roundedCircle width={25} height={25}/>
                            <strong className={'ml-2 mr-auto'}>{jsonUser['username']}</strong>
                            <small className="mr-1">{change['dateTime'].substring(0,10)+" "+change['dateTime'].substring(11,19)}</small>
                        </Toast.Header>
                        <Toast.Body>
                            <h5>{change['context']}</h5>
                            <p>{change['textAdded']}</p>
                        </Toast.Body>
                    </Toast>
                )
            })
        }
    }

    /**
     * When selected entry is change in the <EntryMenu/> component, reload the given entry.
     * This is needed as we can go from entry to entry without unmounting this component, so we need to refetch the data.
     */
    componentDidUpdate(prevProps: Readonly<entryProps>, prevState: Readonly<entryState>) {
        if(prevProps.id !== this.props.id){
            this.setState({
                commentElements: [],
                sideBarElements: [],
                headingElements: [],
                headings: []
            })
            this.getEntry();
        }
    }


    /**
     * When going from <Landing/> to <Entry/> we have to call the getEntry() func on component mount.
     * ComponentDidUpdate() handles from going from <Entry/> to <Entry/>
     */
    componentDidMount() {
        //get entry object
        this.getEntry();
    }

    render(){

        //if we're still waiting on data to be fetched, don't display the edit tab.
        let editTabElements: JSX.Element = <></>
        if(this.props.currentUser.accountLevel === 0 && this.state.data.id !== 0 && this.state.headings.length === this.state.data.headings.length){
            editTabElements =
                <Tab eventKey="edit" title="Edit" transition={false}>
                    <EntryEditForm initHeadingData={this.state.headings} entryData={this.state.data} sideBarData={this.state.sideBar} currentUser={this.props.currentUser} wiki={this.props.wiki} reloadEntry={this.reloadEntry} reloadWiki={this.props.reloadWiki}></EntryEditForm>
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
                            <Form onSubmit={this.handleDeleteCommentSubmit}>
                                <Button variant="danger" type="submit">Delete</Button>
                                <Button className="ml-4" variant="secondary" type="button" onClick={this.handleDeleteCommentHide}>Cancel</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    <Form id="newCommentForm" onSubmit={this.handleNewCommentSubmit}>
                        <Form.Group>
                            <Image id="newCommentProfPic" src={logo} roundedCircle width={50} height={50} />
                            <Form.Control as="textarea" rows={3} placeholder="Leave a comment" onChange={this.handleCommentTextChange} value={this.state.newComment.text}/>
                        </Form.Group>
                        <Button variant="success" type="submit">Comment</Button>
                    </Form>

                    {this.state.commentElements}

                </Tab>
                <Tab eventKey="changes" title="Changes" transition={false}>
                    {this.state.changeElements}
                </Tab>
                {editTabElements}
            </Tabs>
        );
    }
}

export default Entry

