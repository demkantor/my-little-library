const express = require('express');
const router = express.Router();
const { addBook, getAllBooks } = require('../controlers/books');


// book routes
router
.route('/')

.post(addBook)

router
.route('/all')
.get(getAllBooks)

module.exports = router;
