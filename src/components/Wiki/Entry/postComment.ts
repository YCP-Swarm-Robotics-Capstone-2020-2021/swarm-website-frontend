import {newCommentData} from "../../../utils/postInterfaces/newCommentData";

export function postComment(comment: newCommentData, comments: number[], entryId: number){
    fetch('http://localhost:8000/comment/', {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
            "Content-Type": 'application/json'
        }
    }).then(response => {
        if(!response.ok){
            console.log("Adding new comment failed...");
        }
        return response.json();
    }).then(data => {
        //get new comment id from response above
        comments = comments.concat(data['id'])

        //patch into entry's comment field
        fetch('http://localhost:8000/entry/'+entryId+'/', {
            method: 'PATCH',
            body: JSON.stringify({comments: comments}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(!response.ok){
                console.log("Patching entry w/ new comment failed...")
            }else{
                window.location.reload();
            }
        })

    })
}