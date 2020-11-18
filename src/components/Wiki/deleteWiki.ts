import {url} from "../../utils/DetermineUrl";

export function deleteWiki(wikiId: number){
    fetch(url+'/wiki/delete_wiki?id='+wikiId, {
        method: "GET",
        headers:  {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(!response.ok){
            console.log("Wiki deletion failed...");
        }else{
            window.location.href="/home";
        }
    })
}