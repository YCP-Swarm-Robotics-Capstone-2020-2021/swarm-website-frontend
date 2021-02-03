export const url = handleUrl();

function handleUrl() {
    if(process.env.NODE_ENV=== 'development'){
        return 'http://localhost:8000/api'
    }
    if(process.env.NODE_ENV === 'production'){
        return 'http://swarmrobotics.io/api'
    }
}