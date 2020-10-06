import {newEntryData} from "../../../utils/postInterfaces/newEntryData";
import {newChangeData} from "../../../utils/postInterfaces/newChangeData";

export function newEntry(entry: newEntryData, change: newChangeData, wikiId: number) {

    //create a new sidebar for the new entry
    fetch('http://localhost:8000/sidebar/', {
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
        fetch('http://localhost:8000/change/', {
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
            fetch('http://localhost:8000/entry/', {
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
                fetch('http://localhost:8000/wiki/'+wikiId+'/', {
                    method: 'PATCH',
                    body: JSON.stringify({entries: [data['id']]}),
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