import {url} from "../../../utils/DetermineUrl";
import {newCommentData} from "../../../utils/postInterfaces/newCommentData";
import {postComment} from "./postComment";

export function postReplyComment(commentQuote: string, comment: newCommentData, comments: number[], entryId: number){
    console.log("commentQuote: "+commentQuote);
    console.log("new comment: "+comment.user + ": "+comment.text);
    comment.text = commentQuote+comment.text;

    fetch(url+'/comment', {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
            "Content-Type": 'application/json'
        }
    }).then(response => {
        if(!response.ok){
            console.log("Adding new reply comment failed...");
        }
        return response.json();
    }).then(data => {
        //get new comment id from response above
        comments = comments.concat(data['id'])

        //patch into entry's comment field
        fetch(url+'/entry/'+entryId, {
            method: 'PATCH',
            body: JSON.stringify({comments: comments}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(!response.ok){
                console.log("Patching entry w/ new reply comment failed...")
            }else{
                window.location.reload();
            }
        })
    })
}