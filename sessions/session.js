const sessions = {}

export function addSession(token, username) {
    sessions[token] = {
        username: username,
        token: token
    };
    return;
}

export function checkSession(token) {
    if(sessions[token]) {
        return true;
    }

    return false;
}

export function checkSessionUsername(user) {
    for(const session in sessions) {
        let sessionUsername = sessions[session].username.toLowerCase();
        let username = user.toLowerCase();
        if(sessionUsername == username) {
            return true;
        }
    }

    return false;
}

export function removeSession(token) {
    delete sessions[token];
    return;
}

export function getSession(token) {
    return sessions[token];
}