const pool = require('../db-connect')


const createUser = async({username,password}) => {
    
    return pool.query(`INSERT INTO users (username, password) VALUES (?,?)`,  [username, password]);
    
   
}

const getUser = (username) => {
    return pool.query(` SELECT * FROM users WHERE username = ?`, [username]);
}

const checkUsername=async (username)=>{
    
        const [result]=await pool.query(`Select * from users where username=(?)`, [username]);
        console.log(result);
        if(result.length>0)
        {
            return false;
        }
        return true;
   
}
module.exports = {
    createUser, getUser, checkUsername
}