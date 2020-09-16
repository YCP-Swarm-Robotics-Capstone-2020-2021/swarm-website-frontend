import React from 'react';
import {Tab, Tabs, Card} from "react-bootstrap";

import './Entry.css';

class Entry extends React.Component<any, any>{
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
                    <p>Comments tab</p>
                </Tab>
                <Tab eventKey="edit" title="Edit">
                    <p>Edit tab</p>
                </Tab>
            </Tabs>
        );
    }
}

export default Entry

