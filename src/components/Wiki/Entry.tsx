import React from 'react';
import {Tab, Tabs, Card, Form, Button, Image, Toast, Modal} from "react-bootstrap";

import './Entry.css';

const logo = require('../../images/swarmLogoIcon.png');

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
            replyModalQuote: "test"
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
                        <h2>Milestone {this.props.id}</h2>
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
                    <Toast id="comment1" className='comment'>
                        <Toast.Header>
                            <Image src={logo} roundedCircle width={25} height={25}/>
                            <strong className="mr-auto ml-2">Tim Jefferson</strong>
                            <small className="mr-1">11 mins ago</small>
                            <Button variant="success" className="replyButton ml-1" size="sm" onClick={() => this.handleShow("1")}><small>reply</small></Button>
                        </Toast.Header>
                        <Toast.Body>Hello, world! This is a toast message. I enjoy butter on my toast...</Toast.Body>
                    </Toast>
                    <Toast className='comment'>
                        <Toast.Header>
                            <Image src={logo} roundedCircle width={25} height={25}/>
                            <strong className="mr-auto ml-2">Thomas McAdams</strong>
                            <small className="mr-1">15 mins ago</small>
                            <Button variant="success" className="replyButton ml-1" size="sm"><small>reply</small></Button>
                        </Toast.Header>
                        <Toast.Body>Hello, world! This is a toast message. I butter my bagels...</Toast.Body>
                    </Toast>
                    <Toast className='comment'>
                        <Toast.Header>
                            <Image src={logo} roundedCircle width={25} height={25}/>
                            <strong className="mr-auto ml-2">Earl Kennedy</strong>
                            <small className="mr-1">21 mins ago</small>
                            <Button variant="success" className="replyButton ml-1" size="sm"><small>reply</small></Button>
                        </Toast.Header>
                        <Toast.Body>Hello, world! This is a toast message. 86 errors? 100, take it or leave it</Toast.Body>
                    </Toast>
                    <Toast className='comment'>
                        <Toast.Header>
                            <Image src={logo} roundedCircle width={25} height={25}/>
                            <strong className="mr-auto ml-2">Collin Brandt</strong>
                            <small className="mr-1">25 min ago</small>
                            <Button variant="success" className="replyButton ml-1" size="sm"><small>reply</small></Button>
                        </Toast.Header>
                        <Toast.Body>Hello, world! This is a toast message. Just forget it.</Toast.Body>
                    </Toast>
                </Tab>
                <Tab eventKey="edit" title="Edit" transition={false}>
                    <p>Edit tab</p>
                </Tab>
            </Tabs>
        );
    }
}

export default Entry

