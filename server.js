const express = require("express");
const app = express();
const users_router = require('./users_router')
const orders_router = require('./orders_router')

// app.use('/',users_router);
app.use('/',orders_router);


app.listen('3000', () => console.log('Connected to server localhost:3000...'));

