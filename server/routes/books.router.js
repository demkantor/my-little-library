const express = require('express');
const router = express.Router();
const { 
    addBook, 
    addBookImage, 
    editBook,
    getAllBooks, 
    getThisBook,
    removeBook, 
    removeMany, 
    searchBooks 
} = require('../controlers/books');


// book routes
router
.route('/')
.post(addBook)

router
.route('/all')
.get(getAllBooks)

router
.route('/edit/:id')
.put(editBook)

router
.route('/this/:title')
.get(getThisBook)

router
.route('/search')
.post(searchBooks)

router
.route('/image/:id')
.put(addBookImage)

router
.route('/remove/one/:id')
.delete(removeBook)

router
.route('/remove/many')
.delete(removeMany)

module.exports = router;
