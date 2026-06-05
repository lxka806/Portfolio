const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Not authenticated'
            });
        }
        

        // Normalize roles for case-insensitive comparison
        const allowed = roles.map(r => String(r).toLowerCase());
        const userRole = req.user && req.user.role ? String(req.user.role).toLowerCase() : null;

        if (!userRole || !allowed.includes(userRole)) {
            return res.status(403).json({
                message: 'You do not have permission'
            });
        }

        next();
    };
};

module.exports = authorize;