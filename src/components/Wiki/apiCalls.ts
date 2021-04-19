import {url} from '../../utils/DetermineUrl';
import {cookies} from "../../utils/Cookies";

export async function getWiki(id: string){
    const response = await fetch(url+'/wiki/'+id,{
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + cookies.get("access"),
            'Content-Type': 'application/json'
        }
    })
    return response;
}

export async function getUser(username: string){
    const response = await fetch(url+'/user?username='+username, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + cookies.get("access"),
            'Content-Type': 'application/json'
        }
    })

    return response;
}