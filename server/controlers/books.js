const Book = require('../models/Book');


// get all books
exports.getAllBooks = async (req, res, next) => {
    try {
        console.log('in GET all books');
        const books = await Book.find().sort({ title: 1 });

        return res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error fetching books, please try again...' });
    }
};

// Add a book to the library
exports.addBook = async (req, res, next) => {
    try {
        if (!req.files) {
            console.log('in POST new book with: ', req.body);
            const book = await Book.create(req.body);
            return res.status(201).json({
                success: true,
                data: book
            });
        } else {
            console.log('in POST new book with: ', req.body);
            const image = req.files.image;
            const uploadPath = `${process.env.FILE_UPLOAD_PATH}/${image.name}`;
            const displayPath = `images/${image.name}`;
            req.body.image = displayPath;
            image.mv(uploadPath, async error => {
                if (error) {
                  console.error(error);
                  return res.status(500).json({ error });
                }
                const book = await Book.create(req.body);
                return res.status(201).json({
                    success: true,
                    data: book
                });
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error while adding book, please try again...' });
    };
};

// Add image to book by id
exports.addBookImage = async (req, res, next) => {
    try {
        if (req.files === null) {
            return res.status(400).json({ msg: 'No file uploaded' });
        } else {
            console.log('in PUT image to book with', req.params.id, req.files.image);
            const values = Object.values(req.files);
            const name = (values[0].name);
            const bookImage = Buffer.from(req.files.image.data, 'base64');
            const id = req.params.id;
            await Book.findByIdAndUpdate({ _id: id }, { $set: { image: bookImage }}, { new: true });
            return res.status(201).json({
                success: true,
                data: name
             });
        };
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error while adding image to book, please try again...' });
    };
};

// Remove a book from db
exports.removeBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return next(
              console.log(`Book not found with id of ${req.params.id}`, 404)
            );
        };
        book.remove();
        res.status(200).json({ 
            success: true, 
            data: 'book deleted' 
        });
    } catch (error) {
        console.error('error removing book from library', error);
        return res.status(500).json({ error: 'Server error while deleting book, please try again...' });
    };
};