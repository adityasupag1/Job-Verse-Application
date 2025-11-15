const Job = require('../models/JobModel');
const User = require('../models/UserModel');
const Application = require('../models/AppModel');
const mongoose = require('mongoose');

exports.createApplication = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.resume || !user.resume.public_id || !user.resume.url) {
            return res.status(400).json({
                success: false,
                message: "User resume is missing"
            });
        }

        if (user.appliedJobs.includes(job._id)) {
            return res.status(400).json({
                success: false,
                message: "You have already applied to this job"
            });
        }

        const application = await Application.create({
            job: job._id,
            applicant: user._id,
            applicantResume: {
                public_id: user.resume.public_id,
                url: user.resume.url
            }
        });

        user.appliedJobs.push(job._id);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Application created successfully",
            application
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server Error: " + err.message
        });
    }
};

exports.getSingleApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('job')
            .populate('applicant');

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        res.status(200).json({
            success: true,
            application
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error: " + err.message
        });
    }
};

exports.getUsersAllApplications = async (req, res) => {
    try {
        const allApplications = await Application.find({ applicant: req.user._id })
            .populate('job')
            .populate('applicant');

        if (allApplications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No applications found for this user"
            });
        }

        res.status(200).json({
            success: true,
            allApplications
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error: " + err.message
        });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const applicationId = req.params.id;

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found or already deleted"
            });
        }

        // Ensure the application belongs to the logged-in user
        if (application.applicant.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this application"
            });
        }

        await Application.findByIdAndDelete(applicationId);

        // Remove the job from user's appliedJobs
        user.appliedJobs = user.appliedJobs.filter(
            (jobId) => jobId.toString() !== application.job.toString()
        );

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Application deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error: " + err.message
        });
    }
};