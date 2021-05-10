import React from 'react';

import './EntryMenu.css';

import {Button, Card, Form, ListGroup, ListGroupItem, Modal} from 'react-bootstrap';
import {userData} from "../../../utils/getInterfaces/userData";
import {getEntryMenuMember, getLastUpdatedDate, postEntry} from "./apiCalls";

interface entryMenuProps{
    action: (entryId: string) => void,
    reloadWiki: () => void,
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

/**
 * Display a list of entries users can click on to view,
 * also displays the last updated date for the parent wiki
 */
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

    //clear out state and call passed in reloadWiki() function to get new prop data
    reloadEntryMenu = () => {
        this.setState({
            entryList: [],
            lastUpdated: ''
        }, () => {
            this.props.reloadWiki();
            this.reloadEntryMenu();
            this.getLastUpdatedDate();
        })
    }

    //used to hide/show the #addEntryModal element below
    handleHide = () => {
        this.setState({
            addEntryModalShow: false
        })
    }
    handleShow = () => {
        this.setState({
            addEntryModalShow: true
        })
    }

    //state update handlers for the #addEntryModal element below
    handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newTitle: e.target.value
        });
    }
    handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newText: e.target.value
        });
    }

    /**
     * Form submission handler for the #addEntryModal element below
     * 
     * On successful submission hide #addEntryModal and call reloadEntryMenu() to
     * refresh the list of entries/prop data
     */
    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let result = await postEntry({
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

        if(result){
            this.handleHide();
            this.reloadEntryMenu();
        }
    }

    /**
     * Build the 'entryList' state array with <ListGroupItem/>
     * 
     * When the <ListGroupItem/>s are clicked the 'action' prop is called, which is
     * from the <Wiki/> parent component, simply switches which <Entry/> is displayed/loaded
     */
    buildEntryMenu = async () => {
        for(const entryId of this.props.entries){
            let response = await getEntryMenuMember(entryId);

            if(!response.ok){
                console.log("Issues fetching entry menu member "+entryId);
            }else{
                let json = await response.json();
                this.setState({
                    entryList: this.state.entryList.concat(
                        <ListGroupItem
                            key={entryId}
                            onClick={() => this.props.action(entryId.toString())}
                            variant="dark"
                        >{json['title']}</ListGroupItem>
                    )
                })
            }
        }
    }

    /**
     * Fetch the last updated date for the wiki, filter out the time using substring() 
     */
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