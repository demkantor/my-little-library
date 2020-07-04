const express = require('express');
const router = express.Router();
const { addUser, authenticate, getUsers, loginUser, registerUser, updateProfile } = require('../controlers/users');


// user routes
router
.route('/')
.post(addUser)

router
.route('/login')
.post(loginUser)

router
.route('/register')
.post(registerUser)

router
.route('/profile/update/:id')
.put(updateProfile)

router
.route('/all')
.get(getUsers)

router
.route('/auth/:id/:token')
.get(authenticate)

module.exports = router;
