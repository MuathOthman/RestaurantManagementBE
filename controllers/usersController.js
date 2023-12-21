require("dotenv").config();
const User = require("../models/usersMongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const getUserByID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        } else {
            res.json(user);
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const createUser = async (req, res) => {
    const salt = await bcrypt.genSalt();
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(400).json({message: "User already exists"});
        } else {
            const newUser = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, salt)
            });
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ token, user });
    } catch (err) {
        // Handle any errors that occur during the login process
        console.error("Login error:", err);
        res.status(500).json({ error: "An error occurred during login" });
    }
};


const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (req.body.email != null) {
            user.email = req.body.email;
        }
        if (req.body.password != null) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.remove();
        res.json({message: "User deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    getUsers,
    getUserByID,
    createUser,
    loginUser,
    updateUser,
    deleteUser
}