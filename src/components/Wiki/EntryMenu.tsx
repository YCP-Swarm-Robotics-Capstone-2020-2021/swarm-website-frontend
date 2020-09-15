import React from 'react';

import './EntryMenu.css';

import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';

class EntryMenu extends React.Component{
    render(){
        return(
            <div id="entryMenu">
                <Card bg="dark" text="white">
                    <Card.Body>
                        <Card.Title>System Design and Analysis</Card.Title>
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem variant="dark">Milestone 1</ListGroupItem>
                        <ListGroupItem variant="dark">Milestone 2</ListGroupItem>
                        <ListGroupItem variant="dark">Milestone 3</ListGroupItem>
                        <ListGroupItem variant="dark">Milestone 4</ListGroupItem>
                        <ListGroupItem variant="dark">Technical Report</ListGroupItem>
                    </ListGroup>
                    <Card.Footer className="text-center">Last Updated 10/23/2020</Card.Footer>
                </Card>
            </div>
        );
    }
}

export default EntryMenu