const { createPool } = require('mysql2/promise');


const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MySQL_KEY,
    database: 'movies'
})

module.exports = pool
