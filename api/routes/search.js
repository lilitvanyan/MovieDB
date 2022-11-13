const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const controller = require('../controllers/search')


router.get("/", controller.bigSearch)
module.exports =router