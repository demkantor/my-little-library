const express = require('express');
const router = express.Router();
const { addBook, addBookImage, getAllBooks, removeBook } = require('../controlers/books');


// book routes
router
.route('/')

.post(addBook)

router
.route('/all')
.get(getAllBooks)

router
.route('/image/:id')
.put(addBookImage)

router
.route('/remove/:id')
.delete(removeBook)

module.exports = router;
