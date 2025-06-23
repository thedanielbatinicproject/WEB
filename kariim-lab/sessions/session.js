const express = require('express');
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
const { Session, sessionDB } = require('../data/sessionDatabase');

const DEFAULT_SESSION_TIMEOUT = 1200000; // 20 min
const DEFAULT_SESSION_ID_NAME = 'sID';

let sessionTimeout = DEFAULT_SESSION_TIMEOUT;
let sIDName = DEFAULT_SESSION_ID_NAME;

function sessionManager(req, res, next) {
    // Dohvati sessionID iz cookiea, queryja ili bodyja
    let sessionID = req.cookies[sIDName] || req.query[sIDName] || req.body[sIDName];
    // Dohvati session iz baze
    let session = sessionDB.getSession(sessionID);

    // Provjeri je li session istekao
    if (session && (session.lastUsed.getTime() + sessionTimeout < Date.now())) {
        sessionDB.removeSession(sessionID);
        session = null;
    }

    // Ako ne postoji, kreiraj novi
    if (!session) {
        sessionID = uuid.v4();
        session = new Session(sessionID);
        sessionDB.addSession(session);
        res.cookie(sIDName, sessionID, { httpOnly: true });
    }

    // Osvježi lastUsed
    session.lastUsed = new Date();
    req.session = session;
    next();
}


function sessionURLBuilder(sessionID) {
    return function(url) {
        let newURL = new URL(url); 
        newURL.searchParams.append(sIDName, sessionID);
        return newURL.pathname + newURL.search;
    };
}

module.exports = { sessionManager, sessionURLBuilder };



