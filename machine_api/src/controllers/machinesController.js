const dbUtile = require('../utile/dbUtille.js');
const HttpError = require('../utile/httpError');

exports.createMachine = (req, res, next) => {
  try {
    const { nameMachine, status, levelAccess } = req.body;

    if (!nameMachine || !status || !levelAccess) {
      throw new HttpError(400, 'nameMachine, status, and levelAccess are required');
    }

    const newMachine = { id: Date.now(), nameMachine, status, levelAccess };
    dbUtile.addMachine(newMachine);

    res.status(201)
      .location(`/v1/machines/${newMachine.id}`)
      .json(newMachine);
  } catch (err) {
    next(err);
  }
};

exports.getMachine = (req, res, next) => {
  try {
    const machine = dbUtile.findMachineById(parseInt(req.params.id));
    if (!machine) {
      throw new HttpError(404, 'Machine not found');
    }
    res.json(machine);
  } catch (err) {
    next(err);
  }
};

exports.updateMachine = (req, res, next) => {
  try {
    const updates = req.body;
    const updatedMachine = dbUtile.updateMachine(parseInt(req.params.id), updates);

    if (!updatedMachine) {
      throw new HttpError(404, 'Machine not found');
    }

    res.status(200).json(updatedMachine);
  } catch (err) {
    next(err);
  }
};

exports.deleteMachine = (req, res, next) => {
  try {
    const machine = dbUtile.findMachineById(parseInt(req.params.id));
    if (!machine) {
      throw new HttpError(404, 'Machine not found');
    }

    dbUtile.deleteMachine(parseInt(req.params.id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.accessMachine = (req, res, next) => {
  try {
    
    res.status(200).json({ allowed: true, message: 'Access granted' });
  } catch (err) {
    next(err);
  }
};
