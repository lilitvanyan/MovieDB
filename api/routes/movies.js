const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const controller = require('../controllers/movies')


//get list of movies
router.get("/", controller.movieList);

//get info of single movie
router.get("/:id", controller.movieInfo)


module.exports=router;