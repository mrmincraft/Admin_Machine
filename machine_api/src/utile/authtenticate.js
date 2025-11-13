const dbUtile = require('./dbUtille.js');
const HttpError = require('./httpError');
const bcrypt = require('bcryptjs');
const token = require('./token.js');
const { v4: uuidv4 } = require('uuid');

exports.login_auth = (username, password) => {
    if (!username || !password) throw new HttpError(400, 'username and password required');
    const user = dbUtile.findUserByUsername(username);
    if (!user) throw new HttpError(401, 'Invalid credentials');

    const passwordMatches = user.password && (bcrypt.compareSync(password, user.password) || user.password === password);
    if (!passwordMatches) throw new HttpError(401, 'Invalid credentials');

    return token.create(user.id);
};

exports.register_auth = (username, password, levelAccess = 'user') => {
    if (!username || !password) throw new HttpError(400, 'username and password required');
    const existingUser = dbUtile.findUserByUsername(username);
    if (existingUser) throw new HttpError(409, 'Username already exists');

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { id: uuidv4(), username, password: hashedPassword, levelAccess };

    dbUtile.addUser(newUser);

    return token.create(newUser.id);
}
