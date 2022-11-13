const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const session=require('express-session');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const pool = require('./api/db-connect')
const dotenv = require('dotenv');
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const movieRouts=require('./api/routes/movies')
const favoriteRouts=require('./api/routes/favorites')
const user=require('./api/routes/user')
const searchRouts=require('./api/routes/search');

app.use("/movies", movieRouts);
app.use("/favorites", favoriteRouts)
app.use("/user", user);
app.use("/search", searchRouts)
app.use((req,res,next)=>{
    const error=new Error('Not found, srry:(');
   // error.status(404);
    next(error);
})

module.exports = app;

app.listen(process.env.PORT||3001);