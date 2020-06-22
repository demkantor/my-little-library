const express = require('express');
const router = express.Router();
const { addUser, authenticate, getUsers } = require('../controlers/users');


// user routes
router
.route('/')
.get(authenticate)
.get(getUsers)
.post(addUser)


module.exports = router;
