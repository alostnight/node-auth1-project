const session = require('express-session');
const knexSessionStore = require("connect-session-knex")(session);
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const restricted = require('./auth/restricted-middleware');
const usersRouter = require('./users/users-router.js');
const authRouter = require('./auth/auth-router.js');

const server = express();
const sessionConfig = {
    name: 'session',
    secret: 'secret',
    cookie: {
        maxAge: 60000,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore(
        {
            knex: require('./database/config'),
            tablename: "sessions",
            sidfieldname: "sid",
            createtable: true,
            clearInterval: 60000
        }
    )
}


server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.json({ api: "running" });
});

module.exports = server;