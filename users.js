const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const pool = require('./database.js')

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
   
4

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

// ***** STEP 4: PUT /:id  :  To edit one user (with the id)   *****
/* TEST DATA
    {
                "first_name": "Gene",
                "last_name": "Simmons",
                "age": 70
            }
*/
app.put("/:id", (req, res) => {
    const { id } = req.params; //retrieve id from the URL
    const { first_name, last_name, age } = req.body; //retrieve data from the form (body-parser)
   
    pool
      .query('UPDATE users SET first_name=$1,last_name=$2,age=$3 WHERE id=$4;', [first_name, last_name, age, id]) 
      .then(data => res.status(201).json(data))
      .catch(e => res.sendStatus(404)); 
   });

// ***** STEP 5: DELETE  /:id : To delete one user (with the id) ***** 
app.delete("/:id", (req, res) => {
    const { id } = req.params; 
   
    pool
      .query('DELETE FROM users WHERE id=$1;', [id])
      .then(data => res.status(201).json(data))
      .catch(e => res.sendStatus(404)); 
   });
   


app.listen('3000', () => console.log('Connected to server localhost:3000...'));

