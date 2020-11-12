import {url} from "../../../utils/DetermineUrl";

export function deleteComment(commentId: number){
    fetch(url+'/comment/'+commentId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(!response.ok){
            console.log("Removing comment failed...");
        }else{
            window.location.reload();
        }
    })

}