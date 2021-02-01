import {url} from '../../utils/DetermineUrl';

export async function getWiki(id: string){
    const response = await fetch(url+'/wiki/'+id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response;
}