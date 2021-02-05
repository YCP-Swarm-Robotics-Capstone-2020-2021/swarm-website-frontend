import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {deleteEntry} from "../Entry/deleteEntry";
import {updateEntry} from "./updateEntry";
import {entryData} from "../../../utils/getInterfaces/entryData";
import './EntryEditForm.css';
import {newHeadingData} from "../../../utils/postInterfaces/newHeadingData";
import {sideBarData} from "../../../utils/getInterfaces/sideBarData";
import {postHeading} from "./postHeading";
import {userData} from "../../../utils/getInterfaces/userData";
import {deleteWiki} from "../deleteWiki";
import {headingData} from "../../../utils/getInterfaces/headingData";
import {wikiData} from "../../../utils/getInterfaces/wikiData";
import {updateWiki} from "../updateWiki";
import {deleteHeading} from "./deleteHeading";
import {updateHeadings} from "./updateHeadings";


interface entryEditFormProps{
    initHeadingData: headingData[],
    entryData: entryData,
    sideBarData: sideBarData,
    currentUser: userData,
    wiki: wikiData,
    reloadEntry: () => void
}

interface entryEditFormState{
    wikiData: wikiData,
    entryData: entryData,
    sideBarData: sideBarData,
    headingData: headingData[],
    headingEditElements: JSX.Element[],
    sideBarElements: JSX.Element[],
    newHeading: newHeadingData
    deleteWikiModal: boolean
    deleteEntryModal: boolean
    addHeadingModal: boolean
}

class EntryEditForm extends React.Component<entryEditFormProps, entryEditFormState>{
    constructor(props: entryEditFormProps) {
        super(props);
        this.state = {
            wikiData: this.props.wiki,
            entryData: {id: 0, title: '', text: '', sideBar: 0, comments: [], contributors: [], headings: [], log: []},
            sideBarData: {id: 0, content: {}},
            headingData: [],
            headingEditElements: [],
            sideBarElements: [],
            newHeading: {title: '', text: '', log: []},
            deleteWikiModal: false,
            deleteEntryModal: false,
            addHeadingModal: false,
        }
    }

    handleWikiDeleteModalHide = () => {
        this.setState({
            deleteWikiModal: false
        })
    }

    handleWikiDeleteModalShow = () => {
        this.setState({
            deleteWikiModal: true
        })
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

    handleWikiDeleteSubmit = () =>{
        deleteWiki(this.props.wiki);
    }

    handleEntryDeleteSubmit = () =>{
        deleteEntry(this.props.entryData);
    }

    handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateEntry(this.state.entryData);
        updateWiki(this.state.wikiData);
        updateHeadings(this.state.headingData);
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

    handleWikiChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const wikiInfo = this.state.wikiData;
        const newWikiInfo = {
            ...wikiInfo,
            [e.target.name]: e.target.value
        }
        this.setState({wikiData: newWikiInfo})
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

    handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        let index: number = parseInt(e.target.id);

        let newArray = [...this.state.headingData];
        newArray[index] = {...newArray[index], [e.target.name]: e.target.value};

        this.setState({headingData: newArray}, () => {console.log(this.state.headingData)});
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

    buildHeadingEditElements = () => {
        if(this.state.headingData.length > 0) {
            let i: number;
            for (i = 0; i < this.state.headingData.length; i++) {
                this.setState({
                    headingEditElements: this.state.headingEditElements.concat(
                        <div>
                            <Form.Control id={i.toString()} className="heading" as="input"
                                          defaultValue={this.state.headingData[i].title} name="title"
                                          onChange={this.handleHeadingChange}></Form.Control>
                            <Form.Control id={i.toString()} defaultValue={this.state.headingData[i].text} as="textarea"
                                          rows={4} name="text" onChange={this.handleHeadingChange}></Form.Control>
                            <Button onClick={() => deleteHeading(this.state.headingData[i].id)}
                                    variant="danger">Delete</Button>
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
                    headingData: this.props.initHeadingData,
                    headingEditElements: []
                })
                this.buildSideBarElements();
                this.buildHeadingEditElements();
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
                headingData: this.props.initHeadingData,
                headingEditElements: []
            });
            this.buildSideBarElements();
            this.buildHeadingEditElements();
        }, 200)

    }

    render(){
        return(
            <div>
                <Modal id="deleteWikiModal" show={this.state.deleteWikiModal} onHide={this.handleWikiDeleteModalHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Confirm deletion of current wiki</p>
                        <Button variant="danger" type="button" onClick={this.handleWikiDeleteSubmit}>Delete</Button>
                        <Button className="ml-4" variant="secondary" type="button" onClick={this.handleWikiDeleteModalHide}>Cancel</Button>
                    </Modal.Body>
                </Modal>
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
                <Form id="editForm" onSubmit={this.handleEditFormSubmit}>
                    <Form.Group>
                        <Form.Label className="editEntryLabel"><u>Wiki Title</u></Form.Label>
                        <Form.Control id="title" name="title" onChange={this.handleWikiChange} value={this.state.wikiData.title}></Form.Control>
                        <Form.Label className="editEntryLabel"><u>Wiki Description</u></Form.Label>
                        <Form.Control id="description" name="briefDescription" onChange={this.handleWikiChange} value={this.state.wikiData.briefDescription}></Form.Control>
                        <br/>
                        <Form.Label className="editEntryLabel"><u>Entry Title</u></Form.Label>
                        <Form.Control id="title" name="title" onChange={this.handleEntryChange} value={this.state.entryData.title}></Form.Control>
                        <Form.Label className="editEntryLabel"><u>Entry Description</u></Form.Label>
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
                        <Button onClick={this.handleWikiDeleteModalShow} variant="warning" type="button">Delete Wiki</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default EntryEditForm