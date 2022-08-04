import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import env from 'dotenv'

import { Server } from 'socket.io';
import { createServer } from 'http'
import { startApp } from './preload.js'

env.config()

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.set('views', './public');
app.use(express.static('public/styles'));
app.use(express.static('public/scripts'));
app.use(express.static('public/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true
}));

server.listen(3000, startApp(app, io));