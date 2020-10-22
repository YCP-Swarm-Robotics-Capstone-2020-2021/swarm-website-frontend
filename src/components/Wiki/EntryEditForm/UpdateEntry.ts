import {entryData} from "../../../utils/getInterfaces/entryData";

export function updateEntry(entry: entryData){
    fetch('http://localhost:8000/entry/'+entry.id, {
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