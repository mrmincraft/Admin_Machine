const jwt = require('../data/token.js');

exports.authenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'No token provided' });  
    
    const decoded = jwt.verifyToken(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.id;
    next();
}
