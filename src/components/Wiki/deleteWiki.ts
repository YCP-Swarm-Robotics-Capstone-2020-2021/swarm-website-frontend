import {url} from "../../utils/DetermineUrl";

export function deleteWiki(wikiId: number){
    fetch(url+'/wiki/'+wikiId, {
        method: "DELETE",
        headers:  {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(!response.ok){
            console.log("Wiki deletion failed...");
        }else{
            window.location.reload()
        }
    })
}