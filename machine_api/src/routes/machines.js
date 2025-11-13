const express = require('express');
const router = express.Router();
const machinesController = require('../controllers/machinesController');
const { identifyUser } = require('../midleware/identifyUser');

// Apply the identifyUser middleware to all machine routes
router.use(identifyUser);

/**
 * @swagger
 * tags:
 *   name: Machines
 *   description: Machine management
 */

/**
 * @swagger
 * /v1/machines:
 *   post:
 *     summary: Create a new machine
 *     tags: [Machines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               status:
 *                 type: string
 *                 default: active
 *     responses:
 *       201:
 *         description: Machine created successfully
 *       400:
 *         description: Missing required fields
 */
router.post('/', machinesController.createMachine);

/**
 * @swagger
 * /v1/machines/{id}:
 *   get:
 *     summary: Get a machine by ID
 *     tags: [Machines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Machine ID
 *     responses:
 *       200:
 *         description: Machine data
 *       404:
 *         description: Machine not found
 */
router.get('/:id', machinesController.getMachine);

/**
 * @swagger
 * /v1/machines/{id}:
 *   patch:
 *     summary: Update a machine by ID
 *     tags: [Machines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Machine ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Machine updated successfully
 *       404:
 *         description: Machine not found
 */
router.patch('/:id', machinesController.updateMachine);

/**
 * @swagger
 * /v1/machines/{id}:
 *   delete:
 *     summary: Delete a machine by ID
 *     tags: [Machines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Machine ID
 *     responses:
 *       204:
 *         description: Machine deleted successfully
 *       404:
 *         description: Machine not found
 */
router.delete('/:id', machinesController.deleteMachine);

/**
 * @swagger
 * /v1/machines/{id}/access:
 *   post:
 *     summary: Grant user access to a machine
 *     tags: [Machines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Machine ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Access granted successfully
 *       404:
 *         description: Machine or user not found
 */
router.post('/:id/access', machinesController.accessMachine);

module.exports = router;
