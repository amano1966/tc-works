/* * This file is part of the Trimble Connect Workspace API.
 * It provides functions to interact with the Trimble Connect API, specifically for user and project management.
 * 
 * @license Apache-2.0
 * 
 * The code is intended to be used in a browser environment and requires the Trimble Connect Workspace API to be loaded.
 */
import { formatHref } from "./auth";
import { delayed } from  "./detailTask";
import { errorConsole } from "./errorConsole";

/* * Base URL for the Trimble Connect API.
 * This should be set to the appropriate environment variable or default value.
 * It is used to construct the full API endpoint URLs.
 */
const TC_BASE_URL = process.env.TC_BASE_URL ;

/* * ユーザー情報を取得する関数。
 * @returns {Promise<Object>} ユーザー情報を含むPromiseオブジェクト。
 */
export async function getUsersMe() {
    if(window.session==undefined) return false;

    const res = await fetch(formatHref(`${TC_BASE_URL}/tc/api/2.0`, "/users/me"), {
        cache: "default",
        headers: new Headers({
            "Content-Type" : "application/json",
            Authorization  : `Bearer ${window.session.accessToken}`
        }),
        method: "GET",
    });
    if (!res.ok) {
        return errorConsole(res);
    }
    if(res.status == 202){
        const task = (await res.json());
        return await delayed(task);
    }
    return(await res.json());
}

/* * プロジェクトの一覧を取得する関数。
 * @param {boolean} fullLoaded - 完全に読み込むかどうかのフラグ。
 * @returns {Promise<Array>} プロジェクトの配列を含むPromiseオブジェクト。
 */
export async function getProjects(){
    const res = await fetch(formatHref(`${TC_BASE_URL}/tc/api/2.0`, "/projects", {fullyLoaded : "true"}), {
        cache: "default",
        headers: new Headers({
            "Content-Type" : "application/json",
            Authorization  : `Bearer ${window.session.accessToken}`
        }),
        method: "GET",
    });
    if (!res.ok) {
        return errorConsole(res);
    }
    if(res.status == 202){
        const task = (await res.json());
        return await delayed(task);
    }
    return(await res.json());
}