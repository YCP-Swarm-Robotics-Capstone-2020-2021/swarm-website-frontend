import React from 'react';

import './LogRow.css';
import LogStruct from './LogStruct'
import {ListGroup} from 'react-bootstrap';

class LogRow extends React.Component<LogStruct, {}>{
    constructor(props: LogStruct){
        super(props);
    }

     // If the user clicks on a row, redirect to the selected Log
     navToLog() {
        console.log('Navigating to log file');
    }
    
    render(){
        const date = new Date(this.props.dateTime);

        return(
            <ListGroup horizontal onClick={this.navToLog}>
                <ListGroup.Item id="topRow" variant="dark">{this.props.deviceID}</ListGroup.Item>
                <ListGroup.Item id="topRow" variant="dark">{date.toLocaleDateString('en-us', {hour: '2-digit', minute:'2-digit'})}</ListGroup.Item>
            </ListGroup>
        )
    }
}

export default LogRow