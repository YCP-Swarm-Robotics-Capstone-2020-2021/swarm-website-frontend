import {url} from "../../../utils/DetermineUrl";
import {newHeadingData} from "../../../utils/postInterfaces/newHeadingData";
import {newChangeData} from "../../../utils/postInterfaces/newChangeData";
import {entryData} from "../../../utils/getInterfaces/entryData";

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