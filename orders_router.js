var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const pool = require('./database.js')

router.use(bodyParser.json())



// ***** STEP 6: GET  /  : get all orders *****
router.get("/", (req, res) => {
    pool 
      .query('SELECT * FROM orders;')
      .then(data => res.json(data))
      .catch(e => res.sendStatus(404)); 
});


// ***** STEP 7: GET  /:id :  To get one order (with the id)  *****
router.get("/:id", (req, res) => {
    const { id } = req.params; 
    pool
        .query('SELECT * FROM orders WHERE id=$1;', [id])
        .then(data => res.json(data)) 
        .catch(e => res.sendStatus(404)); 
  });

// ***** STEP 8: POST / -> To create a new order *****
/* TEST DATA
{
            "price": "44",
            "date": "'2020-04-03 12:00:30'",
            "user_id": 1
        }
*/

router.post("/", (req, res) => {
    const {price, date, user_id} = req.body;
     pool
       .query('INSERT INTO orders(price, date, user_id) values($1,$2,$3);', [price, date, user_id])
       .then(data => res.status(201).json(data))
       .catch(e => res.sendStatus(404)); 
    });
// ***** STEP 9: PUT /:id  :  To edit one order (with the id) *****
/* TEST DATA
{
            "price": "555",
            "date": "'2020-04-03 12:00:30'",
            "user_id": 2
        }
*/

router.put("/:id", (req, res) => {
    const { id } = req.params; //retrieve id from the URL
    const { price, date, user_id } = req.body; //retrieve data from the form (body-parser)
   
    pool
      .query('UPDATE orders SET price=$1,date=$2,user_id=$3 WHERE id=$4;', [price, date, user_id, id]) 
      .then(data => res.status(201).json(data))
      .catch(e => res.sendStatus(404)); 
   });


// ***** STEP 10: DELETE  /:id : To delete one order (with the id)  *****
router.delete("/:id", (req, res) => {
    const { id } = req.params; 
   
    pool
      .query('DELETE FROM orders WHERE id=$1;', [id])
      .then(data => res.status(201).json(data))
      .catch(e => res.sendStatus(404)); 
   });

module.exports = router