import {url} from '../../utils/DetermineUrl'

export interface LoginState{
    redirect: boolean,
    failedLogin: boolean,
    data: LoginData
}

interface LoginData{
    username: string,
    password: string
}


export async function verifyUser(username: string, password: string){
    const response = await fetch(
        url + "/user/verify_password", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            username: username,
            password: password
            })
        })

    return await response.json();

}