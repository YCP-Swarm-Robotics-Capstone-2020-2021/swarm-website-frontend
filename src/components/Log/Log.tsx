import React from 'react';

import './Log.css';
import LogRow from './LogRow';
import LogStruct from './LogStruct';
import backgroundImageStyling from '../../styles/backgroundImageStyling';
import MainNavbar from "../../utils/MainNavbar";
import {url} from '../../utils/DetermineUrl';
import {ListGroup, Card} from "react-bootstrap";

const logo = require('../../images/swarmLogoIcon.png');

const background = backgroundImageStyling();

interface LogState{
    logs: LogStruct[]
}

class Log extends React.Component<{}, LogState>{
    
    constructor(props: {}) {
        super(props);
        this.state = {
            logs: []
        }
    }

    getLogs = async () => {
        // Request Logs from database
        let response = await fetch(url+'/log', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        // Convert response into array of json objects containing the log info
        let resp_logs =  await response.json();
        this.setState({
            logs: resp_logs
        })
        // console.log(this.state.logs);
    }

    componentDidMount() {
        // Request logs from backend
        this.getLogs();
    }

    render(){
        // Render list of Logs
        let rowList: JSX.Element[] = []
        for(const log of this.state.logs){
            rowList.push(
                <LogRow id={log.id} dateTime={log.dateTime} deviceID={log.deviceID} filePath={log.filePath}/>
            )
        }
        return(
            <section style={background}>
                <MainNavbar logo={logo}/>
                    <Card id="card" bg="dark" text="white">
                        <ListGroup horizontal>
                            <ListGroup.Item id="topRow" variant="dark">Device ID</ListGroup.Item>
                            <ListGroup.Item id="topRow" variant="dark">Date and Time</ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            {rowList}
                        </ListGroup>
                    </Card>
            </section>
        )
    }
}

export default Log