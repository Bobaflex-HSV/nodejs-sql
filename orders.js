const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const { Pool } = require('pg');

const pool = new Pool({
 user: 'tfpozcru',
 host: 'balarama.db.elephantsql.com',
 database: 'tfpozcru',
 password: 'eDD2PuVZ7sWWMHcu7n2lqL8NZHc_x6RY',
 port: 5432,
});


// ***** STEP 6: GET  /  : get all orders *****
app.get("/", (req, res) => {
    pool 
      .query('SELECT * FROM orders;')
      .then(data => res.json(data))
      .catch(e => res.sendStatus(404)); 
});

app.listen('3000', () => console.log('Connected to server localhost:3000...'));

// ***** STEP 7: GET  /:id :  To get one order (with the id)  *****
app.get("/:id", (req, res) => {
    const { id } = req.params; 
    pool
        .query('SELECT * FROM orders WHERE id=$1;', [id])
        .then(data => res.json(data)) 
        .catch(e => res.sendStatus(404)); 
  });




// ***** STEP 8: POST / -> To create a new order *****
// ***** STEP 9: PUT /:id  :  To edit one order (with the id) *****
// ***** STEP 10: DELETE  /:id : To delete one order (with the id)  *****
