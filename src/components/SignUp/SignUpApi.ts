import {url} from '../../utils/DetermineUrl'

export interface SignUpState{
    userCreateSuccess: boolean,
    userCreateFail: boolean,
    passwordMismatch: boolean,
    data: SignUpData
}

interface SignUpData{
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    verifyPassword: string,
    email: string
}

export async function findUser(email: string){
    const response = await fetch(
        url + "/user/find_user?email=" +
        email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})

    return await response.json();

}

export async function createUser(data: SignUpData){
    const response = await fetch(url + "/user",
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    return await response.json()
}