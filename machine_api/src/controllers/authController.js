const authUtil = require('../utile/authtenticate.js');

exports.login = (req, res, next) => {
    try {
        const { username, password } = req.body || {};
        const jwt = authUtil.login_auth(username, password);
        return res.status(200).json({ token: jwt });
    } catch (err) {
        return next(err);
    }
};

exports.register = (req, res, next) => {
    try {
        const { username, password, levelAccess = 'user' } = req.body || {};        
        const jwt = authUtil.register_auth(username, password, levelAccess);
        res.status(201).json({ token: jwt });
    } catch (err) {
        return next(err);
    }
};