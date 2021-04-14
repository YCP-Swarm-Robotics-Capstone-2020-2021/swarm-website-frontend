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
        // Convert date time to string
        const date = new Date(this.props.dateTime); //.toString();

        return(
            <tr className="text-center" onClick={this.navToLog}>
                <th>{this.props.id}</th>
                <th>{this.props.deviceID}</th>
                <th>{date.toDateString()}</th>
            </tr>
        )
    }
}

export default LogRow