import React, {useEffect, useState} from 'react';
import {Table, Spinner} from 'react-bootstrap';

import {url} from '../../utils/DetermineUrl';
import runData from '../../utils/getInterfaces/runData';

const RunTable: React.FC<{}> = () => {
    const [runs, setRuns] = useState<runData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //load runs from api route '/run'
        const load = async () => {
            const response = await fetch(url+'/run', {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok){
                console.log("error fetching runs");
                return;
            }

            const json = await response.json();
            setRuns(json as runData[]);
            setLoading(false);
        }
        load();
    }, [])

    return(
        <Table id='runTable' variant="dark" size="md" striped hover>
            <thead className="text-center">
                <th>Run ID #</th>
                <th>Device Name</th>
                <th>Date</th>
            </thead>
            <tbody>
                {
                //if still loading, render a spinner, else map out a row for each runData object
                loading ? <tr className={'text-center'}><td colSpan={3}><Spinner animation={'border'}/></td></tr> :
                    runs.map((run) => {
                        let date = new Date(run.dateTime);
                        return <tr className={'text-center'}>
                            <td>{run.runID}</td>
                            <td>{run.deviceID}</td>
                            <td>{date.toDateString()}</td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
    )
}

export default RunTable;