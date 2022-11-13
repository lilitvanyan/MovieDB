const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const hasPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return reject(err)
            return resolve(hash)
        })
    })
}

const comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        const a = bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                return reject(error)
            }
            return resolve(result)
        })

    })
}
const fetchGenId =  () => {

    const genres=[
        {"id":28,"name":"Action"}, {"id":12,"name":"Adventure"},
        {"id":16,"name":"Animation"}, {"id":35,"name":"Comedy"},
        {"id":80,"name":"Crime"}, {"id":99,"name":"Documentary"},
        {"id":18,"name":"Drama"}, {"id":10751,"name":"Family"},
        {"id":14,"name":"Fantasy"}, {"id":36,"name":"History"},
        {"id":27,"name":"Horror"}, {"id":10402,"name":"Music"},
        {"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},
        {"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},
        {"id":53,"name":"Thriller"},{"id":10752,"name":"War"},
        {"id":37,"name":"Western"}];
    
    return genres;
}

module.exports = {
    hasPassword, comparePassword, fetchGenId
}