const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const User = require('./routes/UserRoutes');
const Job = require('./routes/JobRoutes');
const Application = require('./routes/ApplicationRoutes');
const Admin = require('./routes/AdminRoutes');
const { errorMiddleware } = require('./middlewares/error');
require('dotenv').config();

app.use(express.json({ limit: '10mb' }));

app.use(
    cors({
        origin: ["http://localhost:5173",
            "https://jobverseapp.onrender.com"
        ],
        credentials: true,
    })
);

app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
    abortOnLimit: true,
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use("/api/v1", User);
app.use("/api/v1", Job);
app.use("/api/v1", Application);
app.use("/api/v1/admin", Admin);

//for any unwanted error
app.use(errorMiddleware);

module.exports = app;