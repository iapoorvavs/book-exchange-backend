const jwt = require('jsonwebtoken');

// Function to generate a token for a user
const generateToken = (user) => {
    return jwt.sign(
        { user: { id: user._id } },            // Payload: user ID
        process.env.JWT_SECRET_KEY,            // Secret Key (from .env)
        { expiresIn: '1h' }                    // Token validity (1 hour)
    );
};

module.exports = generateToken;               // Export the function
