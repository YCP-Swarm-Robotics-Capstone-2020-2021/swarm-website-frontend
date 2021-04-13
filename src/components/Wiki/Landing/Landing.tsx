import React from 'react';

import {Card} from 'react-bootstrap';

import './Landing.css';
import {getEntryStats} from "./apiCalls";

interface landingProps{
    entries: number[],
    wikiDescription: string
}

interface landingState{
    numEntries: number,
    numComments: number,
    allContributors: number[]
}

/**
 * route: /wiki/{id}
 * 
 * Displays stats for a given wiki and also the wiki description
 * 
 * TODO:
 *  - add some kind of graph for activity over time (currently a placeholder)
 */
class Landing extends React.Component<landingProps, landingState>{
    constructor(props: landingProps) {
        super(props);
        this.state = {
            numEntries: 0,
            numComments: 0,
            allContributors: []
        }
    }

    //for each entry id, get all of its data
    buildLandingStats = async () => {
        for(const entryId of this.props.entries){
            let response = await getEntryStats(entryId);
            let json = await response.json();

            //increment total comments for a wiki, add number of comments for each entry
            this.setState({
                numComments: this.state.numComments + json['comments'].length
            })

            //get a list of unique contributor ids, the length of the 'allContributors' state var is then rendered below
            json['contributors'].forEach((contributorId: number) => {
                if(!this.state.allContributors.includes(contributorId)){
                    this.setState({
                        allContributors: this.state.allContributors.concat(contributorId)
                    })
                }
            })
        }

        this.setState({
            numEntries: this.props.entries.length
        })
    }

    componentDidMount() {
        this.buildLandingStats()
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