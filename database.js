const { Pool } = require('pg');
const pool = new Pool({
    user: 'tfpozcru',
    host: 'balarama.db.elephantsql.com',
    database: 'tfpozcru',
    password: 'eDD2PuVZ7sWWMHcu7n2lqL8NZHc_x6RY',
    port: 5432,
   });

module.exports = pool