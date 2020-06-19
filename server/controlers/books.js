const Book = require('../models/Book');

// get all books
exports.getBooks = async (req, res, next) => {
    try {
        console.log('in GET all books');
        const books = await Book.find();

        return res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching books, please try again...' });
    }
};

// Add a book to the library
exports.addBook = async (req, res, next) => {
    try {
        console.log('in POST new book with: ', req.body);
        const book = await Book.create(req.body);
  
        return res.status(201).json({
            success: true,
            data: book
         });
    } catch (error) {
        console.error(error);
        // if (error.code === 11000) {
        //     return res.status(400).json({ error: 'This book already exists!' });
        // }
        res.status(500).json({ error: 'Server error while adding book, please try again...' });
    }
};
