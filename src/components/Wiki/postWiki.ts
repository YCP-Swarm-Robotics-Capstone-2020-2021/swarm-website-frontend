import {newWikiData} from "../../utils/postInterfaces/newWikiData";

export function postWiki(wiki: newWikiData){
    fetch('http://localhost:8000/wiki', {
        method: "POST",
        body: JSON.stringify(wiki),
        headers:{
            "Content-Type": 'application/json'
        }
    }).then(response => {
        if(!response.ok){
            console.log("Adding new wiki failed...");
        }
        return response.json();
    }).then(data => {
        window.location.href = '/wiki/'+data['id'];
    })
}