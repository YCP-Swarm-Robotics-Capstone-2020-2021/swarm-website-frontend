import React, {useEffect, useState} from "react";
import {Container, Row, Col, Spinner} from "react-bootstrap";
import {url} from "../../utils/DetermineUrl";
import runData from "../../utils/getInterfaces/runData";

import './styles/Run.css';

interface runProps {
    id: string,
    changeView: (view: string) => void
}

const Run: React.FC<runProps> = (props: runProps) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<runData>({id: 0, dateTime: '', deviceID: '', runID: 0, logId: 0});

    useEffect(() => {
        const load = async () => {
            //TOOD: fetch run data from /api/run/{props.id} or /api/run?id={props.id}
            const response = await fetch(url+'/run?id='+props.id, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok) return console.log('Fetching run data failed...');
            const json = await response.json();

            setData(json[0] as runData);
            setLoading(false);
        }
        load();
    }, [])

    return(
        <Container id={'runContainer'}>
            <Row className={'justify-content-center'}>
                <Col className={'text-center'}>
                    {
                        loading ? <Spinner animation={'border'}/> : <h3>{data.runID + data.deviceID + data.dateTime}</h3>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Run;