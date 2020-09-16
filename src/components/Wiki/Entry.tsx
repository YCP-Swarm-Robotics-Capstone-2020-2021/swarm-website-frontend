import React from 'react';
import {Tab, Tabs, Card, Form, Button, Image, Toast, Modal} from "react-bootstrap";

import './Entry.css';

const logo = require('../../images/swarmLogoIcon.png');

class Entry extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {replyModalShow : false};
        this.handleHide = this.handleHide.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleHide(){
        this.setState({
            replyModalShow: false
        })
    }

    handleShow(){
        this.setState({
            replyModalShow: true
        })
    }

    render(){
        return(
            <Tabs id="tabs" defaultActiveKey="details" variant="pills" bg="dark">
                <Tab eventKey="details" title="Details">
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
                <Tab eventKey="comments" title="Comments">
                    <Modal id="replyModal" show={this.state.replyModalShow} onHide={this.handleHide}>
                        <Modal.Header closeButton>
                            <Modal.Title>Reply</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Control as="textarea" rows={5} />
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
                    <Toast className='comment'>
                        <Toast.Header>
                            <Image src={logo} roundedCircle width={25} height={25}/>
                            <strong className="mr-auto ml-2">Tim Jefferson</strong>
                            <small className="mr-1">11 mins ago</small>
                            <Button variant="success" className="replyButton ml-1" size="sm" onClick={this.handleShow}><small>reply</small></Button>
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
                <Tab eventKey="edit" title="Edit">
                    <p>Edit tab</p>
                </Tab>
            </Tabs>
        );
    }
}

export default Entry

