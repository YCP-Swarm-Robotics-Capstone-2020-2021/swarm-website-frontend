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

export async function getLastUpdatedDate(wikiId: number){
    const response  = await fetch(url+'/wiki/get_last_updated?id='+wikiId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response;
}