import React from 'react';

import './EntryMenu.css';

import {Button, Card, Form, ListGroup, ListGroupItem, Modal} from 'react-bootstrap';
import {postEntry} from "./postEntry";
import {userData} from "../../../utils/getInterfaces/userData";
import {getEntryMenuMember, getLastUpdatedDate} from "./apiCalls";

interface entryMenuProps{
    action: (entryId: string) => void,
    wikiTitle: string,
    wikiId: number,
    entries: number[],
    currentUser: userData
}

interface entryMenuState{
    entryList: JSX.Element[]
    addEntryModalShow: boolean
    newTitle: string,
    newText: string,
    lastUpdated: string
}

class EntryMenu extends React.Component<entryMenuProps, entryMenuState>{
    constructor(props: entryMenuProps) {
        super(props);
        this.state = {
            entryList: [],
            addEntryModalShow: false,
            newTitle: '',
            newText: '',
            lastUpdated: ''
        }
    }

    //modal hide
    handleHide = () => {
        this.setState({
            addEntryModalShow: false
        })
    }

    //modal show
    handleShow = () => {
        this.setState({
            addEntryModalShow: true
        })
    }

    //update state when title is change in form
    handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newTitle: e.target.value
        });
    }

    //update state when text is change in form
    handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newText: e.target.value
        });
    }

    //submit data based on updated state
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postEntry({
            title: this.state.newTitle,
            text: this.state.newText,
            sideBar: null,
            contributors: [this.props.currentUser.id],
            log: null
        }, {
            context: this.state.newTitle,
            textAdded: this.state.newText,
            user: this.props.currentUser.id
        }, this.props.wikiId, this.props.entries)
    }

    buildEntryMenu = async () => {
        for(const entryId of this.props.entries){
            let response = await getEntryMenuMember(entryId);

            if(!response.ok){
                console.log("Issues fetching entry menu member "+entryId);
            }else{
                return response.json().then(json => {
                    this.setState({
                        entryList: this.state.entryList.concat(
                            <ListGroupItem
                                key={entryId}
                                onClick={() => this.props.action(entryId.toString())}
                                variant="dark"
                            >{json['title']}</ListGroupItem>
                        )
                    })
                })
            }
        }
    }

    getLastUpdatedDate = async () => {
        let response = await getLastUpdatedDate(this.props.wikiId);

        if(!response.ok){
            console.log('Issues getting last updated date...');
        }else{
            return response.json().then(json => {
                this.setState({lastUpdated: json['date'].substring(0,10)})
            })
        }
    }

    componentDidMount() {
        this.buildEntryMenu();
        this.getLastUpdatedDate();
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
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control name="title" as="input" onChange={this.handleTitleChange} required/>
                                        <Form.Label className='mt-3'>Description</Form.Label>
                                        <Form.Control name="text" as='textarea' rows={3} onChange={this.handleTextChange} required></Form.Control>
                                    </Form.Group>
                                    <Button variant="success" type="submit">Save</Button>
                                </Form>
                            </Modal.Body>
                        </Modal>

                    </ListGroup>
                    <Card.Footer className="text-center">Last Updated: {this.state.lastUpdated}</Card.Footer>
                </Card>
            </div>
        );
    }
}

export default EntryMenu