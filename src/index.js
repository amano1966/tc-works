/**
  * @file main.js 
  *  This file is the entry point for the application.
  *  It initializes the application and handles user authentication.
  *  It is designed to work with a specific API and handles login functionality.
  *  The application is intended to run in a browser environment.
  */

import {connect} from "trimble-connect-workspace-api"

const url = new URL(location.href);
if ((url.host === "localhost:8080" || url.search.includes("login")) && !url.search.includes("nologin")) { //デバッグ中
    document.querySelector("html").style.display = "none";
    (async () => {
        const auth = require("./api/auth");
        window.session = await auth.login();
        if (window.session) {
            document.querySelector("html").style.removeProperty("display");
            inistializeApp();
        }
    })();
}

async function inistializeApp() {
    const api = require("./api/api");

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
