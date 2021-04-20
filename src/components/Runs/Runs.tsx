import React, {useState} from 'react';
import MainNavbar from "../../utils/MainNavbar";
import {Container, Row, Col} from 'react-bootstrap';
import RunTable from './RunTable';
import Run from "./Run";

import backgroundImageStyling from '../../styles/backgroundImageStyling';

const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

const Runs: React.FC<{}> = () => {
    //used to render <RunTable/> (when 'table') or <Run/> (when anything but 'table')
    const [view, setView] = useState('table');

    const changeView = (view: string) => {
        setView(view);
    }

    return(
        <section style={background}>
            <MainNavbar logo={logo}/>
            <Container>
                <Row className={'justify-content-center my-5'}>
                    <Col>
                        {
                            //view can either by 'table' or a run id, render appropriate component
                            view === 'table' ? <RunTable changeView={changeView}/> : <Run id={view} changeView={changeView}/>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Runs