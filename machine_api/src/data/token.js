const jwt = require('jsonwebtoken');

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return false;
    }
};

exports.create = (user_id) => {
    return jwt.sign({ id: user_id}, process.env.JWT_SECRET, { expiresIn: '1h' });
};


