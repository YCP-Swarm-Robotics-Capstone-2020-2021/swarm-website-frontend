import React from 'react';

import './EntryMenu.css';

import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';

interface entryMenuProps{
    action: (entryId: string) => void
}

class EntryMenu extends React.Component<entryMenuProps, {}>{
    render(){
        return(
            <div id="entryMenu">
                <Card bg="dark" text="white">
                    <Card.Body>
                        <Card.Title onClick={() => this.props.action("landing")}>System Design and Analysis</Card.Title>
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem onClick={() => this.props.action("1")} variant="dark">Milestone 1</ListGroupItem>
                        <ListGroupItem onClick={() => this.props.action("2")} variant="dark">Milestone 2</ListGroupItem>
                        <ListGroupItem onClick={() => this.props.action("3")} variant="dark">Milestone 3</ListGroupItem>
                        <ListGroupItem onClick={() => this.props.action("4")} variant="dark">Milestone 4</ListGroupItem>
                        <ListGroupItem onClick={() => this.props.action("5")} variant="dark">Technical Report</ListGroupItem>
                    </ListGroup>
                    <Card.Footer className="text-center">Last Updated 10/23/2020</Card.Footer>
                </Card>
            </div>
        );
    }
}

export default EntryMenu