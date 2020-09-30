import React from 'react';

import {Card, ListGroupItem} from 'react-bootstrap';

import './Landing.css';

interface landingProps{
    entries: number[]
}

interface landingState{
    numEntries: number,
    numComments: number,
    numContributors: number
}

class Landing extends React.Component<landingProps, landingState>{
    constructor(props: landingProps) {
        super(props);
        this.state = {
            numEntries: 0,
            numComments: 0,
            numContributors: 0
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.entries.forEach(entryId => {
                fetch('http://localhost:8000/entry/'+entryId+'/',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => this.setState({
                        numComments: this.state.numComments + data['comments'].length,
                        numContributors: this.state.numContributors + data['contributors'].length
                    }))
            })
            this.setState({
                numEntries: this.props.entries.length
            })
        }, 100);
    }

    render(){
        return(
            <div id="wikiLanding">
                <Card bg="dark" text="white">
                    <Card.Body>
                        <Card.Title>This wiki has...</Card.Title>
                        <ul id="statList">
                            <li>{this.state.numEntries} entry (ies)</li>
                            <li>{this.state.numContributors} contributor (s)</li>
                            <li>{this.state.numComments} comment (s)</li>
                        </ul>
                    </Card.Body>
                    <div id="graph">
                        <p>Graph of activity over time?</p>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Landing