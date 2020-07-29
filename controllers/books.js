var booksDatabase = require('../database/booksDatabase');


exports.list = async (req, res) => {
    const booksListResult = await booksDatabase.getBooksList();
    res.json(booksListResult);
};

exports.detail = async (req, res) => {
    const bookDetails = await booksDatabase.getBookDetails(req.params.id);

    if (bookDetails) {
        res.json(bookDetails);
    } else {
        res.sendStatus(404); //Not found
    }

};

exports.update = async (req, res) => {
    const bookUpdated = await booksDatabase.updateBook(req.params.id, req.body);

    if (bookUpdated) {
        res.json(bookUpdated);
    } else {
        res.sendStatus(404); //Not found
    }

};

exports.create = (req, res) => {

    let newBook = req.body;
    //ToDo: a better validation should be placed here (or even better, a middleware validation for the model may be implemented)
    // Now I'm only checking not empty values
    if (newBook.name && newBook.isbn && newBook.authorId) {

        //Add to database
        booksDatabase.createBook(newBook);

        res.status(201).json(newBook);
    } else {
        res.sendStatus(400); //Bad request. More information about the request might be provided
    }

};