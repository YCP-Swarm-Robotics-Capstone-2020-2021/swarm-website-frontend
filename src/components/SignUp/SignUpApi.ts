export interface SignUpState{
    userCreateSuccess: boolean,
    userCreateFail: boolean,
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

export async function verifyUser(username: string, password: string){
    const response = await fetch(
        "http://localhost:8000/user/verify_password?username=" +
        username + "&password=" + password, {
            method: 'GET',
            headers: {
                'Content-Type': 'application-json'
            }})

    const responseToJson = await response.json();

    return responseToJson;

}