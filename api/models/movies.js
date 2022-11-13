const pool = require('../db-connect')
const bodyParser=require('body-parser');

const getMovieList= ()=>{
    return pool.query(`SELECT * FROM movieList`);
};

const getMovieInfo = async(id)=>{
    const result = await pool.query(`SELECT * FROM movieList WHERE id = ? LIMIT 1`, [id]);
    return result[0];
}
module.exports={
    getMovieList, getMovieInfo
}