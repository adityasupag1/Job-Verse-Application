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

// Body parser
app.use(express.json({ limit: '10mb' }));

// CORS for local & production
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            process.env.FRONTEND_URL   // recommended
        ],
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    })
);

// File upload
app.use(
    fileUpload({
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
        abortOnLimit: true,
        useTempFiles: true,
        tempFileDir: '/tmp'
    })
);

// Routes
app.use("/api/v1", User);
app.use("/api/v1", Job);
app.use("/api/v1", Application);
app.use("/api/v1/admin", Admin);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
