const Book = require('../models/Book');


// GET all books
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
    };
};

// GET a single book
exports.getThisBook = async (req, res, next) => {
    try {
        console.log('in GET this book', req.params.title);
        const books = await Book.find({ title: req.params.title }).collation( { locale: 'en', strength: 2 } ).sort({ title: 1 });

        return res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error fetching books, please try again...' });
    };
};

// GETs book(s) by search criteria
exports.searchBooks = async (req, res, next) => {
    console.log('in GET book(s) by search criteria', req.body);
    try {
        if(req.body.title !== '') {
            const books = await Book.find({ title: req.body.title }).collation( { locale: 'en', strength: 2 } ).sort({ title: 1 });
            return res.status(200).json({
                success: true,
                count: books.length,
                data: books
            });
        } else if (req.body.author !== '') {
            const books = await Book.find({ author: req.body.author }).collation( { locale: 'en', strength: 2 } ).sort({ title: 1 });
            return res.status(200).json({
                success: true,
                count: books.length,
                data: books
            });
        } else {
            if(req.body.status === 'available') {
                const books = await Book.find({ status: true }).sort({ title: 1 });
                return res.status(200).json({
                    success: true,
                    count: books.length,
                    data: books
                });
            } else {
                const books = await Book.find({ status: false }).sort({ title: 1 });
                return res.status(200).json({
                    success: true,
                    count: books.length,
                    data: books
                });
            };
        };
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error fetching book(s) by search, please try again...' });
    };
};

// POST a book to the library
exports.addBook = async (req, res, next) => {
    try {
        if (!req.files) {
            console.log('in POST new book with: ', req.body);
            await Book.create(req.body);
            return res.status(201).json({
                success: true,
                data: 'new book added!'
            });
        } else {
            console.log('in POST new book and image with: ', req.body);
            const image = req.files.image;
            const uploadPath = `${process.env.FILE_UPLOAD_PATH}/${image.name}`;
            const displayPath = `images/${image.name}`;
            req.body.image = displayPath;
            image.mv(uploadPath, async (error) => {
                if (error) {
                  console.error(error);
                  return res.status(500).json({ error });
                }
                await Book.create(req.body);
                console.log('added successfully!')
                return res.status(201).json({
                    success: true,
                    data: 'book & image added!'
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
    console.log('Deleteing book by id:', req.params.id);
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

// Removes multiple books from db
exports.removeMany = async (req, res, next) => {
    console.log('Deleteing multiple books by id:', req.body);
    try {
        const list = req.body
        await Book.deleteMany({ _id: { $in: list} });
        res.status(200).json({ 
            success: true, 
            data: 'books all deleted successfully' 
        });
    } catch (error) {
        console.error('error removing multiple books from library', error);
        return res.status(500).json({ error: 'Server error while deleting multiple books, please try again...' });
    };
};
