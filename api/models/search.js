const pool = require('../db-connect');
const fetch = require('node-fetch');
const { fetchGenId } = require('../common/utils')
const express = require('express');

const queryAdult = (adult, bQuery) => {
    
    bQuery.queryStr += "adult=(?) and "
    bQuery.arr.push(adult);
    return bQuery
}
const queryPop = (popularMin, popularMax, bQuery) => {
    
    bQuery.queryStr += "popularity>=(?) and popularity<=(?) and "
    bQuery.arr.push(popularMin, popularMax);
    return bQuery
}
const queryVoteCMin = (voteCMin, voteCMax, bQuery) => {
    
    bQuery.queryStr += "vote_count>=(?) and vote_count<=(?) and "
    bQuery.arr.push(voteCMin, voteCMax);
    return bQuery;
}
const quertVideo = (video, bQuery) => {
    
    bQueryqueryStr += "video=(?) and "
    bQueryarr.push(video);
    return bQuery;
}
const queryVoteAv = (voteAvMin, voteAvMax, bQuery) => {
    
    bQuery.queryStr += "vote_average>=(?) and vote_average<=(?) and "
   bQuery.arr.push(voteAvMin, voteAvMax);
    return bQuery
}
const quertRelDate = (relDateMin, relDateMax, bQuery) => {
    
    bQuery.queryStr += "release_date>=(?) and release_date<=(?) and "
    bQuery.arr.push(relDateMin, relDateMax);
    return bQuery
}

const queryGenreNames = async (genereNames, bQuery) => {
    
    const genName = genereNames;
    const genNameArr = genName.split(", ");
    const genres = fetchGenId();
    let idArr = [];
    genNameArr.forEach((genName) => {
        const { id } = genres.find(genre => genre.name === genName);
        idArr.push(id);
    })
    let qu = idArr.reduce((acc, id) => {
        acc += "genre_ids LIKE '%?%' and ";
        return acc
    }, "")

    bQuery.queryStr += qu;
    idArr.forEach((val)=>bQuery.arr.push(val));
    return bQuery
}
const getSearchedMov=async (bQuery) => {
    console.log("bQuery.queryStr ", bQuery.queryStr);
    console.log("arr", bQuery.arr);
    const result = await pool.query(`Select * FROM movieList WHERE ${bQuery.queryStr}`, bQuery.arr);
    return result;
    
}

module.exports = {
    queryAdult, quertRelDate, quertVideo, queryVoteAv, queryPop, queryGenreNames, queryVoteCMin, getSearchedMov
}