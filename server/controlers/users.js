const User = require('../models/User');


// authentication route
exports.authenticate = async (req, res, next) => {
    try {
        console.log('need to set up auth!');
    } catch(error) {
        console.log(error);
    }
};

// get all users
exports.getUsers = async (req, res, next) => {
    try {
        console.log('in GET all users');
        const users = await User.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching users, please try again...' });
    }
};

// Add a user to the member list
exports.addUser = async (req, res, next) => {
    try {
        console.log('in POST new user with: ', req.body);
        const user = await User.create(req.body);
  
        return res.status(201).json({
            success: true,
            data: user
         });
    } catch (error) {
        console.error(error);
        // if (error.code === 11000) {
        //     return res.status(400).json({ error: 'This user already exists!' });
        // }
        res.status(500).json({ error: 'Server error while adding user, please try again...' });
    }
};
