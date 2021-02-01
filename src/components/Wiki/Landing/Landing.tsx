import React from 'react';
import {url} from "../../../utils/DetermineUrl";

import {Card} from 'react-bootstrap';

import './Landing.css';

interface landingProps{
    entries: number[],
    wikiDescription: string
}

interface landingState{
    numEntries: number,
    numComments: number,
    allContributors: number[]
}

class Landing extends React.Component<landingProps, landingState>{
    constructor(props: landingProps) {
        super(props);
        this.state = {
            numEntries: 0,
            numComments: 0,
            allContributors: []
        }
    }

    componentDidMount() {
        this.props.entries.forEach(entryId => {
            fetch(url+'/entry/'+entryId,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        numComments: this.state.numComments + data['comments'].length,
                    })

                    //if entry has contributors not accounted for, add to allContributors state var
                    data['contributors'].forEach((contributorId: number) => {
                        if(!this.state.allContributors.includes(contributorId)){
                            this.setState({
                                allContributors: this.state.allContributors.concat(contributorId)
                            })
                        }
                    })
                })
        })
        this.setState({
            numEntries: this.props.entries.length
        })
    }

    render(){
        return(
            <div id="wikiLanding">
                <Card bg="dark" text="white">
                    <Card.Body>
                        <Card.Title>This wiki has...</Card.Title>
                        <ul>
                            <li>{this.state.numEntries} entry (ies)</li>
                            <li>{this.state.allContributors.length} contributor (s)</li>
                            <li>{this.state.numComments} comment (s)</li>
                        </ul>
                        <Card.Title>This wiki is...</Card.Title>
                        <ul>
                            <li>{this.props.wikiDescription}</li>
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