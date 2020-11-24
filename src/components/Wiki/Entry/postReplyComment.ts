import {url} from "../../../utils/DetermineUrl";
import {newCommentData} from "../../../utils/postInterfaces/newCommentData";

export function postReplyComment(commentQuote: string, comment: newCommentData){
    console.log("commentQuote: "+commentQuote);
    console.log("new comment: "+comment.user + ": "+comment.text);
}