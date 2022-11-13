const { hasPassword, comparePassword } = require('../common/utils')
const { createUser, getUser, checkUsername } = require('../models/user')
const bodyParser=require('body-parser');
const jwt =require('jsonwebtoken');


const singupUser = async (req, res) => {
    try{
        if(!await checkUsername(req.body.username)) return error;
        const hash = await hasPassword(req.body.password)
        const user = createUser({
            username: req.body.username,
            password: hash
        })
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json("username exists")
    }
}

const loginUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let userData = await getUser(username); 
    userData=userData[0][0];
    if(!userData){
        return res.status(404).json({message:'user-not-found'})
    }
    try{       
        //console.log(userData.password, password);
        const passwordValid = await comparePassword(password, userData.password)
        
        const token = jwt.sign({ username }, process.env.JWT_KEY, { expiresIn:'1 hour' })
        console.log(9);
        return res.status(200).json({ message: 'auth-success', token });
        
    }
    catch(error){
        return res.status(401).json({message:'auth-failed'});
    }
}

module.exports = {
    singupUser,
    loginUser
}