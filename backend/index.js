const app = require('./app');
const databaseConnection = require('./config/database');
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

databaseConnection();

const Port = process.env.PORT;
app.listen(Port, () => {
    console.log(`Server is running @ http://localhost:${Port}`);
});