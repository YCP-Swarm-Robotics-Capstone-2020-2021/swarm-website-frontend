import React from 'react';

import './EntryMenu.css';

import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';

interface entryMenuProps{
    action: (entryId: string) => void,
    wikiTitle: string,
    entries: number[],
}

interface entryMenuState{
    entryList: JSX.Element[]
}

class EntryMenu extends React.Component<entryMenuProps, entryMenuState>{
    constructor(props: entryMenuProps) {
        super(props);
        this.state = {
            entryList: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.entries.forEach(entryId =>
                fetch('http://localhost:8000/entry/'+entryId,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => this.setState({
                        entryList: this.state.entryList.concat(<ListGroupItem onClick={() => this.props.action(entryId.toString())} variant="dark">{data['title']}</ListGroupItem>)
                    }))
            );
        }, 300);
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
                    </ListGroup>
                    <Card.Footer className="text-center">Last Updated 10/23/2020</Card.Footer>
                </Card>
            </div>
        );
    }
}

export default EntryMenu