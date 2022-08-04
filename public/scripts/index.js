const joinForm = document.querySelector('#join-form');
joinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nickname = document.querySelector('#nickname-input').value;
    const joinInput = document.querySelector('#join-input');

    joinInput.innerText = 'Joining...';
    joinInput.disabled = true;

    fetch('/api/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nickname
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.token) {
            localStorage.setItem('token', res.token);
            window.location.href = `/chat`;
        }else {
            alert(res.message);
            joinInput.innerText = 'Join';
            joinInput.disabled = false;
        }
    });
});

let color;

setInterval(() => {
    let sodium = document.querySelector('#Sodium');

    if(color == '#ff6665') {
        color = '#84b4fa';
    }else {
        color = '#ff6665';
    }


    sodium.style.color = color;
}, 1500);