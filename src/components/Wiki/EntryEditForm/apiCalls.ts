import {url} from "../../../utils/DetermineUrl";
import {newHeadingData} from "../../../utils/postInterfaces/newHeadingData";
import {newChangeData} from "../../../utils/postInterfaces/newChangeData";
import {entryData} from "../../../utils/getInterfaces/entryData";
import {wikiData} from "../../../utils/getInterfaces/wikiData";
import {headingData} from "../../../utils/getInterfaces/headingData";
import {cookies} from "../../../utils/Cookies";

export async function postHeading(heading: newHeadingData, change: newChangeData, entryData: entryData){
    let changeResponse = await fetch(url+'/change', {
        method: 'POST',
        body: JSON.stringify(change),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!changeResponse.ok){
        console.log("Saving new change failed...");
        return false;
    }else{

        //add change Id to heading object
        let changeJson = await changeResponse.json();
        heading.log = heading.log.concat(changeJson['id']);

        let headingResponse = await fetch(url+'/heading', {
            method: "POST",
            body: JSON.stringify(heading),
            headers: {
                "Authorization": "Bearer " + cookies.get("access"),
                "Content-Type": "application/json"
            }
        })

        if(!headingResponse.ok){
            console.log("Posting new heading failed...");
            return false;
        }else{
            //patch new heading into entry
            let headingJson = await headingResponse.json();

            let entryResponse = await fetch(url+'/entry/'+entryData.id, {
                method: 'PATCH',
                body: JSON.stringify({headings: entryData.headings.concat(headingJson['id'])}),
                headers: {
                    "Authorization": "Bearer " + cookies.get("access"),
                    'Content-Type': 'application/json'
                }
            })

            if(!entryResponse.ok){
                console.log("Patching entry w/ new heading failed...");
                return false;
            }else{
                return true;
            }
        }
    }
}

export async function updateEntry(entry: entryData, change: newChangeData){
    let changeResponse = await fetch(url+'/change', {
        method: 'POST',
        body: JSON.stringify(change),
        headers: {
            "Authorization": "Bearer " + cookies.get("access"),
            'Content-Type': 'application/json'
        }
    })

    if(!changeResponse.ok){
        console.log("Saving new change failed...");
        return changeResponse;
    }else{
        let changeJson = await changeResponse.json();
        entry.log.push(changeJson['id']);

        let response = await fetch(url+'/entry/'+entry.id, {
            method: "PUT",
            body: JSON.stringify(entry),
            headers: {
                "Authorization": "Bearer " + cookies.get("access"),
                "Content-Type": "application/json"
            }
        })

        return response;
    }
}

export async function updateWiki(wiki: wikiData){
    let response = await fetch(url+'/wiki/'+wiki.id, {
        method: "PUT",
        body: JSON.stringify(wiki),
        headers: {
            "Authorization": "Bearer " + cookies.get("access"),
            "Content-Type": "application/json"
        }
    })

    return response;
}

export async function updateHeadings(heading: headingData, change: newChangeData){
    let changeResponse = await fetch(url+'/change', {
        method: 'POST',
        body: JSON.stringify(change),
        headers: {
            "Authorization": "Bearer " + cookies.get("access"),
            'Content-Type': 'application/json'
        }
    })

    if(!changeResponse.ok){
        console.log("Saving new change failed...");
        return changeResponse;
    }else {
        let changeJson = await changeResponse.json();
        heading.log.push(changeJson['id']);
        let response = await fetch(url + '/heading/' + heading.id, {
            method: "PUT",
            body: JSON.stringify(heading),
            headers: {
                "Authorization": "Bearer " + cookies.get("access"),
                "Content-Type": "application/json"
            }
        })

        return response;
    }
}

export async function deleteHeading(headingId: string){
    let response = await fetch(url+'/heading/delete_heading?id='+headingId, {
        method: "GET",
        headers:  {
            "Authorization": "Bearer " + cookies.get("access"),
            "Content-Type": "application/json"
        }
    })

    return response;
}

export async function deleteWiki(wiki: wikiData){
    let response = await fetch(url+'/wiki/delete_wiki?id='+wiki.id, {
        method: "GET",
        headers:  {
            "Authorization": "Bearer " + cookies.get("access"),
            "Content-Type": "application/json"
        }
    })

    return response;
}

export async function deleteEntry(entry: entryData){
    let response = await fetch(url+'/entry/delete_entry?id='+entry.id, {
        method: "GET",
        headers:  {
            "Authorization": "Bearer " + cookies.get("access"),
            "Content-Type": "application/json"
        }
    })

    return response;
}