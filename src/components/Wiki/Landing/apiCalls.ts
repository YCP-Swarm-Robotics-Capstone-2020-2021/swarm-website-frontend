import {url} from '../../../utils/DetermineUrl';
import {cookies} from "../../../utils/Cookies";

export async function getEntryStats(entryId: number){
    const response = await fetch(url+'/entry/'+entryId, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + cookies.get("access"),
            'Content-Type': 'application/json'
        }
    })
    return response;
}