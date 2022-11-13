const express=require('express');
const router=express.Router();
const fetch =require("node-fetch");
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const check =require ('../middleware/check');
const controller = require('../controllers/favorites')



router.post("/:add", check, controller.createFavorite);
router.get("/:username", check, controller.usersFavorites);

module.exports=router;