const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter a first name"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Please enter a last name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 characters"],
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User