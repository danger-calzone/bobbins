const express = require('express');
const router = express.Router();
const bobbinController = require('../controllers/bobbinController');

// Route to get all bobbins
router.get('/', bobbinController.getAllBobbins);
// Route to get a bobbin by ID
router.get('/:id', bobbinController.getBobbinById);
// Route to get all bobbins by owner ID
router.get('/owner/:id', bobbinController.getBobbinsByOwnerId);
// Route to create a new bobbin
router.post('/', bobbinController.createBobbin);
// Route to update a bobbin by ID
router.put('/:id', bobbinController.updateBobbin);
// Route to delete a bobbin by ID
router.delete('/:id', bobbinController.deleteBobbin);

module.exports = router;
