var booksDatabase = require('../database/booksDatabase');


exports.list = async (req, res) => {
    const booksListResult = await booksDatabase.getBooksList();
    res.json(booksListResult);
};

exports.detail = async (req, res) => {
    const bookDetails = await booksDatabase.getBookDetails(req.params.id);

    res.json(bookDetails);
};

exports.create = (req, res) => {

    let newBook = req.body;
    //ToDo: a better validation should be placed here (or even better, a middleware validation for the model may be implemented)
    // Now I'm only checking not empty values
    if (newBook.name && newBook.isbn && newBook.authorId) {

        //Add to database
        booksDatabase.createBook(newBook);

        res.sendStatus(200);
    } else {
        res.sendStatus(400); //Bad request. More information about the request might be provided
    }

};