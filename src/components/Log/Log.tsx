import React from 'react';
import MainNavbar from "../../utils/MainNavbar";
import {Container, Row, Col} from 'react-bootstrap';
import RunTable from './RunTable';

import backgroundImageStyling from '../../styles/backgroundImageStyling';

const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

const Log: React.FC<{}> = () => {
    return(
        <section style={background}>
            <MainNavbar logo={logo}/>
            <Container>
                <Row className={'justify-content-center my-5'}>
                    <Col>
                        <RunTable/>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Log