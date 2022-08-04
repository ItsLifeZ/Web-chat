import { checkSession, getSession } from '../sessions/session.js';
import { checkSafeString } from '../functions/tools.js';

let messages = [];

function getMessagesListWithFilter(messages, username) {
    let tempMessages = [];

    for(let i = 0; i < messages.length; i++) {
        let message = messages[i].message;
        let author = messages[i].author;

        if(author === username) {
            author = 'You';
        }

        tempMessages.push({
            message: message,
            author: author
        });
    }

    return tempMessages;

}

export default function socketApp(socketServer) {
    socketServer.on('connection', async (socket) => {

        let token = socket.handshake.query.token;

        if(!token || !checkSession(token)) {
            socket.disconnect();
            return;
        }

        let username = await getSession(token).username;

        if(messages.length > 0) {
            let customMessages = getMessagesListWithFilter(messages, username);
            socket.emit('messages', customMessages);
        }

        socket.on('message', (data) => {
            let message = data.message;

            if(message.length <= 0) {
                return;
            }

            messages.push({
                author: username,
                message: message
            });

            socket.broadcast.emit('message', {
                message: message,
                author: username
            });

            socket.emit('message', {
                message: message,
                author: "You",
                isMyMessage: true
            });
        });
    });
}