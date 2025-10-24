const loadDB= require ('../data/dbUtille.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

exports.login = (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });

    const db = loadDB();
    const user = (db.users || []).find(u => u.username === username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Support either plain-text passwords in db.json or hashed bcrypt passwords.
    const passwordMatches = user.password && (bcrypt.compareSync(password, user.password) || user.password === password);
    if (!passwordMatches) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
};