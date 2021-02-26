import {url} from '../../../utils/DetermineUrl';
import {newCommentData} from "../../../utils/postInterfaces/newCommentData";

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

export async function postComment(comment: newCommentData, comments: number[], entryId: number){
    let responseComment = await fetch(url+'/comment', {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
            "Content-Type": 'application/json'
        }
    })

    if(!responseComment.ok){
        console.log("Adding new comment failed...");
        return;
    }else{
        //patch new comment in entry
        let jsonComment = await responseComment.json();
        comments = comments.concat(jsonComment['id']);

        let responseEntry = await fetch(url+'/entry/'+entryId, {
            method: 'PATCH',
            body: JSON.stringify({comments: comments}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!responseEntry.ok){
            console.log("Patching entry w/ new comment failed...");
            return false;
        }else{
            return true;
        }
    }
}

export async function deleteComment(commentId: number){
    let response = await fetch(url+'/comment/'+commentId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response;
}

export async function getAllChanges(entryId: string){
    let response = await fetch(url+'/entry/get_all_changes?id='+entryId, {
        method: "GET",
        headers:  {
            "Content-Type": "application/json"
        }
    })

    return response;
}