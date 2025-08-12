import { formatHref } from "./auth";
import { errorConsole } from "./errorConsole";

/**
 * 遅延機構からレスポンスを回収する
 * @param {*} taskid 
 * @returns 
 */
async function delayedTask(taskid){
    if(window.session==undefined) return false;

    const res = await fetch(formatHref(window.baseUrl, `/delayedTask/${taskid}`), {
        cache: "default",
        headers: new Headers({
            "Content-Type" : "application/json",
            Authorization  : `Bearer ${window.session.accessToken}`
        }),
        method: "GET",
    });
    if(!res.ok) {
        return errorConsole(res) ;
    }
    return (await res.json());
}

/**
 * 遅延機構の呼び出し
 * @param {*} taskid 
 * @returns 
 */
export async function delayed(task){
    var loop = true ;
    var result = undefined ;

    //**タイムアウトをセット 1分*/
    let h = setTimeout(function(){
        loop = false ;
        console.log(`${task.requestType} : タイムアウト`);
    }, 60000 * 1 );

    do {
        let data = await delayedTask(task.taskID) ;
        if(data.status != 0 ){
            loop = false;
            if(data.status == 1){
                result = atob(data.resultInformation);
            }
        }
    } while (loop) ;
    clearTimeout(h);

    if(result != undefined ) return JSON.parse(result);
    
    return undefined;
}
