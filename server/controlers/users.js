const User = require('../models/User');


// authentication route
exports.authenticate = async (req, res, next) => {
    console.log('in auth route');
    const id = req.params.id;
    const token = req.params.token;
    try {
        const user = await User.findById(id)
        if(user.failed) {
            return res.status(401).json({
                success: false
            });
        } else {
            return res.status(200).json({
                success: true,
                data: user
            });
        };
    } catch(error) {
        console.log(error);
    };
};

// signs in a user
exports.loginUser = async (req, res, next) => {
    try {
        console.log('in user login POST', req.body);
        const email = req.body.email;
        const password = req.body.password;
        const loginUser = await User.findByCredentials(email, password);
        
        if(loginUser.failed) {
            return res.status(401).json({
                success: false
            });
        } else {

            const refreshToken = await loginUser.createSession();
            const accessToken = await loginUser.generateAccessAuthToken();
            return res
                .header('x_refresh_token', refreshToken)
                .header('x_access_token', accessToken)
                .status(200).json({
                    success: true,
                    data: loginUser
                });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error logging in, please try again...' });
    };
};

// registers a user
exports.registerUser = async (req, res, next) => {
    try {
        console.log('in new user register POST', req.body);
        let body = req.body;
        let newUser = new User(body);

        await newUser.save();
        const refreshToken = await newUser.createSession();
        const accessToken = await newUser.generateAccessAuthToken();
        // console.log( accessToken, refreshToken)
        return res
            .header('x_refresh_token', refreshToken)
            .header('x_access_token', accessToken)
            .status(200).json({
                success: true,
                data: newUser
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error registering, please try again...' });
    };
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

// Add a user to the member list - done by libraian role
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
    };
};

// Update user info
exports.updateProfile = async (req, res, next) => {
    try {
        console.log('in update user profile PUT: ', req.params.id, req.body);
        const id = req.params.id;
        const body = req.body
        if (!req.files) {
            const user = await User.findByIdAndUpdate( id, { $set: body }, function(err, res){
                if(err) {
                    console.log(err);
                } else {
                    console.log('success!')
                }
            });
            return res.status(201).json({
                success: true,
                data: user
            });
        } else {
            const image = req.files.image;
            const uploadPath = `${process.env.FILE_UPLOAD_PATH}/users/${image.name}`;
            const displayPath = `images/users/${image.name}`;
            body.image = displayPath;
            image.mv(uploadPath, async (error) => {
                if (error) {
                  console.error(error);
                  return res.status(500).json({ error });
                }
                const user = await User.findByIdAndUpdate( id, { $set: body }, function(err, res){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('success!')
                    }
                });
                return res.status(201).json({
                    success: true,
                    data: user
                });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error while updating user, please try again...' });
    };
};
