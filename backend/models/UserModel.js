const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter your name"]
    },

    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Enter valid email address"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Please enter a password"]
    },

    avatar: {
        public_id: {
            type: String,
            required: [true, "Please upload an avatar image."]
        },
        url: {
            type: String,
            required: [true, "Please provide a URL for the avatar."]
        },
    },

    role: {
        type: String,
        enum: ["applicant", "admin"],
        default: "applicant"
    },

    skills: [
        {
            type: String,
            required: [true, "Please provide at least one skill."]
        }
    ],

    resume: {
        public_id: {
            type: String,
            required: [true, "Please upload your resume."]
        },
        url: {
            type: String,
            required: [true, "Please provide a URL for the resume."]
        },
    },

    savedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],

    appliedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;