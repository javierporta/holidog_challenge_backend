
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var books = require('./controllers/books');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // log
    console.log(`Called ${req.originalUrl}`)
    console.log(`Request made at: ${new Date().toString()}`);
    next(); // make sure we go to the next routes and don't stop here
});

// api main route to test all is good
router.get('/', function (req, res) {
    res.json({ message: 'Welcome to Holidog Challenge API!' });
});


//Routes registration section

// BOOKS
router.get('/books', books.list);


// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Project running on port: ' + port);