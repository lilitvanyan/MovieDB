const pool = require('../api/db-connect')


const lastPage = async () => {
    const [ result ] = await pool.query(`SELECT lastPage FROM movieFetch`);
    const { lastPage = 1 } = result[0] || {}
    return lastPage
}

module.exports={
    lastPage
}