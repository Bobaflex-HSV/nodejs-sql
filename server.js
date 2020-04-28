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

app.use(bodyParser.json())

// ***** STEP 1: GET  /  : get all the users *****
app.get("/", (req, res) => {
    pool 
      .query('SELECT * FROM users;')
      .then(data => res.json(data))
      .catch(e => res.sendStatus(404)); 
});
  
// ***** STEP 2: GET  /:id :  get one user (with the id)  *****
app.get("/:id", (req, res) => {
  const { id } = req.params; 
  pool
      .query('SELECT * FROM users WHERE id=$1;', [id])
      .then(data => res.json(data)) 
      .catch(e => res.sendStatus(404)); 
});
   
// ***** STEP 3: POST / -> create a new user  *****

/* TEST DATA
{
            "first_name": "Donald",
            "last_name": "Duck",
            "age": 24
        }
*/

app.post("/", (req, res) => {
   const {first_name, last_name, age} = req.body;
    pool
      .query('INSERT INTO users(first_name, last_name, age) values($1,$2,$3);', [first_name, last_name, age])
      .then(data => res.status(201).json(data))
      .catch(e => res.sendStatus(404)); 
   });
   


app.listen('3000', () => console.log('Connected to server localhost:3000...'));

