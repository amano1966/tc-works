export async function errorConsole(res){
    if(res.status == 500){
        const err = (await res.json());
        console.error(`error code : ${err.errorCode} - ${err.errorMessage}`)
    }else{
        console.error(`response code : ${res.status} - ${res.statusText}`)
    }
    console.error(`url : ${res.url}`)
    return undefined;
}