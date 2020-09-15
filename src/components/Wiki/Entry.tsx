import React from 'react';
import {Tab, Tabs} from "react-bootstrap";

import './Entry.css';

class Entry extends React.Component{
    render(){
        return(
            <Tabs id="tabs" defaultActiveKey="details" variant="pills" bg="dark">
                <Tab eventKey="details" title="Details">
                    <p>Details tab</p>
                </Tab>
                <Tab eventKey="edit" title="Edit">
                    <p>Edit tab</p>
                </Tab>
            </Tabs>
        );
    }
}

export default Entry

