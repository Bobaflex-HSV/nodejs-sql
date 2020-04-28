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

// ***** STEP 1 *****
app.get("/", (req, res) => {
    pool 
      .query('SELECT * FROM users;')
      .then(data => res.json(data))
      .catch(e => res.sendStatus(404)); 
  });
  

app.listen('3000', () => console.log('Connected to server localhost:3000...'));

