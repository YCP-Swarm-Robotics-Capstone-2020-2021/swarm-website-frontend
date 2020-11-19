import {newHeadingData} from "../../../utils/postInterfaces/newHeadingData";
import {newChangeData} from "../../../utils/postInterfaces/newChangeData";
import {entryData} from "../../../utils/getInterfaces/entryData";
import {url} from "../../../utils/DetermineUrl";

export function postHeading(heading: newHeadingData, change: newChangeData, entryData: entryData){
    fetch(url+'/change', {
        method: 'POST',
        body: JSON.stringify(change),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(!response.ok){
            console.log("Saving new change failed...");
        }
        return response.json()
    }).then(data => {
        //set log attribute to the returned id of the new change
        heading.log = heading.log.concat(data['id']);

        fetch(url+'/heading', {
            method: "POST",
            body: JSON.stringify(heading),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (!response.ok) {
                console.log("Posting new heading failed...");
            }
            return response.json();
        }).then(data => {
            fetch(url+'/entry/'+entryData.id, {
                method: 'PATCH',
                body: JSON.stringify({headings: entryData.headings.concat(data['id'])}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if(!response.ok){
                    console.log("Patching entry w/ new heading failed...");
                }else{
                    window.location.reload();
                }
            })
        })
    })
}