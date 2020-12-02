import {url} from "../../../utils/DetermineUrl";

export function deleteHeading(headingId: number){
    fetch(url+'/heading/delete_heading?id='+headingId, {
        method: "GET",
        headers:  {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(!response.ok){
            console.log("Removing heading failed...");
        }else{
            window.location.reload()
        }
    })
}