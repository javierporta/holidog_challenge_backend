var authorsDatabase = require('../database/authorsDatabase');


exports.list = async (req, res) => {
    const authorsListResult = await authorsDatabase.getAuthorsList();
    res.json(authorsListResult);
};

exports.detail = async (req, res) => {
    const authorDetails = await authorsDatabase.getAuthorDetails(req.params.id);

    if (authorDetails) {
        res.json(authorDetails);
    } else {
        res.sendStatus(404); //Not found
    }

};

exports.update = async (req, res) => {
    const authorUpdated = await authorsDatabase.updateAuthor(req.params.id, req.body);

    if (authorUpdated) {
        res.json(authorUpdated);
    } else {
        res.sendStatus(404); //Not found
    }

};

exports.create = (req, res) => {

    let newAuthor = req.body;
    //ToDo: a better validation should be placed here (or even better, a middleware validation for the model may be implemented)
    // Now I'm only checking not empty values
    if (newAuthor.firstName && newAuthor.lastName) {

        //Add to database
        authorsDatabase.createAuthor(newAuthor);

        res.sendStatus(200);
    } else {
        res.sendStatus(400); //Bad request. More information about the request might be provided
    }

};