import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {deleteEntry} from "../Entry/deleteEntry";
import {updateEntry} from "./UpdateEntry";
import {entryData} from "../../../utils/getInterfaces/entryData";
import './EntryEditForm.css';
import {newEntryData} from "../../../utils/postInterfaces/newEntryData";


interface entryEditFormProps{
    headingEditElements: JSX.Element[]
    entryData: entryData
}

interface entryEditFormState{
    entryData: entryData
    deleteEntryModal: boolean
}

class EntryEditForm extends React.Component<entryEditFormProps, entryEditFormState>{
    constructor(props: entryEditFormProps) {
        super(props);
        this.state = {
            entryData: {id: 0, title: '', text: '', sideBar: 0, comments: [], contributors: [], headings: [], log: []},
            deleteEntryModal: false
        }
        this.handleHide = this.handleHide.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleEntryDeleteSubmit = this.handleEntryDeleteSubmit.bind(this);
        this.handleEntryUpdateSubmit = this.handleEntryUpdateSubmit.bind(this);
    }

    handleHide(){
        this.setState({
            deleteEntryModal: false
        })
    }

    handleShow(){
        this.setState({
            deleteEntryModal: true
        })
    }

    handleEntryDeleteSubmit(){
        deleteEntry(this.props.entryData);
    }

    handleEntryUpdateSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        updateEntry(this.state.entryData);
    }

    handleEntryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const entryInfo = this.state.entryData;
        const newEntryInfo = {
            ...entryInfo,
            [e.target.name]: e.target.value
        }
        this.setState({entryData: newEntryInfo})
    }

    componentDidMount() {
        setTimeout( () => {
            this.setState({
                entryData: this.props.entryData
            })
        }, 100)
    }

    render(){
        return(
            <div>
                <Modal id="deleteEntryModal" show={this.state.deleteEntryModal} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <p>Confirm deletion of entry "{this.props.entryData.title}"</p>
                            <Button variant="danger" type="button" onClick={this.handleEntryDeleteSubmit}>Delete</Button>
                            <Button className="ml-4" variant="info" type="button" onClick={this.handleHide}>Cancel</Button>
                    </Modal.Body>
                </Modal>
                <Form id="editForm" onSubmit={this.handleEntryUpdateSubmit}>
                    <Form.Group>
                        <Form.Label className="editEntryLabel">Title</Form.Label>
                        <Form.Control id="title" name="title" onChange={this.handleEntryChange} value={this.state.entryData.title}></Form.Control>
                        <Form.Label className="editEntryLabel">Description</Form.Label>
                        <Form.Control name="text" onChange={this.handleEntryChange} value={this.state.entryData.text}></Form.Control>
                        {this.props.headingEditElements}
                    </Form.Group>
                    <Form.Group id="sideBarLabelGroup">
                        <Form.Label className="editEntryLabel">Sidebar</Form.Label>
                    </Form.Group>
                    <Form.Group id="sideBarEdit" >
                        <Form.Control className="float-left" value="Test"></Form.Control>
                        <Form.Control className="float-right" value="Test 2"></Form.Control>

                        <Form.Control className="float-left" value="Test"></Form.Control>
                        <Form.Control className="float-right" value="Test 2"></Form.Control>

                        <Form.Control className="float-left" value="Test"></Form.Control>
                        <Form.Control className="float-right" value="Test 2"></Form.Control>
                    </Form.Group>
                    <Form.Group id="submitGroup">
                        <Button id="submitButton" variant="success" type="submit">Save</Button>
                        <Button onClick={this.handleShow} variant="danger" type="button">Delete Entry</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default EntryEditForm