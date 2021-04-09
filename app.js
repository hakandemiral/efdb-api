require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./database');
const cors = require('cors');


const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');
const userRouter = require('./routes/user');

const app = express();
db();

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movie', moviesRouter);
app.use('/user', userRouter);

module.exports = app;
