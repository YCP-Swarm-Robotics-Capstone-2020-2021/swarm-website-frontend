import {url} from '../../../utils/DetermineUrl';

export async function getEntry(entryId: string){
    let response = await fetch(url+'/entry/'+entryId, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    return response;
}

export async function getComment(commentId: string){
    let response = await fetch(url+'/comment/'+commentId, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    return response;
}

export async function getUser(userId: string){
    let response = await fetch(url+'/user/'+userId, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    return response;
}

export async function getHeading(headingId: string){
    let response = await fetch(url+'/heading/'+headingId, {
        method: 'GET',
        headers:{
            "Content-type": "application/json"
        }
    })
    return response;
}

export async function getSideBar(sideBarId: string){
    let response = await fetch(url+'/sidebar/'+sideBarId, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    return response;
}