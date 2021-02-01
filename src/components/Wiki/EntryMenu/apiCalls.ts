import {url} from '../../../utils/DetermineUrl';

export async function getEntryMenuMember(entryId: number){
    const response = await fetch(url+'/entry/' + entryId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response;
}