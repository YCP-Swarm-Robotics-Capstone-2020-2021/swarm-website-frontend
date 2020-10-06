import {newEntryData} from "../../../utils/postInterfaces/newEntryData";
import {newChangeData} from "../../../utils/postInterfaces/newChangeData";

export function newEntry(entry: newEntryData, change: newChangeData) {

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

            return fetch('http://localhost:8000/entry/', {
                method: 'POST',
                body: JSON.stringify(entry),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                    console.log(response);
                    window.location.reload();
                } else {
                    console.log('Saving new entry failed...');
                }
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));



}