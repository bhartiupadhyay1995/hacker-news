const express = require('express');
const router = express.Router();


const controller = require('./controller.js');

//api to get All stories
router.get('/getStoriesId', controller.getAllStoriesId);

//api to search stories  by the keyword
router.get('/search/:keyword', controller.search);

//api to get stories filtered by the story type
router.get('/filterResults/:filter', controller.filterResults);

//api to handle errors
router.use(controller.errormessage);

module.exports = router;
