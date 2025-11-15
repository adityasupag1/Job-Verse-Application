const mongoose = require('mongoose');
require('dotenv').config();

// Connect to the database
const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true, // Recommended options to avoid deprecation warnings
    })
        .then(() => {
            console.log('Connected to the Job Portal Database');
        })
        .catch((error) => {
            console.error('Connection to the database failed:', error.message);
            process.exit(1); // Exit the process with a failure code
        });
};

module.exports = databaseConnection;