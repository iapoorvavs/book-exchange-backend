const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({
            name,
            email,
            password,
        });

        const token = generateToken(user);

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Authenticate user and get token
// @route   POST /api/auth/login
// @access  Public
exports.authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user);

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
