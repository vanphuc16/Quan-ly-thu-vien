const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const bookRoute = require('./routes/book');
const notificationRoute = require('./routes/notification');
const reviewRoute = require('./routes/review');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user', userRoute);
app.use('/book', bookRoute);
app.use('/notification', notificationRoute);
app.use('/review', reviewRoute);

module.exports = app;