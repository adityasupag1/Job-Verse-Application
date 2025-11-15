const Job = require('../models/JobModel');
const User = require('../models/UserModel');
const Application = require('../models/AppModel');
const cloudinary = require('cloudinary');

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        res.status(200).json({
            success: true,
            jobs,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        res.status(200).json({
            success: true,
            users,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.getAllApp = async (req, res) => {
    try {
        const applications = await Application.find().populate("job applicant");

        res.status(200).json({
            success: true,
            applications,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.getApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate("job applicant");

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        res.status(200).json({
            success: true,
            application,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.updateApplication = async (req, res) => {
    try {
        // Check if the application exists
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        // Update the status
        application.status = req.body.status;

        // Save the updated application
        await application.save();

        res.status(200).json({
            success: true,
            message: "Application updated successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);

        // If the application doesn't exist
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Application deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // If the user doesn't exist
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if a new role is provided in the request body
        if (!req.body.role) {
            return res.status(400).json({
                success: false,
                message: "Role is required",
            });
        }

        // Update the user's role
        user.role = req.body.role;

        // Save the updated user
        await user.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        // If user doesn't exist
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        // If the job doesn't exist
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        res.status(200).json({
            success: true,
            job,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        // If the job doesn't exist
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // If there's no company logo in the request body, skip image handling
        if (req.body.companyLogo) {
            // Delete the old company logo from Cloudinary
            const logoToDelete_Id = job.companyLogo.public_id;
            await cloudinary.v2.uploader.destroy(logoToDelete_Id);

            // Upload the new company logo to Cloudinary
            const logo = req.body.companyLogo;
            const myCloud = await cloudinary.v2.uploader.upload(logo, {
                folder: 'logo',
                crop: 'scale',
            });

            // Update companyLogo URL and public_id
            req.body.companyLogo = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }

        // Update the job with the new details
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Job Updated",
            job: updatedJob
        });
    } catch (err) {
        console.error("Error updating job:", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        // If the job doesn't exist
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};