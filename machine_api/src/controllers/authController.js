const utile = require ('../data/dbUtille.js');
const token = require('../data/token.js');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

exports.login = (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });

    const db = utile.loadDB();
    const user = (db.users || []).find(u => u.username === username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Support either plain-text passwords in db.json or hashed bcrypt passwords.
    const passwordMatches = user.password && (bcrypt.compareSync(password, user.password) || user.password === password);
    if (!passwordMatches) return res.status(401).json({ error: 'Invalid credentials' });

    const jwt = token.create(user.id);
    return res.status(200).json({ token: jwt });
};

exports.register = (req, res) => {
    const { username, password, levelAccess = 'user' } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });

    // checking for existing user
    const db = utile.loadDB();
    const existingUser = (db.users || []).find(u => u.username === username);
    if (existingUser) return res.status(409).json({ error: 'Username already exists' });
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { id: uuidv4(), username, password: hashedPassword, levelAccess };
    db.users.push(newUser);
    utile.writeDB(db);
    const jwt = token.create(newUser.id);
    res.status(201).json({ token: jwt });
};