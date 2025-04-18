const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded.user; // Attaching user info to request
        next(); // Proceed to the next route handler
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
