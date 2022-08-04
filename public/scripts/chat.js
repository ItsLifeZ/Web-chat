let messagesElement = document.getElementById('container-messages')
let token = localStorage.getItem('token');

let socket = io('http://26.232.77.253:3000', {
    query: {
        token: token,
    }
});

setTimeout(() => {
    let app = document.getElementById('app');
    let welcome = document.getElementById('welcome');
    app.style.display = 'flex';
    welcome.style.animation = '3.5s cubic-bezier(.25, 1, .30, 1) square-out-center both';
    setTimeout(() => {
        welcome.style.display = 'none';
    }, 450);
}, 500);

socket.on('message', function (data) {
    createMessage(data.message, data.author, data.isMyMessage);
});

document.getElementById('message-input').addEventListener('keypress', (e) => {
    if(e.key == 'Enter') sendMessage();
});

socket.on('messages', function (data) {
    for(let i = 0; i < data.length; i++) {
        if(data[i].author == 'You') {
            createMessage(data[i].message, data[i].author, true);
        }
        else {
            createMessage(data[i].message, data[i].author);
        }
    }
});

document.getElementById('send-message').addEventListener('click', sendMessage);

function createMessage(message, username, isMyMessage = false) {
    
    let messageElement = document.createElement('div');
    messageElement.innerText = `[${username}] \n ${message}`;


    if(isMyMessage) {
        messageElement.classList.add('my-message');
    }else {
        messageElement.classList.add('other-message');
    }

    messagesElement.appendChild(messageElement);
}

function sendMessage() {
    let messageInput = document.getElementById('message-input');
    let message = messageInput.value;

    if(message.length <= 0) {
        return;
    }

    socket.emit('message', {
        message: message
    });

    messageInput.value = '';
}