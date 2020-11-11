import {entryData} from "../../../utils/getInterfaces/entryData";
import {url} from "../../../utils/DetermineUrl";

export function deleteEntry(entry: entryData){
    fetch(url+'/entry/delete_entry?id='+entry.id, {
        method: "GET",
        headers:  {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(!response.ok){
            console.log("Entry deletion failed...");
        }else{
            window.location.reload()
        }
    })
}