import {cookies} from '../Cookies';
import {findUser} from '../../components/SignUp/SignUpApi'

export default async function verifyUserIsLoggedIn(){
    //Preform a system check with cookies to make sure the user is logged in
    const username = cookies.get('username');

    const response = await findUser(username);

    return !response.Status;


}