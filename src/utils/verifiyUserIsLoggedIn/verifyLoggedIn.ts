import {cookies} from '../Cookies';
export default function verifyUserIsLoggedIn(){
    //Preform a system check with cookies to make sure the user is logged in
    const username = cookies.get('username');
    return username !== undefined;

}