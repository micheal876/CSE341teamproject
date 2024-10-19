const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer');

// Route to get all customers
router.get('/', async (req, res) => {
    try {
        await customerController.getAll(req, res);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Internal server error while fetching customers' });
    }
});

// Route to get a single customer by ID
router.get('/:id', async (req, res) => {
    try {
        await customerController.getSingle(req, res);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ message: 'Internal server error while fetching the customer' });
    }
});

// Route to create a new customer
router.post('/', async (req, res) => {
    try {
        await customerController.createCustomer(req, res);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Internal server error while creating the customer' });
    }
});

// Route to update a customer by ID
router.put('/:id', async (req, res) => {
    try {
        await customerController.updateCustomer(req, res);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Internal server error while updating the customer' });
    }
});

// Route to delete a customer by ID
router.delete('/:id', async (req, res) => {
    try {
        await customerController.deleteCustomer(req, res);
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Internal server error while deleting the customer' });
    }
});

module.exports = router;
