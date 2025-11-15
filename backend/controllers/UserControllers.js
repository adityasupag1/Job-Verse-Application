const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { createToken } = require('../middlewares/auth');
const cloudinary = require('cloudinary');

exports.register = async (req, res) => {
    try {
        const { name, email, password, avatar, skills, resume } = req.body;

        // Validate required fields
        if (!name || !email || !password || !avatar || !resume) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Upload avatar to Cloudinary
        let avatarUploadResult;
        try {
            avatarUploadResult = await cloudinary.uploader.upload(avatar, {
                folder: 'avatar',
                crop: 'scale',
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to upload avatar to Cloudinary',
                error: err.message
            });
        }

        // Upload resume to Cloudinary
        let resumeUploadResult;
        try {
            resumeUploadResult = await cloudinary.uploader.upload(resume, {
                folder: 'resume',
                crop: 'fit',
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to upload resume to Cloudinary',
                error: err.message
            });
        }

        // Hash password before storing in DB
        const hashPass = await bcrypt.hash(password, 10);

        // Create the user in the database
        const user = new User({
            name,
            email,
            password: hashPass,
            avatar: {
                public_id: avatarUploadResult.public_id,
                url: avatarUploadResult.secure_url,
            },
            skills,
            resume: {
                public_id: resumeUploadResult.public_id,
                url: resumeUploadResult.secure_url,
            },
        });

        await user.save();

        // Create a JWT token
        const token = createToken(user._id, user.email);

        // Send response with user details and token
        res.status(201).json({
            message: 'User created successfully',
            user: { id: user._id, name: user.name, email: user.email, skills: user.skills, avatar: user.avatar.url },
            token,
        });

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            message: 'Internal server error',
            error: err.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User does not exist"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        // Create JWT or session token
        const token = createToken(user._id, user.email);

        // Send response
        res.status(200).json({
            message: "User logged in successfully",
            token
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.isLogin = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (user) {
            return res.status(200).json({
                isLogin: true
            })
        } else {
            return res.status(200).json({
                isLogin: false
            })
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
};

exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            user
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
};

exports.changePassword = async (req, res) => {
    try {

        const { oldPassword, newPassword, confirmPassword } = req.body;

        const user = await User.findById(req.user._id)

        const userPassword = user.password;

        const isMatch = await bcrypt.compare(oldPassword, userPassword);

        if (!isMatch) {
            return res.status(401).json({
                message: "Old password is incorrect."
            });
        }

        if (newPassword === oldPassword) {
            return res.status(400).json({
                message: "New password cannot be the same as the old password."
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "New password and confirm password do not match."
            });
        }

        const hashPass = await bcrypt.hash(newPassword, 10);

        user.password = hashPass;

        await user.save();

        res.status(200).json({
            message: "User password has been successfully changed."
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { newName, newEmail, newAvatar, newResume, newSkills } = req.body;

        if (!newName || !newEmail || !newSkills) {
            return res.status(400).json({ message: "Name, email, and skills are required." });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (newAvatar) {
            if (user.avatar?.public_id) {
                await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            }
            const uploadedAvatar = await cloudinary.v2.uploader.upload(newAvatar, {
                folder: 'avatar',
                crop: "scale",
            });
            user.avatar = {
                public_id: uploadedAvatar.public_id,
                url: uploadedAvatar.secure_url
            };
        }

        if (newResume) {
            if (user.resume?.public_id) {
                await cloudinary.v2.uploader.destroy(user.resume.public_id);
            }
            const uploadedResume = await cloudinary.v2.uploader.upload(newResume, {
                folder: 'resume',
                crop: "fit",
            });
            user.resume = {
                public_id: uploadedResume.public_id,
                url: uploadedResume.secure_url
            };
        }

        user.name = newName;
        user.email = newEmail;
        user.skills = newSkills;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully."
        });

    } catch (err) {
        console.error("Update profile error:", err);
        res.status(500).json({
            message: "Something went wrong while updating the profile."
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        // Delete files from Cloudinary
        if (user.avatar?.public_id) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        }
        if (user.resume?.public_id) {
            await cloudinary.v2.uploader.destroy(user.resume.public_id);
        }

        // Delete user account
        await User.findByIdAndDelete(req.user._id);

        res.status(200).json({ message: "Account deleted successfully." });

    } catch (err) {
        console.error("Error deleting account:", err);
        res.status(500).json({ message: "Something went wrong while deleting the account." });
    }
};