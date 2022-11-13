const express = require('express');
const fetch = require('node-fetch');
const { storeMovies } = require('./storeMovies');
const { lastPage } = require('./lastPage.js');
const {storeLastPage}=require('./storeLastPage');
const CronJob = require('cron').CronJob;

new CronJob('* * * * * *', async function () { 
    let lastP = await lastPage();
    if(lastP >= 500){
        console.log('all movies has been inserted')
        return true
    }
    const url = `${process.env.TMDB_HOST}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${lastP}`
    const response = await fetch(url)
    const { results: movies } = await response.json()
    await storeMovies(movies);
    lastP += 1 
    await storeLastPage(lastP);
    console.log(6);
}, null, true, 'America/Los_Angeles');




