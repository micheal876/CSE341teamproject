const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Orders']
    try {
        const result = await mongodb.getDatabase().db().collection('order').find();
        const items = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching Order:', error);
        res.status(500).json({ message: 'Internal server error while fetching orders' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Orders']
    try {
        const orderId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('order').find({ _id: orderId });
        const items = await result.toArray();
        if (items.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items[0]);
    } catch (error) {
        console.error('Error fetching Orders: ', error);
        res.status(500).json({ message: 'Internal server error while fetching the Order' });
    }
};

const createOrder = async (req, res) => {
    //#swagger.tags=['Orders']
    const order = {
        // Need to update with fields from order table
        inv_name: req.body.inv_name,
        inv_quantity: req.body.inv_quantity,
        inv_price: req.body.inv_price,
        inv_description: req.body.inv_description
    };

    try {
        const response = await mongodb.getDatabase().db().collection('order').insertOne(order);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Order entry created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Some error occurred while adding the order ' });
        }
    } catch (error) {
        console.error('Error creating inventory order:', error);
        res.status(500).json({ message: 'Internal server error while creating the order' });
    }
};

const updateOrder = async (req, res) => {
    //#swagger.tags=['Orders']
    try {
        const orderId = new ObjectId(req.params.id);
        const order = {
            // Need to update with fields from order table
            inv_name: req.body.inv_name,
            inv_quantity: req.body.inv_quantity,
            inv_price: req.body.inv_price,
            inv_description: req.body.inv_description
        };
        const response = await mongodb.getDatabase().db().collection('order').replaceOne({ _id: orderId }, order);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Inventory item not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating inventory item:', error);
        res.status(500).json({ message: 'Internal server error while updating the inventory item' });
    }
};

const deleteOrder = async (req, res) => {
    //#swagger.tags=['Orders']
    try {
        const orderId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('order').deleteOne({ _id: orderId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal server error while deleting the Order' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createOrder,
    updateOrder,
    deleteOrder
};
