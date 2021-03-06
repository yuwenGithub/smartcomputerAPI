const Clarifai = require('clarifai');
const { apiKey, endpoint } = require('../config');

const clarifaiApp = new Clarifai.App({apiKey: apiKey});

// get url from request of frontend, do fetch to clarifar server,
// get face region data, send it through response to front end.
const handleApiCall = (req, res) => {
    //face_detect_Model from Clarifai
    clarifaiApp.models.predict(endpoint, req.body.input)
    .then(response => res.json(response))
    .catch(err => res.status(400).json("unable to reach Clarifai server"))
}


const handleImage = (db)=> (req, res) => {
    const { id } = req.body;
    db('users')
    .where({id: id})
    .returning('entries')
    .increment('entries', 1)
    .then(data => res.json(data));
}

module.exports = {
    handleImage, handleApiCall
};