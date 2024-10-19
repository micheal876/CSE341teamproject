const express = require('express');
const router = express.Router();

const inventoryController = require('../controllers/inventory');

// Route to get all inventory items
router.get('/', async (req, res) => {
    try {
        await inventoryController.getAll(req, res);
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        res.status(500).json({ message: 'Internal server error while fetching inventory items' });
    }
});

// Route to get a single inventory item by ID
router.get('/:id', async (req, res) => {
    try {
        await inventoryController.getSingle(req, res);
    } catch (error) {
        console.error(`Error fetching inventory item with ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal server error while fetching the inventory item' });
    }
});

// Route to create a new inventory item
router.post('/', async (req, res) => {
    try {
        await inventoryController.createInventory(req, res);
    } catch (error) {
        console.error('Error creating inventory item:', error);
        res.status(500).json({ message: 'Internal server error while creating the inventory item' });
    }
});

// Route to update an inventory item by ID
router.put('/:id', async (req, res) => {
    try {
        await inventoryController.updateInventory(req, res);
    } catch (error) {
        console.error(`Error updating inventory item with ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal server error while updating the inventory item' });
    }
});

// Route to delete an inventory item by ID
router.delete('/:id', async (req, res) => {
    try {
        await inventoryController.deleteInventory(req, res);
    } catch (error) {
        console.error(`Error deleting inventory item with ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal server error while deleting the inventory item' });
    }
});

module.exports = router;
