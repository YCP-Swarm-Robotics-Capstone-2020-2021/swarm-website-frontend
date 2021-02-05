import {url} from '../../../utils/DetermineUrl';
import {newEntryData} from "../../../utils/postInterfaces/newEntryData";
import {newChangeData} from "../../../utils/postInterfaces/newChangeData";

export async function getEntryMenuMember(entryId: number){
    const response = await fetch(url+'/entry/' + entryId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response;
}

export async function getLastUpdatedDate(wikiId: number){
    const response  = await fetch(url+'/wiki/get_last_updated?id='+wikiId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response;
}

export async function postEntry(entry: newEntryData, change: newChangeData, wikiId: number, entries: number[]){
    const responseSideBar = await fetch(url+'/sidebar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!responseSideBar.ok){
        console.log("Saving new sideBar failed...");
        return false;
    }else{
        //initial sideBar posted, create initial Change
        let jsonSideBar = await responseSideBar.json();
        entry['sideBar'] = jsonSideBar['id'];

        let responseInitChange = await fetch(url+'/change', {
            method: 'POST',
            body: JSON.stringify(change),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!responseInitChange.ok){
            console.log("Saving new change failed...");
            return false;
        }else{
            //initial Change posted, create entry object
            let jsonInitChange = await responseInitChange.json()
            entry['log'] = [jsonInitChange['id']];

            let responseEntry = await fetch(url+'/entry', {
                method: 'POST',
                body: JSON.stringify(entry),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!responseEntry.ok){
                console.log('Saving new entry failed...');
                return false;
            }else{
                //entry posted, patch entry into wiki
                let jsonEntry = await responseEntry.json();
                let entryId = jsonEntry['id'];

                let responseWiki = await fetch(url+'/wiki/'+wikiId, {
                    method: 'PATCH',
                    body: JSON.stringify({entries: entries.concat(entryId)}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if(!responseWiki.ok){
                    console.log("Patching wiki w/ new entry failed...");
                }else{
                    return true;
                }
            }
        }
    }
}