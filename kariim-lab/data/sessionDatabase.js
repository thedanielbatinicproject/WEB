var data=require('./data');




// Model za jednu sjednicu
class Session {
    constructor(sessionID) {
        this.sessionID = sessionID;
        this.cart = {}; // { productId: quantity }
        this.lastUsed = new Date();
        this.dateCreated = new Date();
        // Možeš dodati još polja po potrebi, npr. userAgent, ip, itd.
    }
}

// In-memory baza za sve sjednice
class SessionDatabase {
    constructor() {
        this.sessions = {};
    }

    addSession(session) {
        this.sessions[session.sessionID] = session;
    }

    getSession(sessionID) {
        return this.sessions[sessionID] || null;
    }

    removeSession(sessionID) {
        delete this.sessions[sessionID];
    }

    // Osvježi lastUsed za određenu sesiju
    updateLastUsed(sessionID) {
        if (this.sessions[sessionID]) {
            this.sessions[sessionID].lastUsed = new Date();
        }
    }

    // Očisti istekle sesije (npr. starije od 1h)
    cleanExpiredSessions(timeoutMs = 3600000) {
        const now = new Date();
        for (const id in this.sessions) {
            if (now - this.sessions[id].lastUsed > timeoutMs) {
                delete this.sessions[id];
            }
        }
    }
}

const sessionDB = new SessionDatabase();

module.exports = { Session, SessionDatabase, sessionDB };



