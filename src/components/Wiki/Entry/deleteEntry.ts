import {entryData} from "../../../utils/getInterfaces/entryData";

export function deleteEntry(entry: entryData){
    fetch('http://localhost:8000/entry/delete_entry?id='+entry.id, {
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