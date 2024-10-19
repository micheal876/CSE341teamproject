const express = require('express');
const router = express.Router();

const inventoryController = require('../controllers/inventory');

router.get('/', inventoryController.getAll);
router.get('/:id', inventoryController.getSingle);

router.post('/', inventoryController.createInventory);

router.put('/:id', inventoryController.updateInventory);

router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;