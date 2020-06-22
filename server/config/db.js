const mongoose = require('mongoose');

// connection to mongo atlas cloud database
const connectDB = async () => {
    // console.log(process.env);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
          });
          console.log(`MongoDB connected succesfully: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error while attempting to connect to MongoDB", error);
        process.exit(1);
    }
};


module.exports = connectDB;
