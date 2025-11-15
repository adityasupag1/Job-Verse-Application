const Job = require('../models/JobModel');
const User = require('../models/UserModel');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

exports.createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            companyName,
            location,
            logo,
            skillsRequired,
            experience,
            salary,
            category,
            employmentType
        } = req.body;

        // Basic validation
        if (!title || !description || !companyName || !location || !logo || !skillsRequired || !experience || !salary || !category || !employmentType) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Upload logo
        const myCloud = await cloudinary.v2.uploader.upload(logo, {
            folder: 'logo',
            crop: "scale",
        });

        // Create job
        const newJob = await Job.create({
            title,
            description,
            companyName,
            companyLogo: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            location,
            skillsRequired,
            experience,
            category,
            salary,
            employmentType,
            postedBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully.",
            job: newJob
        });

    } catch (err) {
        console.error("Error creating job:", err);
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the job."
        });
    }
};

exports.allJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        res.status(200).json({
            success: true,
            jobs
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch jobs: " + err.message
        });
    }
};

exports.oneJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid job ID."
            });
        }

        const job = await Job.findById(jobId).populate('postedBy', 'name email');

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found."
            });
        }

        res.status(200).json({
            success: true,
            job
        });

    } catch (err) {
        console.error("Error fetching job:", err);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve job details."
        });
    }
};


exports.saveJob = async (req, res) => {
    try {
        const userId = req.user._id;
        const jobId = req.params.id;

        // Validate job ID
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ success: false, message: "Invalid Job ID." });
        }

        // Check job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found." });
        }

        const user = await User.findById(userId);

        const alreadySaved = user.savedJobs.includes(jobId);

        if (alreadySaved) {
            user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Job unsaved."
            });
        } else {
            user.savedJobs.push(jobId);
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Job saved."
            });
        }

    } catch (err) {
        console.error("Error saving job:", err);
        res.status(500).json({
            success: false,
            message: "An error occurred while saving the job."
        });
    }
};

exports.getSavedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('savedJobs');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            savedJobs: user.savedJobs
        });

    } catch (err) {
        console.error("Error fetching saved jobs:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch saved jobs."
        });
    }
};