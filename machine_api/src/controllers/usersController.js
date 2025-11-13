const dbUtile = require('../utile/dbUtille.js');
const HttpError = require('../utile/httpError');
const { v4: uuidv4 } = require('uuid');

exports.createUser = (req, res, next) => {
  try {
    const { username, password, levelAccess = 'user' } = req.body;

    if (!username || !password) {
      throw new HttpError(400, 'username and password are required');
    }

    const newUser = { id: uuidv4(), username, password, levelAccess };
    dbUtile.addUser(newUser);

    res.status(201)
      .location(`/v1/users/${newUser.id}`)
      .json(newUser);
  } catch (err) {
    next(err);
  }
};

exports.getUser = (req, res, next) => {
  try {
    const user = dbUtile.findUserById(req.params.id);
    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    const { password, ...safeUser } = user; // Exclude password from the response
    res.json(safeUser);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = (req, res, next) => {
  try {
    const updates = req.body;
    const updatedUser = dbUtile.updateUser(req.params.id, updates);

    if (!updatedUser) {
      throw new HttpError(404, 'User not found');
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    const user = dbUtile.findUserById(req.params.id);
    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    dbUtile.deleteUser(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
