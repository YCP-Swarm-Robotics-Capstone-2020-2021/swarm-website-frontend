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