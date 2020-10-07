export function verifyUser(username: string, password: string){
    console.log(username + password);
    fetch("http://localhost:8000/user/verify_password?username="+username+"&password=" + password, {
        method: 'GET',
        headers: {
            'Content-Type': 'application-json'
        }
    }).then(data =>{
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
}