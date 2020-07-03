const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');

// load env
dotenv.config({ path: '.env' });

// connection to mongoDB atals
connectDB();

// load express
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// apply headers
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x_access_token, x_refresh_token, _id");
    res.header(
        'Access-Control-Expose-Headers',
        'x_access_token, x_refresh_token'
    );
    next();
});

// Route includes
const booksRouter = require('./routes/books.router');
const usersRouter = require('./routes/users.router');

/* Routes */
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);

// listen on port...
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
