import React, {useState, useEffect} from 'react';
import MainNavbar from "../../utils/MainNavbar";
import {Container, Row, Col} from 'react-bootstrap';
import {url} from "../../utils/DetermineUrl";
import RunTable from './RunTable';
import Run from "./Run";

import backgroundImageStyling from '../../styles/backgroundImageStyling';

const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

const Runs: React.FC<{}> = () => {
    //used to render <RunTable/> (when 'table') or <Run/> (when anything but 'table')
    const [view, setView] = useState('table');
    const [accessKey, setAccessKey] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const changeView = (view: string) => {
        setView(view);
    }

    useEffect(() => {
        const load = async () => {
            const response = await fetch(url+'/user/get_s3_keys');

            if(response.status === 418){
                console.log('sir this is a wendy\'s ... backend not configured correctly (aws keys not set in env)');
            }else {
                let json = await response.json()
                setAccessKey(json['access'])
                setSecretKey(json['secret'])
            }
        }
        load();
    }, [])

    return(
        <section style={background}>
            <MainNavbar logo={logo}/>
            <Container>
                <Row className={'justify-content-center my-5'}>
                    <Col>
                        {
                            //view can either by 'table' or a run id, render appropriate component
                            view === 'table' ? <RunTable changeView={changeView}/> : <Run id={view} accessKey={accessKey} secretKey={secretKey} changeView={changeView}/>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Runs