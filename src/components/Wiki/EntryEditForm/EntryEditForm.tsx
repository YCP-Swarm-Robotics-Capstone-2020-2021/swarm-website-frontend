import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {deleteEntry} from "../Entry/deleteEntry";
import {updateEntry} from "./UpdateEntry";
import {entryData} from "../../../utils/getInterfaces/entryData";
import './EntryEditForm.css';
import {newEntryData} from "../../../utils/postInterfaces/newEntryData";
import {sideBarData} from "../../../utils/getInterfaces/sideBarData";


interface entryEditFormProps{
    headingEditElements: JSX.Element[],
    entryData: entryData,
    sideBarData: sideBarData
}

interface entryEditFormState{
    entryData: entryData,
    sideBarData: sideBarData,
    sideBarElements: JSX.Element[],
    deleteEntryModal: boolean
}

class EntryEditForm extends React.Component<entryEditFormProps, entryEditFormState>{
    constructor(props: entryEditFormProps) {
        super(props);
        this.state = {
            entryData: {id: 0, title: '', text: '', sideBar: 0, comments: [], contributors: [], headings: [], log: []},
            sideBarData: {id: 0, content: {}},
            sideBarElements: [],
            deleteEntryModal: false
        }
        this.handleHide = this.handleHide.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleEntryDeleteSubmit = this.handleEntryDeleteSubmit.bind(this);
        this.handleEntryUpdateSubmit = this.handleEntryUpdateSubmit.bind(this);
        this.buildSideBarElements = this.buildSideBarElements.bind(this);
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

    handleSideBarChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let sideBarContentString = JSON.stringify(this.state.sideBarData.content);

        //replace value/parse to json
        let adjusted = sideBarContentString.replace("\""+e.target.id+"\"", "\""+e.target.value+"\"");
        let adjustedJSON = JSON.parse(adjusted);

        this.setState({
            sideBarData: {
                ...this.state.sideBarData,
                content: adjustedJSON
            }
        })
    }

    buildSideBarElements(){
        if(this.state.sideBarData !== null) {
            for (const [key, value] of Object.entries(this.state.sideBarData.content)) {
                this.setState({
                    sideBarElements: this.state.sideBarElements.concat(
                        <div>
                            <Form.Control className="float-left" id={key} value={key} onChange={this.handleSideBarChange}></Form.Control>
                            <Form.Control className="float-right" id={value} value={value} onChange={this.handleSideBarChange}></Form.Control>
                        </div>
                    )
                })
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<entryEditFormProps>, prevState: Readonly<entryEditFormState>, snapshot?: any) {
        if(prevProps.entryData.id !== this.props.entryData.id){
            this.setState({
                entryData: this.props.entryData,
                sideBarData: this.props.sideBarData,
                sideBarElements: []
            });
            this.buildSideBarElements();
        }
        // else if(prevState.sideBarData.content !== this.state.sideBarData.content){
        //     console.log("sideBar state change");
        //     this.setState({
        //         sideBarElements: []
        //     })
        //     console.log(this.state.sideBarElements.length);
        //     this.buildSideBarElements();
        // }
    }

    componentDidMount() {
        setTimeout( () => {
            this.setState({
                entryData: this.props.entryData,
                sideBarData: this.props.sideBarData,
            });
            this.buildSideBarElements();
        }, 200)

    }

    render(){
        return(
            <div>
                <Modal id="deleteEntryModal" show={this.state.deleteEntryModal} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Confirm deletion of entry "<b>{this.props.entryData.title}</b>"</p>
                            <Button variant="danger" type="button" onClick={this.handleEntryDeleteSubmit}>Delete</Button>
                            <Button className="ml-4" variant="secondary" type="button" onClick={this.handleHide}>Cancel</Button>
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
                        {this.state.sideBarElements}
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