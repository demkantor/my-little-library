const express = require('express');
const router = express.Router();
const { getBooks, addBook } = require('../controlers/books');


// book routes
router
.route('/')
.get(getBooks)
.post(addBook)


module.exports = router;
