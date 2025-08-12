/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/trimble-connect-workspace-api/dist/es/trimbleconnect.workspace.api.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/trimble-connect-workspace-api/dist/es/trimbleconnect.workspace.api.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CameraMode: () => (/* binding */ U),
/* harmony export */   ExtensionType: () => (/* binding */ q),
/* harmony export */   IdentifierType: () => (/* binding */ $),
/* harmony export */   PropertyType: () => (/* binding */ A),
/* harmony export */   SortDirection: () => (/* binding */ x),
/* harmony export */   TOOLS: () => (/* binding */ N),
/* harmony export */   TOOL_SNAP_TYPES: () => (/* binding */ I),
/* harmony export */   TabPanelId: () => (/* binding */ D),
/* harmony export */   ViewEntityStates: () => (/* binding */ L),
/* harmony export */   connect: () => (/* binding */ B),
/* harmony export */   dispatcherEventListener: () => (/* binding */ G),
/* harmony export */   expose: () => (/* binding */ z),
/* harmony export */   getConnectEmbedUrl: () => (/* binding */ J),
/* harmony export */   isApplicationEmbedded: () => (/* binding */ T),
/* harmony export */   preregister: () => (/* binding */ j),
/* harmony export */   removeClient: () => (/* binding */ V),
/* harmony export */   sendEvent: () => (/* binding */ F),
/* harmony export */   sendEventToAllClients: () => (/* binding */ H)
/* harmony export */ });
const e={postMessage:(e,n)=>{const t=JSON.stringify(e);connectWsApiIntegrator.postMessage(t)}},n={postMessage:(e,n)=>{window.chrome.webview.postMessage(e)}},t={postMessage:(e,n)=>{window.webkit.messageHandlers.webwindowinterop.postMessage(e)}},i={postMessage:(e,n)=>{const t=JSON.stringify(e);window.hybridWebViewHost.sendMessage(t)}},r=()=>crypto.randomUUID(),o=()=>{const e=window;return!!(e&&e.chrome&&e.chrome.webview)},s=()=>{const e=window;return!(!e||!("CefSharp"in e))},a=async()=>(window.connectWsApiIntegrator||await CefSharp.BindObjectAsync("connectWsApiIntegrator"),e),c=()=>n,u=async e=>{let n;return n=e===window?s()?await a():o()?c():e:e,n},f="Trimble.dispatcher.v1",d={},p={};let l=1;function w(e){const n=m();return p[n]=e,()=>delete p[n]}function g(e,n,t,i,r=3e5){return new Promise(((o,s)=>{const a=m(),c={scope:f,type:"request",id:a,api:t,args:i};let u;r>0&&(u=setTimeout((()=>{delete d[a],s(new Error("dispatcher.ts | sendRequest(): Operation timed out."))}),r)),d[a]=e=>{delete d[a],u&&clearTimeout(u),e.error?s(e.error):o(e.result)},e.postMessage(c,n)}))}function h(e,n,t,i){const r={scope:f,type:"event",event:t,data:i};u(e).then((e=>{e.postMessage(r,n)})).catch((e=>{console.error("sendEvent() call failed",e)}))}async function y(e){const n="null"===e.origin?"*":e.origin,t=e.data;if(function(e){return b(e)&&"event"===e.type}(t))for(const i in p){if(!p.hasOwnProperty(i))continue;const r=p[i].event;if(r){r(e.source,n,t.event,t.data)}}else if(function(e){return b(e)&&"request"===e.type}(t)){const i=await u(e.source);let r;for(const e in p){if(!p.hasOwnProperty(e))continue;const o=p[e].request;if(o&&!r){const e=o(i,n,t.api,t.args);if(void 0!==e)try{r={scope:f,type:"response",id:t.id,api:t.api,result:await e}}catch(e){r={scope:f,type:"response",id:t.id,api:t.api,error:String(e)}}}}r||(r={scope:f,type:"response",id:t.id,api:t.api,error:"Not supported"}),i.postMessage(r,n)}else if(function(e){return b(e)&&"response"===e.type}(t)){const e=d[t.id];e&&e(t)}}function b(e){return!!e&&e.scope===f}function m(){return l++}const v={},M=[];let S;const k=new Promise((e=>{S=()=>{S=()=>{},e()}}));let O;function P(e,n,r=1e4){async function u(e,n){const t=await g(e,n,".connect_api_client_v1",[],0);if(t&&"object"==typeof t){return R(t,((t,i,o)=>{if(".api_function_v1"===i){const i=o?o+"."+String(t):String(t);return(...t)=>g(e,n,i,t,r)}return i}))}throw new Error("Failed to connect")}function f(e){if(!e)return"*";try{return new URL(e).origin}catch(e){return"*"}}if(n&&(O=w({event:(e,t,i,r)=>n(i,r)})),e===window){if(0!==Object.keys(v).length)return Promise.resolve(v);if(s())return new Promise((async e=>{const n=await a();e(await u(n,"*"))}));if(o()){return u(c(),"*")}if(function(){const e=window;return e&&e.webkit&&e.webkit.messageHandlers&&e.webkit.messageHandlers.webwindowinterop}()){return u(t,"*")}if(function(){const e=window;return e&&e.hybridWebViewHost}()){return u(i,"*")}return Promise.resolve(v)}if((d=e)&&"function"==typeof d.postMessage)return u(e,"*");if((e=>e&&"object"==typeof e.contentWindow)(e)){const n=[];return n.push(new Promise(((n,t)=>{const i=async()=>{e.removeEventListener("load",i),e.contentWindow?n(await u(e.contentWindow,f(e.src))):t(new Error("Cannot access the target content window"))};e.addEventListener("load",i)}))),e.contentWindow&&n.push(u(e.contentWindow,f(e.src))),Promise.race(n)}return Promise.reject(new Error("Target must be a window or an iframe"));// removed by dead control flow
{ var d; }}function _(e){if("object"!=typeof e)throw new Error("Api must be an object");C(v,e),S()}function j(e){const n=M.find((n=>n.dispatcher===e.dispatcher));if(n)return n.identifier=e.identifier||n.identifier,n.origin=e.origin||n.origin,n;if(e.dispatcher){if(e.identifier){if(M.find((n=>n.identifier===e.identifier)))throw new Error(`[Workspace API] Client with identifier '${e.identifier}' already registered!`)}else e.identifier=r();return M.push(e),e}}function V(e){const n=M.findIndex((n=>n.dispatcher===e.dispatcher));-1!==n&&M.splice(n,1)}const E=(e,n,t,i)=>{if(t.origin){let r;r=t.identifier&&i&&t.identifier===i?Object.assign(Object.assign({},n),{origin:{isSelf:!0}}):n,h(t.dispatcher,t.origin,e,r)}};function H(e,n,t,i){if(t&&t.identifier){const r=M.find((e=>e.identifier===t.identifier));r&&E(e,n,r,i)}else for(const t of M)E(e,n,t,i)}function T(){try{return window.self!==window.top||s()||o()}catch(e){return!0}}function W(e,n){return"function"==typeof e&&"function"==typeof n&&e.name===n.name||("string"==typeof e&&"string"==typeof n||"number"==typeof e&&"number"==typeof n)}function C(e,n){for(const t in n){const i=n[t];if(i)if(t in e){const n=e[t];if("object"==typeof i&&"object"==typeof n)C(n,i);else{if(!W(i,n))throw new Error(`Cannot merge ${t} (${n} and ${i})`);e[t]=i}}else switch(typeof i){case"object":{const n={};C(n,i),e[t]=n;break}default:e[t]=i}}}function R(e,n,t){const i={};for(const r in e){const o=e[r];if((void 0!==t||"onConnect"!==r&&"onRequest"!==r)&&o)if("object"==typeof o){const e=t&&t+"."+String(r)||String(r);i[r]=R(o,n,e)}else i[r]=n(r,e[r],t)}return i}var A,L,q,D;w({request:(e,n,t,i)=>{if(".connect_api_client_v1"===t)return k.then((()=>{let t=M.find((n=>n.dispatcher===e));if(t)t.origin=n;else{if(!e)return;t={dispatcher:e,origin:n,identifier:r()},M.push(t)}var i;(i=v)&&"function"==typeof i.onConnect&&v.onConnect(t);return R(v,((e,n)=>"function"==typeof n?".api_function_v1":n))}));{const r=M.find((t=>t.dispatcher===e&&t.origin===n));if(r){if((o=v)&&"function"==typeof o.onRequest){const e=v.onRequest(r,t,i);if(void 0!==e)return e}const e=function(e,n){const t=n.split(".");let i=e;for(const e of t)i="object"==typeof i&&i&&e in i?i[e]:void 0;return i}(v,t);if("function"==typeof e){const n=e.apply(void 0,i);return void 0===n?Promise.resolve(n):n}return Promise.resolve(e)}return}// removed by dead control flow
{ var o; }}}),function(e){e[e.LengthMeasure=0]="LengthMeasure",e[e.AreaMeasure=1]="AreaMeasure",e[e.VolumeMeasure=2]="VolumeMeasure",e[e.MassMeasure=3]="MassMeasure",e[e.AngleMeasure=4]="AngleMeasure",e[e.StringValue=5]="StringValue",e[e.IntValue=6]="IntValue",e[e.DoubleValue=7]="DoubleValue",e[e.DateTime=8]="DateTime",e[e.Logical=9]="Logical",e[e.Boolean=10]="Boolean"}(A||(A={})),function(e){e[e.Selected=1]="Selected",e[e.Hidden=4]="Hidden",e[e.SelectedHidden=5]="SelectedHidden",e[e.Visible=6]="Visible",e[e.SelectedVisible=7]="SelectedVisible",e[e.Highlighted=8]="Highlighted"}(L||(L={})),function(e){e.Project="project",e.Viewer="3dviewer"}(q||(q={})),function(e){e.Models="models",e.Layers="layers",e.Attachments="attachments",e.ToDos="todos",e.Views="views",e.ClashSets="clashes",e.Organizer="organizer",e.DataTable="contentbrowser",e.Topics="topics",e.LiveCollaboration="livecollaboration",e.StatusSharing="statussharing",e.Connect2Fab="connect2fab",e.QrMarkers="qrmarkers",e.RealityCapture="realitycapture"}(D||(D={}));const N=["reset","selection","areaSelection","measurement","pointMarkup","cloudMarkup","arrowMarkup","lineMarkup","textMarkup","freelineMarkup","clipPlane","verticalClipPlane","picking"],I=["edge","point","surface"];var U,$,x;function B(e,n,t){return window.removeEventListener("message",G),window.addEventListener("message",G),O&&O(),P(e,n,t)}function z(e){return _(e)}function F(e,n,t,i){h(e,n,t,i)}function G(e){return y(e)}function J(e="prod"){return`https://${{int:"web.int",qa:"web.qa",stage:"web.stage",prod:"web"}[e]}.connect.trimble.com?isEmbedded=true`}!function(e){e.LookAround="look_around",e.Pan="pan",e.Panorama="panorama",e.Rotate="rotate",e.Walk="walk"}(U||(U={})),function(e){e[e.Guid=0]="Guid",e[e.String=1]="String",e[e.SpatialHash=2]="SpatialHash",e[e.DwgHandle=3]="DwgHandle",e[e.None=4]="None"}($||($={})),function(e){e[e.SORT_NONE=0]="SORT_NONE",e[e.SORT_UP=1]="SORT_UP",e[e.SORT_DOWN=-1]="SORT_DOWN"}(x||(x={}));


/***/ }),

/***/ "./src/api/api.js":
/*!************************!*\
  !*** ./src/api/api.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getProjects: () => (/* binding */ getProjects),
/* harmony export */   getUsersMe: () => (/* binding */ getUsersMe)
/* harmony export */ });
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ "./src/api/auth.js");
/* harmony import */ var _detailTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detailTask */ "./src/api/detailTask.js");
/* harmony import */ var _errorConsole__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorConsole */ "./src/api/errorConsole.js");
/* * This file is part of the Trimble Connect Workspace API.
 * It provides functions to interact with the Trimble Connect API, specifically for user and project management.
 * 
 * @license Apache-2.0
 * 
 * The code is intended to be used in a browser environment and requires the Trimble Connect Workspace API to be loaded.
 */




/* * Base URL for the Trimble Connect API.
 * This should be set to the appropriate environment variable or default value.
 * It is used to construct the full API endpoint URLs.
 */
const TC_BASE_URL = "https://app.connect.trimble.com" ;

/* * ユーザー情報を取得する関数。
 * @returns {Promise<Object>} ユーザー情報を含むPromiseオブジェクト。
 */
async function getUsersMe() {
    if(window.session==undefined) return false;

    const res = await fetch((0,_auth__WEBPACK_IMPORTED_MODULE_0__.formatHref)(`${TC_BASE_URL}/tc/api/2.0`, "/users/me"), {
        cache: "default",
        headers: new Headers({
            "Content-Type" : "application/json",
            Authorization  : `Bearer ${window.session.accessToken}`
        }),
        method: "GET",
    });
    if (!res.ok) {
        return (0,_errorConsole__WEBPACK_IMPORTED_MODULE_2__.errorConsole)(res);
    }
    if(res.status == 202){
        const task = (await res.json());
        return await (0,_detailTask__WEBPACK_IMPORTED_MODULE_1__.delayed)(task);
    }
    return(await res.json());
}

/* * プロジェクトの一覧を取得する関数。
 * @param {boolean} fullLoaded - 完全に読み込むかどうかのフラグ。
 * @returns {Promise<Array>} プロジェクトの配列を含むPromiseオブジェクト。
 */
async function getProjects(){
    const res = await fetch((0,_auth__WEBPACK_IMPORTED_MODULE_0__.formatHref)(`${TC_BASE_URL}/tc/api/2.0`, "/projects", {fullyLoaded : "true"}), {
        cache: "default",
        headers: new Headers({
            "Content-Type" : "application/json",
            Authorization  : `Bearer ${window.session.accessToken}`
        }),
        method: "GET",
    });
    if (!res.ok) {
        return (0,_errorConsole__WEBPACK_IMPORTED_MODULE_2__.errorConsole)(res);
    }
    if(res.status == 202){
        const task = (await res.json());
        return await (0,_detailTask__WEBPACK_IMPORTED_MODULE_1__.delayed)(task);
    }
    return(await res.json());
}

/***/ }),

/***/ "./src/api/auth.js":
/*!*************************!*\
  !*** ./src/api/auth.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatHref: () => (/* binding */ formatHref),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout)
/* harmony export */ });
/**
 * Returns the formatted date.
 * @param utcDateAndTime The UTC timestamp as a string.
 */

const TC_CLIENT_ID    = "0d32eee4-9112-49c7-85c6-9bd02f8187ea" ;
const TC_CLIENT_APP   = "sok-local" ; 
const TC_REDIRECT_URI = "http://localhost:8080/login/oauth2/code/trimble-connect" ;
const TC_CLIENT_KEY   = "d4b32da5bcee4af29191b7c8678dc0a5" ;

/** Returns the current UTC timestamp in seconds. */
function utcTimestamp() {
    return Math.floor(new Date().getTime() / 1000);
}

const loggers = {};
createLogger("sok_works");

/* istanbul ignore next */
function createLogger(name) {
    if (loggers[name]) {
        return loggers[name];
    }
    /* istanbul ignore next */
    const api = {};
    const methodToColorMap = {
        debug: `#7f8c8d`,
        log: `#2ecc71`,
        warn: `#f39c12`,
        error: `#c0392b`,
    };
    /* istanbul ignore next */
    const print = (method, ...msg) => {
        const styles = [
            `border: 1px solid ${methodToColorMap[method]}`,
            `border-radius: 0.5em`,
            `color: ${methodToColorMap[method]}`,
            `font-weight: bold`,
            `padding: 2px 0.5em`,
        ];
        const logPrefix = [`%c${name}`, styles.join(";")];
        console[method](...logPrefix, ...msg);
    };
    for (const method of Object.keys(methodToColorMap)) {
        api[method] = (...msg) => print(method, ...msg);
    }
    loggers[name] = api;
    return api;
}

/**
 * Returns a boolean indicating whether the value is null or undefined.
 * @param value The value.
 */
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}

/**
 * Returns a formatted HREF.
 * @param baseUri The base URI.
 * @param path The path, including the leading slash.
 * @param query An object containing the query key-value pairs.
 */
function formatHref(baseUri, path, query) {
    let result = baseUri;
    /* istanbul ignore else */
    if (path) {
        result += path;
    }
    /* istanbul ignore else */
    if (query) {
        result += "?" + formatQueryParameters(query);
    }
    return result;
}
/**
 * Returns formatted query parameters.
 * @param query An object containing the query key-value pairs.
 */
function formatQueryParameters(query) {
    const params = [];
    for (const key in query) {
        /* istanbul ignore else */
        if (query.hasOwnProperty(key)) {
            const value = query[key];
            /* istanbul ignore else */
            if (!isNullOrUndefined(value)) {
                params.push(`${key}=${encodeURIComponent(String(value))}`);
            }
        }
    }
    return params.join("&");
}
/**
 * Returns a parsed query parameter or undefined if the HREF cound not be parsed.
 * @param hrefText The HREF to parse.
 * @param name The parameter name.
 */
function parseQueryParameter(href, name) {
    const regex = new RegExp("[?&]" + name.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(href);
    if (!results) {
        return undefined;
    }
    else if (results[2] === undefined) {
        return null;
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
/**
 * Returns true if the URL's host points to staging environment or 'env=stage' query parameter was explicitly used.
 * @param url The full URL to parse.
 */
const isStageEnv = (url) => {
    const compareStage = (value) => (value ?? "").toLowerCase() === "stage";
    const _url = new URL(url);
    const host_split = _url.host.split(".");
    if (host_split.length >= 2 && compareStage(host_split[1])) {
        return true;
    }
    return compareStage(parseQueryParameter(_url.href, "env"));
};

/**
 * Returns the claims from a JSON Web Token without verification.
 * @param token The token to parse.
 */
function parseJwt(token) {
    function decodeBase64(base64) {
        base64 = base64.replace(/-/g, "+").replace(/_/g, "/");
        switch (base64.length % 4) {
            case 0:
                break;
            case 2:
                base64 += "==";
                break;
            case 3:
                base64 += "=";
                break;
            default:
                throw new Error("Invalid token encoding.");
        }
        return decodeURIComponent(atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join(""));
    }
    return JSON.parse(decodeBase64(token.split(".")[1]));
}

/**
 * Removes all properties from an object and returns it.
 * @param obj The object.
 */
function clear(obj) {
    Object.keys(obj).forEach((key) => delete obj[key]);
    return obj;
}

// Promise that indicates whether an API has been exposed.
new Promise((resolve) => {
});

/** EmulatedStorage is a simple Map emulating Storage.
 *  Used in cases where actual browers local/session storage can't be used.
 * */
class EmulatedStorage {
    constructor() {
        this.storage = new Map();
    }
    get length() {
        return this.storage.size;
    }
    getItem(key) {
        const item = this.storage.get(key);
        return item === undefined ? null : item;
    }
    setItem(key, value) {
        this.storage.set(key, value);
        if (this.itemInsertionCallback) {
            this.itemInsertionCallback(this.length);
        }
    }
    removeItem(key) {
        this.storage.delete(key);
    }
    clear() {
        return this.storage.clear();
    }
    key(index) {
        const keys = [];
        for (const k of this.storage.keys()) {
            keys.push(k);
        }
        return keys[index];
    }
}
/** Uses native localStorage or sessionStorage if available.
 * Otherwise in-memory storage is used.
 * If in-memory object already exists in window, that one is used. Otherwise new one is created. */
class AppStorage {
    constructor(storageType) {
        this.storageType = storageType;
        this._underlyingStorage = this.getStorage();
    }
    getStorage() {
        let storage;
        try {
            /** No window when executing in node */
            /* istanbul ignore next */
            storage = typeof window === "undefined" ? __webpack_require__.g[this.storageType] : window[this.storageType];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return storage;
        }
        catch (e) {
            if (
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0) {
                throw e;
            }
            else {
                /** No window when executing in node */
                /* istanbul ignore next */
                const parent = typeof window === "undefined" ? __webpack_require__.g : window;
                const storageProperty = `emulated${this.storageType}`;
                if (!parent.hasOwnProperty(storageProperty)) {
                    parent[storageProperty] = new EmulatedStorage();
                }
                return parent[storageProperty];
            }
        }
    }
    /** Get underlying native or emulated storage. Used in tests. */
    get underlyingStorage() {
        return this._underlyingStorage;
    }
    /** Reload the storage. Used in tests. */
    reload() {
        this._underlyingStorage = this.getStorage();
    }
    get length() {
        return this._underlyingStorage.length;
    }
    getItem(key) {
        return this._underlyingStorage.getItem(key);
    }
    setItem(key, value) {
        return this._underlyingStorage.setItem(key, value);
    }
    removeItem(key) {
        return this._underlyingStorage.removeItem(key);
    }
    clear() {
        return this._underlyingStorage.clear();
    }
    key(index) {
        return this._underlyingStorage.key(index);
    }
}
const LocalStorage = new AppStorage("localStorage");
new AppStorage("sessionStorage");

/* tslint:disable no-bitwise */
var NumberFormat;
(function (NumberFormat) {
    NumberFormat[NumberFormat["AllowNegative"] = 1] = "AllowNegative";
    NumberFormat[NumberFormat["AllowIntegers"] = 2] = "AllowIntegers";
    NumberFormat[NumberFormat["AllowDecimals"] = 4] = "AllowDecimals";
    NumberFormat[NumberFormat["AllowScientific"] = 8] = "AllowScientific";
    NumberFormat[NumberFormat["AllowFractions"] = 16] = "AllowFractions";
    NumberFormat[NumberFormat["Any"] = 31] = "Any";
})(NumberFormat || (NumberFormat = {}));

var FeetInchesType;
(function (FeetInchesType) {
    FeetInchesType[FeetInchesType["Feet"] = 0] = "Feet";
    FeetInchesType[FeetInchesType["Inches"] = 1] = "Inches";
    FeetInchesType[FeetInchesType["FeetInches"] = 2] = "FeetInches";
})(FeetInchesType || (FeetInchesType = {}));

const SESSION_KEY = isStageEnv(window.location.href) ? "trimble-services-stage" : "trimble-services";
const currentSession = initSession();
const config = {
    connectProvider: "",
    identityClientApp: "",
    identityClientId: "",
    identityClientKey: "",
    identityProvider: "",
    identityRedirectUri: "",
};
/**
 * Configures the identity provider. You MUST call this before using any other function from this module.
 * @param configuration The configuration.
 */
function configure(configuration) {
    if (!isValidConfiguration(configuration)) {
        throw new Error("Invalid configuration.");
    }
    Object.assign(config, configuration);
    if (config.authGrants) {
        saveSession(convertToSession(config.authGrants));
    }
}
/**
 * Begins or resumes a session. Returns redirect URI if session cannot be acquired.
 */
async function signIn(configuration) {
    if (configuration) {
        configure(configuration);
    }
    ensureConfigured();
    const code = parseQueryParameter(window.location.href, "code");
    if (code) {
        try {
            saveSession(await requestSession(code), true);
            return Promise.resolve({ uri: parseQueryParameter(window.location.href, "state") || config.identityRedirectUri });
        }
        catch (error) {
            clearSession();
        }
    }
    return getSession();
}
/**
 * Saves the session data to the local storage.
 * @param session The session.
 * @param replace True to replace the session, false to update.
 */
function saveSession(session, replace) {
    if (replace) {
        Object.assign(clear(currentSession), session);
    }
    else {
        Object.assign(currentSession, session);
    }
    getSessionStorage().setItem(SESSION_KEY, JSON.stringify(currentSession));
    return currentSession;
}
// --------------------------------------------------------------------------------
function getSessionStorage() {
    return window.__TRIMBLE_ServiceSessionStorage__ || LocalStorage;
}
function isValidConfiguration(configuration) {
    return Boolean(configuration.identityRedirectUri &&
        configuration.identityProvider &&
        configuration.identityClientApp &&
        configuration.identityClientId &&
        configuration.identityClientKey);
}
function convertToSession(grants) {
    function convertToUser(data) {
        const user = {};
        for (const key in data) {
            user[key] = data[key];
        }
        return user;
    }
    const claims = grants.id_token ? parseJwt(grants.id_token) : undefined;
    return {
        expiresAt: (claims && claims.exp) || utcTimestamp() + 3600,
        refreshToken: grants.refresh_token,
        sessionToken: grants.id_token,
        accessToken: grants.access_token,
        user: claims && convertToUser(claims),
    };
}
function ensureConfigured() {
    if (!isValidConfiguration(config)) {
        throw new Error("Invalid configuration. Did you forget to call configure()?");
    }
}
/**
 * Returns the current session or redirect URI if redirect is required.
 * @param refresh Indicates whether to force session refresh.
 */
async function getSession(refresh = false) {
    ensureConfigured();
    // Refresh is not requested and the session is valid.
    if (!refresh && isValidSession(currentSession)) {
        return currentSession;
    }
    // Refresh is requested and the session issuer is valid.
    if (isValidSessionIssuer(currentSession) && canRefresh(currentSession)) {
        try {
            return saveSession(await refreshSession(currentSession), true);
        }
        catch (error) {
            clearSession();
        }
    }
    return Promise.resolve({ uri: getSignInHref() });
}
/**
 * Session is valid if there is an access token which is not yet expired. Session (id_token) and refresh tokens are optional.
 */
function isValidSession(session) {
    return Boolean(session && session.accessToken && session.expiresAt && session.expiresAt > utcTimestamp()) && isValidSessionIssuer(session);
}
/**
 * Session issuer is valid if there is no session token or if the session token issuer is the same with the configured identity provider.
 */
function isValidSessionIssuer(session) {
    return (!session?.sessionToken ||
        (!!session && (!config || !config.identityProvider || !session.user || !session.user.iss || session.user.iss === config.identityProvider)));
}
function initSession() {
    const session = getSessionStorage().getItem(SESSION_KEY);
    if (session) {
        return JSON.parse(session);
    }
    else {
        return {};
    }
}
function clearSession() {
    getSessionStorage().removeItem(SESSION_KEY);
}
function canRefresh(session) {
    return Boolean(session && session.sessionToken && session.refreshToken);
}
async function requestSession(code) {
    const res = await fetch(formatHref(config.identityProvider, "/oauth/token"), {
        body: formatQueryParameters({
            code,
            grant_type: "authorization_code",
            redirect_uri: config.identityRedirectUri,
            tenantDomain: "trimble.com",
        }),
        cache: "default",
        headers: new Headers({
            Accept: "application/json",
            Authorization: `Basic ${btoa(config.identityClientId + ":" + config.identityClientKey)}`,
            "Content-Type": "application/x-www-form-urlencoded",
        }),
        method: "POST",
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    const grants = (await res.json());
    if (!grants.id_token) {
        throw new Error("Unauthorized");
    }
    return convertToSession(grants);
}
async function refreshSession(session) {
    const res = await fetch(formatHref(config.identityProvider, "/oauth/token"), {
        body: formatQueryParameters({
            grant_type: "refresh_token",
            refresh_token: session.refreshToken,
            tenantDomain: "trimble.com",
        }),
        cache: "default",
        headers: new Headers({
            Accept: "application/json",
            Authorization: `Basic ${btoa(config.identityClientId + ":" + config.identityClientKey)}`,
            "Content-Type": "application/x-www-form-urlencoded",
        }),
        method: "POST",
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    const grants = (await res.json());
    if (!grants.id_token) {
        throw new Error("Unauthorized");
    }
    return convertToSession(grants);
}
function getSignInHref(states) {
    /** identity provider for federated workflow (eg: hitachi, okta_trimble) */
    const federatedIdentityProvider = parseQueryParameter(window.location.href, "identity_provider");
    const returnUri = window.location.href.replace(/(?:code|sessionDataKey)(?:=[^&]*)?&?/g, "");
    let stateUrl = returnUri;
    if (states) {
        const url = parseURL(returnUri);
        if (url) {
            const keys = Object.keys(states);
            keys.forEach((k) => url.searchParams.append(k, states[k]));
            stateUrl = url.href;
        }
    }
    if (stateUrl === config.identityRedirectUri) {
        stateUrl = undefined;
    }
    return formatHref(config.identityProvider, "/oauth/authorize", {
        client_id: config.identityClientId,
        redirect_uri: getRedirectUrl(),
        response_type: "code",
        scope: "openid " + config.identityClientApp,
        state: stateUrl,
        identity_provider: federatedIdentityProvider,
    });
}
function getRedirectUrl() {
    return config.identityRedirectUri;
}
function parseURL(url) {
    try {
        return new URL(url);
    }
    catch {
        return undefined;
    }
}

async function login() {
    /*
    const result = await signIn({
        identityRedirectUri: "http://localhost:8080/login/oauth2/code/trimble-connect",
        identityClientApp: "sok-local",
        identityClientId: "0d32eee4-9112-49c7-85c6-9bd02f8187ea",
        identityClientKey: "d4b32da5bcee4af29191b7c8678dc0a5",
        connectProvider: "//app.connect.trimble.com",
        identityProvider: "https://id.trimble.com"
    });
    */
    const result = await signIn({
        identityRedirectUri: "http://localhost:8080/login/oauth2/code/trimble-connect",
        identityClientApp: "sok-local",
        identityClientId: "0d32eee4-9112-49c7-85c6-9bd02f8187ea",
        identityClientKey: "d4b32da5bcee4af29191b7c8678dc0a5",
        connectProvider: "//app.connect.trimble.com",
        identityProvider: "https://id.trimble.com"
    });
    
    if (result.accessToken){
        return result;
    }
    window.location.href = result.uri;
}

async function logout(token){
    var url = `https://id.trimble.com/oauth/logout?id_token_hint=${token}` ;
    window.location.href = url ;
}




/***/ }),

/***/ "./src/api/detailTask.js":
/*!*******************************!*\
  !*** ./src/api/detailTask.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   delayed: () => (/* binding */ delayed)
/* harmony export */ });
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ "./src/api/auth.js");
/* harmony import */ var _errorConsole__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errorConsole */ "./src/api/errorConsole.js");



/**
 * 遅延機構からレスポンスを回収する
 * @param {*} taskid 
 * @returns 
 */
async function delayedTask(taskid){
    if(window.session==undefined) return false;

    const res = await fetch((0,_auth__WEBPACK_IMPORTED_MODULE_0__.formatHref)(window.baseUrl, `/delayedTask/${taskid}`), {
        cache: "default",
        headers: new Headers({
            "Content-Type" : "application/json",
            Authorization  : `Bearer ${window.session.accessToken}`
        }),
        method: "GET",
    });
    if(!res.ok) {
        return (0,_errorConsole__WEBPACK_IMPORTED_MODULE_1__.errorConsole)(res) ;
    }
    return (await res.json());
}

/**
 * 遅延機構の呼び出し
 * @param {*} taskid 
 * @returns 
 */
async function delayed(task){
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


/***/ }),

/***/ "./src/api/errorConsole.js":
/*!*********************************!*\
  !*** ./src/api/errorConsole.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   errorConsole: () => (/* binding */ errorConsole)
/* harmony export */ });
async function errorConsole(res){
    if(res.status == 500){
        const err = (await res.json());
        console.error(`error code : ${err.errorCode} - ${err.errorMessage}`)
    }else{
        console.error(`response code : ${res.status} - ${res.statusText}`)
    }
    console.error(`url : ${res.url}`)
    return undefined;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var trimble_connect_workspace_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! trimble-connect-workspace-api */ "./node_modules/trimble-connect-workspace-api/dist/es/trimbleconnect.workspace.api.js");
/**
  * @file main.js 
  *  This file is the entry point for the application.
  *  It initializes the application and handles user authentication.
  *  It is designed to work with a specific API and handles login functionality.
  *  The application is intended to run in a browser environment.
  */



const url = new URL(location.href);
if ((url.host === "localhost:8080" || url.search.includes("login")) && !url.search.includes("nologin")) { //デバッグ中
    document.querySelector("html").style.display = "none";
    (async () => {
        const auth = __webpack_require__(/*! ./api/auth */ "./src/api/auth.js");
        window.session = await auth.login();
        if (window.session) {
            document.querySelector("html").style.removeProperty("display");
            inistializeApp();
        }
    })();
}

async function inistializeApp() {
    const api = __webpack_require__(/*! ./api/api */ "./src/api/api.js");

    // Get the authentication token from the session
    const token = window.session.accessToken;

    // Fetch user information
    await api.getUsersMe(token).then(user => {
        console.log("User Info:", user);
    }).catch(error => {
        console.error("Error fetching user info:", error);
    });

    // Fetch projects
    await api.getProjects().then(projects => {
        console.log("Projects:", projects);
    }).catch(error => {
        console.error("Error fetching projects:", error);
    });
}

})();

/******/ })()
;
//# sourceMappingURL=main.js.map