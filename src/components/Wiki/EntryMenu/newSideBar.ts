export function newSideBar(data: Object) {
    let id
    fetch('http://localhost:8000/sidebar/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(!response.ok){
            console.log("Saving new sideBar failed...");
        }
        return response.json();
    }).then(data => {
        id = data['id'];
    })
    return data['id'];
}