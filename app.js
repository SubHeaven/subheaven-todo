const express = require('express');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const subheaven_crud = require('./subheaven-crud');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(helmet());
app.use(function(req, res, next) {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; font-src 'self' 'unsafe-inline'; img-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; style-src-elem  'self' 'unsafe-inline'; frame-src 'self'"
    );
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'front')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

subheaven_crud.init('/db', app);

module.exports = app;