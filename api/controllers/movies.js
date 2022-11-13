const { getMovieList, getMovieInfo} = require('../models/movies')
const bodyParser=require('body-parser');

const movieList=async(req, res, next)=>{
    const result=await getMovieList();
    res.send(result);
}
const movieInfo=async(req, res, next)=>{
    const id=req.body.id;
    const result=await getMovieInfo(id);
    res.send(result);
}

module.exports={
    movieList, movieInfo
}