const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier');

// git hub authenticate
const { isAuthenticated } = require("../middleware/authenticate");

// Route to get all suppliers
router.get('/', async (req, res) => {
    try {
        await supplierController.getAll(req, res);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ message: 'Internal server error while fetching suppliers' });
    }
});

// Route to get a single supplier by ID
router.get('/:id', async (req, res) => {
    try {
        await supplierController.getSingle(req, res);
    } catch (error) {
        console.error('Error fetching supplier:', error);
        res.status(500).json({ message: 'Internal server error while fetching the supplier' });
    }
});

// Route to create a new supplier
router.post('/', isAuthenticated, async (req, res) => {
    try {
        await supplierController.createSupplier(req, res);
    } catch (error) {
        console.error('Error creating supplier:', error);
        res.status(500).json({ message: 'Internal server error while creating the supplier' });
    }
});

// Route to update an existing supplier by ID
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        await supplierController.updateSupplier(req, res);
    } catch (error) {
        console.error('Error updating supplier:', error);
        res.status(500).json({ message: 'Internal server error while updating the supplier' });
    }
});

// Route to delete a supplier by ID
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        await supplierController.deleteSupplier(req, res);
    } catch (error) {
        console.error('Error deleting supplier:', error);
        res.status(500).json({ message: 'Internal server error while deleting the supplier' });
    }
});

module.exports = router;
