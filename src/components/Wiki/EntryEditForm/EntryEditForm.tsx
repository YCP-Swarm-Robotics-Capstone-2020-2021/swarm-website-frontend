import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {deleteEntry} from "../Entry/deleteEntry";
import {updateEntry} from "./UpdateEntry";
import {entryData} from "../../../utils/getInterfaces/entryData";
import './EntryEditForm.css';
import {newHeadingData} from "../../../utils/postInterfaces/newHeadingData";
import {sideBarData} from "../../../utils/getInterfaces/sideBarData";
import {postHeading} from "./postHeading";
import {userData} from "../../../utils/getInterfaces/userData";


interface entryEditFormProps{
    headingEditElements: JSX.Element[],
    entryData: entryData,
    sideBarData: sideBarData,
    currentUser: userData
}

interface entryEditFormState{
    entryData: entryData,
    sideBarData: sideBarData,
    headingEditElements: JSX.Element[],
    sideBarElements: JSX.Element[],
    newHeading: newHeadingData
    deleteEntryModal: boolean
    addHeadingModal: boolean
}

class EntryEditForm extends React.Component<entryEditFormProps, entryEditFormState>{
    constructor(props: entryEditFormProps) {
        super(props);
        this.state = {
            entryData: {id: 0, title: '', text: '', sideBar: 0, comments: [], contributors: [], headings: [], log: []},
            sideBarData: {id: 0, content: {}},
            headingEditElements: [],
            sideBarElements: [],
            newHeading: {title: '', text: '', log: []},
            deleteEntryModal: false,
            addHeadingModal: false
        }
    }

    handleEntryDeleteModalHide = () => {
        this.setState({
            deleteEntryModal: false
        })
    }

    handleEntryDeleteModalShow = () => {
        this.setState({
            deleteEntryModal: true
        })
    }

    handleNewHeadingModalHide = () => {
        this.setState({
            addHeadingModal: false
        })
    }

    handleNewHeadingModalShow = () =>{
        this.setState({
            addHeadingModal: true
        })
    }

    handleEntryDeleteSubmit = () =>{
        deleteEntry(this.props.entryData);
    }

    handleEntryUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        updateEntry(this.state.entryData);
    }

    handleNewHeadingSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        postHeading(
            this.state.newHeading,
            {
                context: this.state.newHeading.title,
                textAdded: this.state.newHeading.text,
                user: this.props.currentUser.id
            },
            this.props.entryData);
    }

    handleEntryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const entryInfo = this.state.entryData;
        const newEntryInfo = {
            ...entryInfo,
            [e.target.name]: e.target.value
        }
        this.setState({entryData: newEntryInfo})
    }

    handleNewHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        const newHeadingInfo = this.state.newHeading;
        const newNewHeadingInfo = {
            ...newHeadingInfo,
            [e.target.name]: e.target.value
        }
        this.setState({newHeading: newNewHeadingInfo})
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

    buildSideBarElements = () =>{
        if(this.state.sideBarData.content !== null) {
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
            setTimeout( () => {
                this.setState({
                    entryData: this.props.entryData,
                    sideBarData: this.props.sideBarData,
                    sideBarElements: [],
                    headingEditElements: this.props.headingEditElements
                })
                this.buildSideBarElements();
            }, 200)
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
                sideBarElements: [],
                headingEditElements: this.props.headingEditElements
            });
            this.buildSideBarElements();
        }, 200)

    }

    render(){
        return(
            <div>
                <Modal id="deleteEntryModal" show={this.state.deleteEntryModal} onHide={this.handleEntryDeleteModalHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Confirm deletion of entry "<b>{this.props.entryData.title}</b>"</p>
                            <Button variant="danger" type="button" onClick={this.handleEntryDeleteSubmit}>Delete</Button>
                            <Button className="ml-4" variant="secondary" type="button" onClick={this.handleEntryDeleteModalHide}>Cancel</Button>
                    </Modal.Body>
                </Modal>
                <Modal id="addHeadingModal" show={this.state.addHeadingModal} onHide={this.handleNewHeadingModalHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id="newHeadingForm" onSubmit={this.handleNewHeadingSubmit}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="title" as="input" value={this.state.newHeading.title} onChange={this.handleNewHeadingChange} required/>
                                <Form.Label className='mt-3'>Text</Form.Label>
                                <Form.Control name="text" as='textarea' rows={3} value={this.state.newHeading.text} onChange={this.handleNewHeadingChange} required></Form.Control>
                            </Form.Group>
                            <Button variant="success" type="submit">Submit</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Form id="editForm" onSubmit={this.handleEntryUpdateSubmit}>
                    <Form.Group>
                        <Form.Label className="editEntryLabel"><u>Title</u></Form.Label>
                        <Form.Control id="title" name="title" onChange={this.handleEntryChange} value={this.state.entryData.title}></Form.Control>
                        <Form.Label className="editEntryLabel"><u>Description</u></Form.Label>
                        <Form.Control name="text" onChange={this.handleEntryChange} value={this.state.entryData.text}></Form.Control>
                        <Form.Label className="editEntryLabel"><u>Headings</u></Form.Label>
                        {this.state.headingEditElements}
                    </Form.Group>
                    <Form.Group id="headingButton">
                        <Button onClick={this.handleNewHeadingModalShow}>Add Heading</Button>
                    </Form.Group>
                    <Form.Group id="sideBarLabelGroup">
                        <Form.Label className="editEntryLabel"><u>Sidebar</u></Form.Label>
                    </Form.Group>
                    <Form.Group id="sideBarEdit" >
                        {this.state.sideBarElements}
                    </Form.Group>
                    <Form.Group id="submitGroup">
                        <Button id="submitButton" variant="success" type="submit">Save</Button>
                        <Button onClick={this.handleEntryDeleteModalShow} variant="danger" type="button" className="mr-4">Delete Entry</Button>
                        <Button onClick={() => console.log("delete wiki button hit")} variant="warning" type="button">Delete Wiki</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default EntryEditForm