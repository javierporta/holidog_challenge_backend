var booksDatabase = require('../mocks/booksDatabase');

// Send all books.
exports.list = function (req, res) {
    res.json(booksDatabase.booksList.slice(0, 99)); //Send first 100 rows. TODO: Pagination is not made in this example. Real world app must have it 
};

exports.detail = function (req, res) {
    res.json(booksDatabase.booksList.filter(x => x.id == req.params.id));
};

