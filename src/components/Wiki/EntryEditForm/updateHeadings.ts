import {url} from "../../../utils/DetermineUrl";
import {headingData} from "../../../utils/getInterfaces/headingData";

export function updateHeadings(headingData: headingData[]){
    headingData.forEach(heading => {
        fetch(url+'/heading/'+heading.id, {
            method: "PUT",
            body: JSON.stringify(heading),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(!response.ok){
                console.log("Heading '"+heading.title+"' update failed...");
            }else{
                window.location.reload();
            }
        })
    })
}