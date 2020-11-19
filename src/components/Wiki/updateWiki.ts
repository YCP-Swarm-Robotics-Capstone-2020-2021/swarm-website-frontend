import {url} from "../../utils/DetermineUrl";
import {wikiData} from "../../utils/getInterfaces/wikiData";

export function updateWiki(wiki: wikiData){
    console.log("updateWiki func called");
    fetch(url+'/wiki/'+wiki.id, {
        method: "PUT",
        body: JSON.stringify(wiki),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(!response.ok){
            console.log("Wiki update failed...");
        }else{
            window.location.reload();
        }
    })
}