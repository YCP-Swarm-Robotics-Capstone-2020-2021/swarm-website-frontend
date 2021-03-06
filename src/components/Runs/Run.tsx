import React, {useEffect, useState} from "react";
import {Container, Row, Col, Spinner, Button, InputGroup, FormControl, Form} from "react-bootstrap";
import {url} from "../../utils/DetermineUrl";
import runWithJSONData from '../../utils/getInterfaces/runWithJSONData';
import {getS3Object} from "../../utils/getS3Object";

import './styles/Run.css';

interface runProps {
    id: string,
    accessKey: string,
    secretKey: string,
    changeView: (view: string) => void
}

const loadingSpinner = <Row className={'justify-content-center'}><Col className={'text-center'}><Spinner animation={'border'}/></Col></Row>;

const Run: React.FC<runProps> = (props: runProps) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<runWithJSONData>({id: 0, dateTime: '', deviceID: '', runID: 0, logId: 0, run:'', filePath: ''});
    const [prettyDate, setPrettyDate] = useState('');

    useEffect(() => {
        const load = async () => {
            //TOOD: fetch run data from /api/run/{props.id} or /api/run?id={props.id}
            const response = await fetch(url+'/run/'+props.id, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok) return console.log('Fetching run data failed...');
            const json = await response.json();

            //get json from s3 bucket
            json['run'] = await getS3Object("swarm-logs-bucket", json['filePath'], props.accessKey, props.secretKey);

            setData(json as runWithJSONData);
            setPrettyDate(new Date(json['dateTime']).toLocaleDateString('en-us'));

            setLoading(false);
        }
        load();
    }, [])

    return(
        <Container id={'runContainer'}>
            {
                loading ? loadingSpinner :
                    <>
                        <Row className={'justify-content-center'}>
                            <Col className={'text-center mt-2'} xs={12} sm={6} md={4} lg={4} xl={4}>
                                <InputGroup>
                                    <InputGroup.Prepend><InputGroup.Text>Date</InputGroup.Text></InputGroup.Prepend>
                                    <FormControl value={prettyDate} disabled={true}/>
                                </InputGroup>
                            </Col>
                            <Col className={'text-center mt-2'} xs={12} sm={6} md={4} lg={4} xl={4}>
                                <InputGroup>
                                    <InputGroup.Prepend><InputGroup.Text>Device</InputGroup.Text></InputGroup.Prepend>
                                    <FormControl value={data.deviceID} disabled={true}/>
                                </InputGroup>
                            </Col>
                            <Col className={'text-center mt-2'} xs={12} sm={6} md={4} lg={4} xl={4}>
                                <Button variant={'success'} onClick={() => {props.changeView('table')}}>Search Runs</Button>
                            </Col>
                        </Row>
                        <Row className={'justify-content-center mt-2'}>
                            <Col className={'text-center'}>
                                <InputGroup>
                                    <InputGroup.Prepend><InputGroup.Text>Run Data</InputGroup.Text></InputGroup.Prepend>
                                    <FormControl as={'textarea'} value={JSON.stringify(data.run, null, 2)} disabled={true}/>
                                </InputGroup>
                            </Col>
                        </Row>
                    </>
            }
        </Container>
    )
}

export default Run;