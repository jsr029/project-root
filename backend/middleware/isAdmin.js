const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'RANDOM_TOKEN_SECRET');
        const { role } = decodedToken; // Include userId
        const userId = req.user.id
        if (role !== 'admin') { // Allow both admin and superAdmin
            return res.status(403).json({ message: "Vous n'êtes pas autorisé." });
        }

        req.auth = { role, userId }; // Add userId to req.auth
        console.log(role, userId)
        next();
    } catch (error) {
        return res.status(401).json({ message: "Vous n'êtes pas autorisé." });
    }
};

module.exports = isAdmin;

