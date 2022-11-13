const bodyParser = require('body-parser');
const { search } = require('../routes/movies');
const { queryAdult, quertRelDate, quertVideo, queryVoteAv, queryPop, queryGenreNames, queryVoteCMin, getSearchedMov } = require('../models/search')
const {movieList} = require('../controllers/movies')

const bigSearch = async (req, res, next) => {

    let bQuery = {
        queryStr: "",
        arr: []
    }
    if (req.body.adult !== undefined) {
        bQuery = queryAdult(req.body.adult, bQuery);
    }
    if (req.body.popularMin !== undefined && req.body.popularMax !== undefined) {
        queryPop(req.body.popularMin, req.body.popularMax, bQuery);
    }
    if (req.body.voteCMin !== undefined && req.body.voteCMax !== undefined) {
        queryVoteCMin(req.body.voteCMin, req.body.voteCMax, bQuery);
    }
    if (req.body.video !== undefined) {
        quertVideo(req.body.video, bQuery);
    }
    if (req.body.voteAvMin !== undefined && req.body.voteAvMax !== undefined) {
        queryVoteAv(req.body.voteAvMin, req.body.voteAvMax, bQuery)
    }
    if (req.body.relDateMin !== undefined && req.body.relDateMax !== undefined) {
        quertRelDate(req.body.relDateMin, req.body.relDateMax, bQuery)
    }
    if (req.body.genereNames !== undefined) {
        console.log(req.body.genereNames);
        queryGenreNames(req.body.genereNames, bQuery);
    }
    if (bQuery.queryStr.length === 0) {
        const movies=await movieList(req, res);
       
    }
    else {
        bQuery.queryStr = bQuery.queryStr.substring(0, bQuery.queryStr.length - 5);

        const result = await getSearchedMov(bQuery);
        if (result[0].length === 0) res.send("Sorry, we don't have that type of movie(");
        else res.send(result);
    }

}

module.exports = {
    bigSearch
}