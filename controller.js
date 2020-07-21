const axios = require('axios');
const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const newStoriesUrl = `${baseUrl}newstories.json?orderBy="$key"&limitToFirst=20`;
const storyUrl = `${baseUrl}item/`;
const Fuse = require('fuse.js')


exports.getAllStoriesId = async (req, res) => {
    const stories = await axios.get(newStoriesUrl);
    const storiesData = stories.data;
    var storiesarray = [];
    for (var i = 0; i < storiesData.length; i++) {
        const result2 = await axios.get(`${storyUrl + storiesData[i]}.json?print=pretty`);
        storiesarray.push(result2.data);
    };
    if (storiesarray.length > 10) {
        res.send(storiesarray);
    }
};

exports.search = async (req, res) => {
    const stories = await axios.get("http://localhost:1234/api/getStoriesId");
    const options = {
        shouldSort: true,
        isCaseSensitive: false,
        findAllMatches: true,
        includeMatches: true,
        includeScore: true,
        useExtendedSearch: false,
        threshold: 0.0,
        maxPatternLength: 32,
        keys: ['title', 'by', 'url'],
        ignoreLocation: true
    };
    const fuse = new Fuse(stories.data, options)
    const result = fuse.search(req.params.keyword)
    var searcharray = [];
    for (var i = 0; i < result.length; i++) {
        searcharray.push(result[i].item);
    };
    console.log(searcharray);
    res.send(searcharray);
}

exports.filterResults = async (req, res) => {
    const result1 = await axios.get("http://localhost:1234/api/getStoriesId");
    let type = 'story';
    if (req.params.filter) {
        type = req.params.filter
    }
    const defaults = {
        type: type
    }
    let filters = Object.assign({}, defaults, req.params.filter);
    console.log(filters);
    let filterResponse = result1.data.filter(obj =>
        filters.type.toLowerCase() == obj.type.toLowerCase())
    try {
        res.json(filterResponse);
    } catch (err) {
        res.json({ message: err });
    }
};


// error handler
exports.errormessage = (err, req, res, next) => {
    console.log(req.body);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err;
    // render the error page
    res.status(err.status || 500);
    res.send(err);
};

