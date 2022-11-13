const pool = require('../api/db-connect');

const storeLastPage= async (lastP) => {
    console.log('store', lastP)
    await pool.query(`Delete from movieFetch`)
    await pool.query(`INSERT movieFetch (lastPage) VALUES (?)`, [lastP])
}
module.exports={
    storeLastPage
}