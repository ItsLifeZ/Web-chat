import { checkSession, addSession, checkSessionUsername, getSession } from "../sessions/session.js";
import { checkSafeString, generateToken } from "../functions/tools.js";

export default function apiApp(api) {

    api.get('/', (req, res) => {

        if(req.session.token && checkSession(req.session.token)) {
            res.redirect('/chat');
    
            return;
        }

        res.render('pages/index');
    });



    api.get('/chat', (req, res) => {

        if(!req.session.token || !checkSession(req.session.token)) {
            res.redirect('/');
    
            return;
        }

        let nickname = getSession(req.session.token).username;

        res.render('pages/chat', {
            nickname: nickname
        });
    });



    api.post('/api/join', (req, res) => {
        let nickname = req.body.nickname;

        if(!nickname || !checkSafeString(nickname)) {
            res.send({
                message: 'Invalid nickname'
            });

            return;
        }

        if(nickname.length > 16 || nickname.length < 4) {
            res.send({
                message: 'Nickname must be between 4 and 16 characters'
            });

            return;
        }

        if(checkSessionUsername(nickname)) {
            res.send({
                message: 'username already exists'
            });

            return;
        }

        let token = generateToken();

        addSession(token, nickname);

        req.session.token = token;

        res.send({
            token: token
        });
    });
}