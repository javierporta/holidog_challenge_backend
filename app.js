
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var books = require('./controllers/books');
var authors = require('./controllers/authors');

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
    // log. In real world scenario should be stored somewhere in the cloud
    console.log(`Called ${req.method} ${req.originalUrl}`)
    console.log(`Request made at: ${new Date().toString()}`);
    next(); // make sure we go to the next routes and don't stop here
});

// api main route to test all is good
router.get('/', function (req, res) {
    res.json({ message: 'Welcome to Holidog Challenge API!' });
});


//Routes registration section

// BOOKS
const booksResourceName = "books";
//NOTE: I personally do not agree with name convention given in the statement. 
//According to RESTful conventions and good practices, reources names must be consistent and written in plural.
//That's why I always use "books" & "authors"
router.get(`/${booksResourceName}`, books.list);
router.get(`/${booksResourceName}/:id`, books.detail);
router.post(`/${booksResourceName}`, books.create);
router.put(`/${booksResourceName}/:id`, books.update);

// AUTHORS
const authorsResource = "authors";

router.get(`/${authorsResource}`, authors.list);
router.get(`/${authorsResource}/:id`, authors.detail);
router.post(`/${authorsResource}`, authors.create);
router.put(`/${authorsResource}/:id`, authors.update);


// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Project running on port: ' + port);