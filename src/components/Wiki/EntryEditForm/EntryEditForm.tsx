import React from 'react';
import {Button, Form} from "react-bootstrap";
import {deleteEntry} from "../Entry/deleteEntry";
import {entryData} from "../../../utils/getInterfaces/entryData";
import './EntryEditForm.css';


interface entryEditFormProps{
    headingEditElements: JSX.Element[],
    entryData: entryData,
}

interface entryEditFormState{
    entryData: entryData
}

class EntryEditForm extends React.Component<entryEditFormProps, entryEditFormState>{
    constructor(props: entryEditFormProps) {
        super(props);
        this.setState({
            entryData: this.props.entryData
        })

        this.handleEntryDeleteSubmit = this.handleEntryDeleteSubmit.bind(this);
    }

    handleEntryDeleteSubmit(){
        //e.preventDefault();
        console.log("Delete Entry button pressed");
        deleteEntry(this.props.entryData);
    }

    render(){
        return(
            <Form id="editForm">
                <Form.Group>
                    <Form.Label className="editEntryLabel">Title</Form.Label>
                    <Form.Control id="title" value={this.props.entryData.title}></Form.Control>
                    <Form.Label className="editEntryLabel">Description</Form.Label>
                    <Form.Control value={this.props.entryData.text}></Form.Control>
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
                    <Button onClick={this.handleEntryDeleteSubmit} variant="danger" type="button">Delete Entry</Button>
                </Form.Group>
            </Form>
        )
    }
}

export default EntryEditForm