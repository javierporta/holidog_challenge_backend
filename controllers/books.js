var booksDatabase = require('../mocks/booksDatabase');

// Send all books.
exports.list = function (req, res) {
    res.json(booksDatabase.booksList.slice(0, 99)); //Send first 100 rows. TODO: Pagination is not made in this example. Real world app must have it 
};

exports.detail = function (req, res) {
    res.json(booksDatabase.booksList.filter(x => x.id == req.params.id));
};

exports.create = function (req, res) {

    let newBook = req.body;
    //ToDo: a better validation should be placed here (or even better, a middleware validation for the model may be implemented)
    // Now I'm only checking not empty values
    if (newBook.name && newBook.isbn && newBook.authorId) {

        //Add to database
        booksDatabase.booksList.push(newBook)

        res.sendStatus(200);
    } else {
        res.sendStatus(400); //Bad request. More information about the request might be provided
    }

};