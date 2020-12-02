import {entryData} from "../../../utils/getInterfaces/entryData";
import {url} from "../../../utils/DetermineUrl";

export function updateEntry(entry: entryData){
    fetch(url+'/entry/'+entry.id, {
        method: "PUT",
        body: JSON.stringify(entry),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(!response.ok){
            console.log("Entry update failed...");
        }else{
            window.location.reload();
        }
    })
}