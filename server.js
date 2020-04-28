const express = require("express");
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
 user: 'tfpozcru',
 host: 'balarama.db.elephantsql.com',
 database: 'tfpozcru',
 password: 'eDD2PuVZ7sWWMHcu7n2lqL8NZHc_x6RY',
 port: 5432,
});

app.get("/", (req, res) => res.send("hello world"));

app.listen('3000', () => console.log('connected'));

