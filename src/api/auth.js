/**
 * Returns the formatted date.
 * @param utcDateAndTime The UTC timestamp as a string.
 */

const TC_CLIENT_ID    = process.env.TC_CLIENT_ID ;
const TC_CLIENT_APP   = process.env.TC_CLIENT_APP ; 
const TC_REDIRECT_URI = process.env.TC_REDIRECT_URI ;
const TC_CLIENT_KEY   = process.env.TC_CLIENT_KEY ;

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
export function formatHref(baseUri, path, query) {
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
            storage = typeof window === "undefined" ? global[this.storageType] : window[this.storageType];
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
                const parent = typeof window === "undefined" ? global : window;
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
        identityRedirectUri: process.env.TC_REDIRECT_URI,
        identityClientApp: "sok-local",
        identityClientId: process.env.TC_CLIENT_ID,
        identityClientKey: process.env.TC_CLIENT_KEY,
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

export { login, logout }
