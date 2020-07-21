const express = require('express');
const bodyParser = require('body-parser');
const stories = require('./routes');// Imports routes for the librarys
var cors = require('cors');

const app = express();
app.use(cors())

app.use(bodyParser.json());

app.use('/api', stories);

let port = 1234;
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send({status: err.status, message: 'Please check your API'});
});

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});