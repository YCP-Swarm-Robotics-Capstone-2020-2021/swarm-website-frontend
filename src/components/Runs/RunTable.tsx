import React, {useEffect, useState} from 'react';
import {Table, Spinner, InputGroup, FormControl, Form, Container, Row, Col, Button} from 'react-bootstrap';

import {url} from '../../utils/DetermineUrl';
import runData from '../../utils/getInterfaces/runData';
import './styles/RunTable.css'

interface runTableProps{
    changeView: (view: string) => void
}

/**
 * Render out a filter for
 * - date (initial today)
 * - description
 * - device
 *
 *  Render out a table of runs based on filter result
 */
const RunTable: React.FC<runTableProps> = (props: runTableProps) => {
    const [runs, setRuns] = useState<runData[]>([]);
    const [devices, setDevices] = useState<string[]>([]);
    const [date, setDate] = useState(new Date().toLocaleDateString('en-us'));
    const [description, setDescription] = useState('');
    const [invalidDate, setInvalidDate] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
        //will have to check that 'date' state var is indeed a valid date
    }

    //reset date/description/device to default state
    //TODO: reset device
    const resetFilter = () => {
        setDate(new Date().toLocaleDateString('en-us'));
        setDescription('');
    }

    const selectRun = (id: number) => {
        props.changeView(id.toString())
    }

    useEffect(() => {
        //load runs from api route '/run'
        const load = async () => {
            const response = await fetch(url+'/run', {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            //log to console and return from load function
            if(!response.ok){
                console.log("error fetching runs");
                return;
            }

            const json = await response.json();
            setRuns(json as runData[]);

            //build list of unique devices for current set of runs
            let uniqueDevices: string[] = []
            for(const run of json){
                if(!uniqueDevices.includes(run.deviceID)){
                    uniqueDevices.push(run.deviceID);
                }
            }
            uniqueDevices.sort(); //sort alphabetically
            setDevices(uniqueDevices);

            setLoading(false); //done loading, can render new rows/device options below
        }
        load();
    }, [])

    return(
        <>
            <Container id={'runTableFilter'} className={'mb-2'}>
                <Form id={'runTableFilterForm'} onSubmit={handleFilter}>
                    <Row>
                        <Col sm={12} md={4} lg={3} xl={3} className={'mt-2'}>
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Date</InputGroup.Text></InputGroup.Prepend>
                                <FormControl name='date' as={'input'} value={date} onChange={e => setDate(e.target.value)}/>
                            </InputGroup>
                        </Col>
                        <Col sm={12} md={8} lg={9} xl={9} className={'mt-2'}>
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Description</InputGroup.Text></InputGroup.Prepend>
                                <FormControl name='description' as={'input'} value={description} onChange={e => setDescription(e.target.value)}/>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={8} md={6} lg={4} xl={4} className={'mt-2'}>
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Device</InputGroup.Text></InputGroup.Prepend>
                                <FormControl name='device' as={'select'}>
                                    <option>-----------------------------</option>
                                    {
                                        devices.map((device) => {
                                            return <option value={device}>{device}</option>
                                        })
                                    }
                                </FormControl>
                            </InputGroup>
                        </Col>
                        <Col className={'mt-2'} xs={8} sm={4} md={4} lg={4} xl={4}>
                            <Button className={'float-left mr-2'} type={'submit'} variant={'success'}>Filter</Button>
                            <Button className={'float-left'} type={'button'} variant={'danger'} onClick={resetFilter}>Reset</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>

            <Table id='runTable' variant="dark" size="md" striped hover>
                <thead className="text-center">
                    <tr>
                        <th>Run ID #</th>
                        <th>Device Name</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    //if still loading, render a spinner, else map out a row for each runData object
                    loading ? <tr className={'text-center'}><td colSpan={3}><Spinner animation={'border'}/></td></tr> :
                        runs.map((run) => {
                            let date = new Date(run.dateTime);

                            let visualButton = <></>
                            if(run.deviceID === 'Narwhal'){
                                visualButton = <Button variant={'success'} href={'https://visualization.swarmrobotics.io?script='+run.filePath.replace('.json', '.script')} target={'_blank'}>Visualize</Button>
                            }

                            return <tr className={'text-center'} key={'runRow'+run.id}>
                                <td onClick={() => {selectRun(run.id)}}>{run.runID}</td>
                                <td onClick={() => {selectRun(run.id)}}>{run.deviceID}</td>
                                <td onClick={() => {selectRun(run.id)}}>{date.toDateString()}</td>
                                <td>{visualButton}</td>
                            </tr>
                        })
                }
                </tbody>
            </Table>
        </>
    )
}

export default RunTable;