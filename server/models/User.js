const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'What is your first name?'],
        unique: true,
        trim: true
    },
    last_name: {
        type: String,
        required: [true, 'What is your last name?'],
        trim: true
    },
    email: { 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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
    }
});




module.exports = mongoose.model('User', UserSchema);
