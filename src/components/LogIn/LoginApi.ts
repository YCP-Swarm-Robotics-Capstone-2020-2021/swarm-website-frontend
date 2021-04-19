import {url} from '../../utils/DetermineUrl'

export interface LoginState{
    redirect: boolean,
    failedLogin: boolean,
    data: LoginData
}

interface LoginData{
    email: string,
    password: string
}

export async function requestToken(email: string, password: string){
    const response = await fetch(
        url + '/token', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    )
    return await response.json();
}

export async function verifyUser(email: string, password: string){
    const response = await fetch(
        url + "/user/verify_password", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            email: email,
            password: password
            })
        })

    return await response.json();

}