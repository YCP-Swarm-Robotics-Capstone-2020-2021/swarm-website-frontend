import {cookies} from '../Cookies';
import {findUser} from '../../components/SignUp/SignUpApi'

export default async function verifyUserIsLoggedIn(){
    //Preform a system check with cookies to make sure the user is logged in
    const email = cookies.get('email');

    const response = await findUser(email);

    cookies.set('username', response.username);
    return !response.Status;


}