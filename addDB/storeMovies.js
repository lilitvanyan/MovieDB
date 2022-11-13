const express = require('express');
const pool = require('/Users/macbookpro/Desktop/Jybird/Movies/api/db-connect.js')
//const { off } = require('./api/db-connect');
const {mKeys}=require('./mKeys');
const toInt = (val) => val === false ? 0 : val === true ? 1 : typeof val === 'string' ? val.replace(/'/g, "") : val;

//||
const storeMovies = async (movies) => {
    const inserKeys =mKeys();
    const values = movies.reduce((acc, movie) => {
        //movie keys (adult....)
        const fKeys = Object.keys(movie)
        //console.log(fKeys);
        if(fKeys.length!==inserKeys.length)
        {
            movie=fix(movie, inserKeys, fKeys);
            console.log(movie);
        }
        acc.push(
            inserKeys.map(k => {
                const data = k === 'genre_ids' ? movie[k].toString() : movie[k]
                return toInt(data)
            })
        )
        return acc
    }, [])
    const escString = values.map(v => `(?)`)
    const query = `INSERT INTO movieList (${inserKeys.join(',')}) VALUES ${escString.join(',')}`
    try {
        await pool.query('START TRANSACTION')
        await pool.query(query, values);
        await pool.query("COMMIT")
    }
    catch(error){
        console.error(error)
        await pool.query("ROLLBACK")
    }
}

const fix=( movie, inserKeys, fKeys)=>{

    inserKeys.forEach((inserKey)=>{
    if(!fKeys.find((key)=>key===inserKey))
    {
        movie[inserKey]=null;
    }
})
//console.log(movie);
return movie;
}
module.exports={
    storeMovies
}