const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


const jwtSecret = process.env.JWT_SECRET

const UserSchema = new mongoose.Schema({
    email: { 
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: { 
        type: String,
        required: false
    },
    image: {
        type: String
    },
    imageName: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'Member'
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});


// *** Instance methods ***
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    //  don't return the password or session to server
    return _.omit(userObject, ['password', 'sessions']);
};

UserSchema.methods.generateAccessAuthToken = function () {
    const user = this;
    return new Promise((resolve, reject) => {
        // Create the JSON Web Token and return that
        jwt.sign({ _id: user._id.toHexString() }, jwtSecret, { expiresIn: "15m" }, (err, token) => {
            if (!err) {
                resolve(token);
            } else {
                reject();
            };
        });
    });
};

UserSchema.methods.generateRefreshAuthToken = function () {
    // This method simply generates a 64byte hex string - it doesn't save it to the database. saveSessionToDatabase() does that.
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (!err) {
                // no error
                let token = buf.toString('hex');
                return resolve(token);
            };
        });
    });
};

UserSchema.methods.createSession = function () {
    let user = this;
    return user.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(user, refreshToken);
    }).then((refreshToken) => {
        return refreshToken;
    }).catch((e) => {
        return Promise.reject('Failed to save session to database.\n' + e);
    });
};


/* MODEL METHODS (static methods) */
UserSchema.statics.getJWTSecret = () => {
    return jwtSecret;
};

UserSchema.statics.findByIdAndToken = function (_id, token) {
    // finds user by id and token
    // used in auth middleware (verifySession)
    const User = this;
    return User.findOne({
        _id,
        'sessions.token': token
    });
};

// used to check user credentials on loging in
UserSchema.statics.findByCredentials = async function (email, password) {
    try {
        let User = this;
        const findemail = await User.findOne({ email });
        if(!findemail) throw new Error("no user found!");
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, findemail.password, (err, res) => {
                if (res) {
                    resolve(findemail);
                }
                else {
                    reject();
                    console.log(password, findemail.password)
                    console.error('rejected, password does not match!', err);
                };
            });
        });
    } catch (error) {
        console.log('error finding user or password mismatch!', error);
        return {failed: true}
    };
};

UserSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now() / 1000;
    if (expiresAt > secondsSinceEpoch) {
        // hasn't expired
        return false;
    } else {
        // has expired
        return true;
    };
};


/* MIDDLEWARE */
// Before a user document is saved, this code runs
UserSchema.pre('save', function (next) {
    let user = this;
    let costFactor = 10;
    if (user.isModified('password')) {
        // if the password field has been edited/changed then run this code.
        // Generate salt and hash password
        bcrypt.genSalt(costFactor, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    };
});


/* HELPER METHODS */
let saveSessionToDatabase = (user, refreshToken) => {
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();
        user.sessions.push({ 'token': refreshToken, expiresAt });
        user.save().then(() => {
            // saved session successfully
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e);
        });
    });
};

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = "10";
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
};



module.exports = mongoose.model('User', UserSchema);
