const express = require('express');
const router = express.Router();
const machinesController = require('../controllers/machinesController');
const { authenticated } = require('../midleware/authenticated');

// Appliquer le middleware d'authentification à toutes les routes de ce routeur
router.use(authenticated);

// CRUD Machines
router.post('/', machinesController.createMachine);
router.get('/:id', machinesController.getMachine);
router.patch('/:id', machinesController.updateMachine);
router.delete('/:id', machinesController.deleteMachine);

// Endpoint spécifique : accès utilisateur à la machine
router.post('/:id/access', machinesController.accessMachine);

module.exports = router;
