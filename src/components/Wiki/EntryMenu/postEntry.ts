import {newEntryData} from "../../../utils/postInterfaces/newEntryData";
import {newChangeData} from "../../../utils/postInterfaces/newChangeData";
import {url} from "../../../utils/DetermineUrl";

export function postEntry(entry: newEntryData, change: newChangeData, wikiId: number, entries: number[]) {

    //create a new sidebar for the new entry
    fetch(url+'/sidebar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(!response.ok){
            console.log("Saving new sideBar failed...");
        }
        return response.json()
    }).then(data => {
        //set sideBar attribute to the returned id of the new sideBar
        entry['sideBar'] = data['id'];

        //create inital change
        fetch(url+'/change', {
            method: 'POST',
            body: JSON.stringify(change),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(!response.ok){
                console.log("Saving new change failed...");
            }
            return response.json()
        }).then(data => {
            //set log attribute to the returned id of the new change
            entry['log'] = [data['id']];

            //save new entry object
            fetch(url+'/entry', {
                method: 'POST',
                body: JSON.stringify(entry),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if(!response.ok){
                    console.log("Saving new entry failed...");
                }
                return response.json();
            }).then(data => {

                //patch new entry into wiki object
                fetch(url+'/wiki/'+wikiId, {
                    method: 'PATCH',
                    body: JSON.stringify({entries: entries.concat(data['id'])}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if(!response.ok){
                        console.log("Patching wiki w/ new entry failed...");
                    }else{
                        window.location.reload();
                    }
                })
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}