import React from 'react';

import './EntryMenu.css';

import {Button, Card, Form, ListGroup, ListGroupItem, Modal} from 'react-bootstrap';

interface entryMenuProps{
    action: (entryId: string) => void,
    wikiTitle: string,
    entries: number[],
}

interface entryMenuState{
    entryList: JSX.Element[]
    addEntryModalShow: boolean
}

class EntryMenu extends React.Component<entryMenuProps, entryMenuState>{
    constructor(props: entryMenuProps) {
        super(props);
        this.state = {
            entryList: [],
            addEntryModalShow: false
        }
        this.handleHide = this.handleHide.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleHide(){
        this.setState({
            addEntryModalShow: false
        })
    }

    handleShow(){
        this.setState({
            addEntryModalShow: true
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.entries.forEach(entryId =>
                fetch('http://localhost:8000/entry/'+entryId,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => this.setState({
                        entryList: this.state.entryList.concat(<ListGroupItem onClick={() => this.props.action(entryId.toString())} variant="dark">{data['title']}</ListGroupItem>)
                    }))
            );
        }, 300);
    }

    render(){
        return(
            <div id="entryMenu">
                <Card bg="dark" text="white">
                    <Card.Body>
                        <Card.Title onClick={() => this.props.action("landing")}>{this.props.wikiTitle}</Card.Title>
                    </Card.Body>
                    <ListGroup>
                        {this.state.entryList}
                        <ListGroupItem variant="info" id='addEntry' onClick={() => this.handleShow()}>Add Entry</ListGroupItem>

                        <Modal id="addEntryModal" show={this.state.addEntryModalShow} onHide={this.handleHide}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add an entry</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control as="input"/>
                                        <Form.Label className='mt-3'>Description</Form.Label>
                                        <Form.Control as='textarea' rows={3}></Form.Control>
                                    </Form.Group>
                                    <Button variant="success" type="submit">Save</Button>
                                </Form>
                            </Modal.Body>
                        </Modal>

                    </ListGroup>
                    <Card.Footer className="text-center">Last Updated 10/23/2020</Card.Footer>
                </Card>
            </div>
        );
    }
}

export default EntryMenu