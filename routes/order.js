const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

// Route to get all orders
router.get('/', async (req, res) => {
    try {
        await orderController.getAll(req, res);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error while fetching orders' });
    }
});

// Route to get a single order by ID
router.get('/:id', async (req, res) => {
    try {
        await orderController.getSingle(req, res);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error while fetching the order' });
    }
});

// Route to create a new order
router.post('/', async (req, res) => {
    try {
        await orderController.createOrder(req, res);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error while creating the order' });
    }
});

// Route to update an existing order by ID
router.put('/:id', async (req, res) => {
    try {
        await orderController.updateOrder(req, res);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal server error while updating the order' });
    }
});

// Route to delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        await orderController.deleteOrder(req, res);
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal server error while deleting the order' });
    }
});

module.exports = router;
