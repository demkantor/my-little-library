const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title!'],
        unique: true,
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Please add an author!'],
        trim: true
    },
    comments: { 
        body: String
    },
    status: {
        type: Boolean,
        default: true
    }
});




module.exports = mongoose.model('Book', BookSchema);
