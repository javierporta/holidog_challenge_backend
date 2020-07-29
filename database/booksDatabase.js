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

var booksSchema = new Schema({
    name: String,
    isbn: String,
    _authorId: Schema.Types.ObjectId
});

// Compile model from schema
var bookModel = mongoose.model('book', booksSchema);

const getBooksList = async () => {
    //Here is easy to implement searches on server side (using findOne())
    return await bookModel.find((err, booksFromDb) => {
        if (err) return handleError(err);

        return booksFromDb;
    })
}

const getBookDetails = async (id) => {
    return await bookModel.findById(id, (err, bookDetailsFromDb) => {
        if (err) return handleError(err);

        return bookDetailsFromDb;
    })

}

const updateBook = async (id, bookToUpdate) => {
    return await bookModel.findByIdAndUpdate(id, bookToUpdate, (err, result) => {
        if (err) return handleError(err);

        return result;
    })

}

const createBook = (book) => {

    // Create an instance of model bookModel | mapping
    var bookToAdd = new bookModel(
        {
            name: book.name,
            isbn: book.isbn
        });

    // Save the new model instance, passing a callback
    bookToAdd.save((err) => {
        if (err) return handleError(err);
        // saved!
        console.log("Book saved")
    });

}

const handleError = (err) => {
    //In real word, properly handle the error
    console.error(err);
}

exports.getBooksList = getBooksList;
exports.getBookDetails = getBookDetails;
exports.createBook = createBook;
exports.updateBook = updateBook;