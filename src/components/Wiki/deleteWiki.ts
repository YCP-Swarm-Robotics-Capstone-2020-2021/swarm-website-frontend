import {url} from "../../utils/DetermineUrl";
import {wikiData} from "../../utils/getInterfaces/wikiData";

export function deleteWiki(wiki: wikiData){
    fetch(url+'/wiki/delete_wiki?id='+wiki.id, {
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