const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        const cookieToken = req.cookies.token;
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : null;
        const token = cookieToken || bearerToken;

        if (!token) {
            return res.status(401).json({
                message: 'Not authenticated'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};

module.exports = protect;