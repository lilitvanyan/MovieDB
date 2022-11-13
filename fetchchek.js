const express = require('express');
const fetch = require('node-fetch');
const { CHAR_EXCLAMATION_MARK } = require('picomatch/lib/constants');

ff = async () => {
    functi = async () => {
        url = "https://api.themoviedb.org/3/genre/movie/list?api_key=a6d50da0e79a2479cc843f4432412d63&language=en-US"
        const response = await fetch(url);
        const { genres } = await response.json();
        //console.log("response", genres);
        return genres;
    }
    const y = await functi();
}

ff()