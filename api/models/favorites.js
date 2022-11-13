const pool = require('../db-connect')
const bodyParser=require('body-parser');

const addFavorite=(username, movieId)=>{
   // console.log(username, movieId);
    pool.query(`INSERT INTO favorites (favUsername, favMovieId) 
    VALUES (?,?)`, 
    [username, movieId]);}

const getUsersFavorites=async (username)=>{
    const result= await pool.query(`SELECT ml.* FROM favorites f   LEFT JOIN movieList ml ON ml.id = f.favMovieId WHERE f.favUserName = (?)
    `, [username]);
    return result[0];
}

module.exports={
    addFavorite, getUsersFavorites
}