const jwt = require('../utile/token.js');
const dbUtile = require('../utile/dbUtille.js');
const HttpError = require('../utile/httpError');

exports.identifyUser = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            throw new HttpError(401, 'No token provided');
        }

        const decoded = jwt.verifyToken(token);
        if (!decoded) {
            throw new HttpError(401, 'Invalid token');
        }

        const user = dbUtile.findUserById(decoded.id);
        if (!user) {
            throw new HttpError(404, 'User not found');
        }

        // Attach user information to the request object
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};