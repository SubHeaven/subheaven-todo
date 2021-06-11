const express = require('express');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const subheaven_crud = require('./subheaven-crud');

const env = require('subheaven-env');
env.addParams([
    { name: 'PORT', description: 'Porta onde o sistema irá rodar.', required: true, sample: '33321' }
]);
env.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "default-src": ["'self'", "https://fonts.gstatic.com"],
            "connect-src": ["'self'", "'unsafe-inline'"],
            "img-src": ["'self'", "data:"],
            "style-src-elem": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            "script-src": ["'unsafe-inline'", "'unsafe-eval'", "'self'"],
            "object-src": ["'none'"],
        },
    })
);
// app.use(function(req, res, next) {
//     res.setHeader(
//         'Content-Security-Policy',
//         "default-src 'self'; font-src 'self' 'unsafe-inline'; img-src 'self' 'data:'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; style-src-elem  'self' 'unsafe-inline'; frame-src 'self'"
//     );
//     next();
// });
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