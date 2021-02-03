import {url} from '../../../utils/DetermineUrl';

export async function getEntryStats(entryId: number){
    const response = await fetch(url+'/entry/'+entryId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response;
}