var mongoose = require('mongoose');

//Set up default mongoose connection
const dbName = "holidogChallangeDB"
const dbUser = "dbuser"
const dbPassword = "Sopq8aRAYRp0Odsd"
const mongoDbUri = `mongodb+srv://${dbUser}:${dbPassword}@clusterjavier.kclyn.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(mongoDbUri, { useNewUrlParser: true });

mongoose.set('useFindAndModify', false);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define a schema
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    firstName: String,
    lastName: String,
});

// Compile model from schema
var authorModel = mongoose.model('author', authorSchema);

const getAuthorsList = async () => {
    //Here is easy to implement searches on server side (using findOne())
    return await authorModel.find((err, authorsFromDb) => {
        if (err) return handleError(err);

        return authorsFromDb;
    })
}

const getAuthorDetails = async (id) => {
    return await authorModel.findById(id, (err, authorDetailsFromDb) => {
        if (err) return handleError(err);

        return authorDetailsFromDb;
    })

}

const updateAuthor = async (id, authorToUpdate) => {
    return await authorModel.findByIdAndUpdate(id, authorToUpdate, (err, result) => {
        if (err) return handleError(err);

        return result;
    })

}

const createAuthor = (author) => {

    // Create an instance of model authorModel | mapping
    var authorToAdd = new authorModel(
        {
            firstName: author.firstName,
            lastName: author.lastName
        });

    // Save the new model instance, passing a callback
    authorToAdd.save((err) => {
        if (err) return handleError(err);
        // saved!
        console.log("Author saved")
    });

}

const handleError = (err) => {
    //In real word, properly handle the error
    console.error(err);
}

exports.getAuthorsList = getAuthorsList;
exports.getAuthorDetails = getAuthorDetails;
exports.createAuthor = createAuthor;
exports.updateAuthor = updateAuthor;