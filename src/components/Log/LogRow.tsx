import React from 'react';

import './LogRow.css';
import LogStruct from './LogStruct'
import {ListGroup} from 'react-bootstrap';

class LogRow extends React.Component<LogStruct, {}>{
    constructor(props: LogStruct){
        super(props);
    }

    render(){
        return(
            <ListGroup horizontal>
                <ListGroup.Item id="topRow" variant="dark">{this.props.deviceID}</ListGroup.Item>
                <ListGroup.Item id="topRow" variant="dark">{this.props.dateTime}</ListGroup.Item>
            </ListGroup>
        )
    }
}

export default LogRow