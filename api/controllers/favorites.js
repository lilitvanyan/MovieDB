const bodyParser=require('body-parser');
const { addFavorite, getUsersFavorites} = require('../models/favorites')

const createFavorite=async (req, res, next)=>{
    const movieId=req.body.movieId;
    const username=req.body.username;
    addFavorite(username, movieId);
    res.status(200).json();
}

const usersFavorites=async (req, res, next)=>{
    const username=req.body.username;
    const result=await getUsersFavorites(username);
    res.send(result);
}

module.exports={
    createFavorite, usersFavorites
}