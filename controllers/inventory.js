const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['inventory']
    try {
        const result = await mongodb.getDatabase().db().collection('inv').find();
        const items = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ message: 'Internal server error while fetching inventory' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['inventory']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('inv').find({ _id: userId });
        const items = await result.toArray();
        if (items.length === 0) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items[0]);
    } catch (error) {
        console.error('Error fetching inventory item:', error);
        res.status(500).json({ message: 'Internal server error while fetching the inventory item' });
    }
};

const createInventory = async (req, res) => {
    //#swagger.tags=['inventory']
    const user = {
        inv_name: req.body.inv_name,
        inv_quantity: req.body.inv_quantity,
        inv_price: req.body.inv_price,
        inv_description: req.body.inv_description
    };

    try {
        const response = await mongodb.getDatabase().db().collection('inv').insertOne(user);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Inventory item created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Some error occurred while adding the inventory item' });
        }
    } catch (error) {
        console.error('Error creating inventory item:', error);
        res.status(500).json({ message: 'Internal server error while creating the inventory item' });
    }
};

const updateInventory = async (req, res) => {
    //#swagger.tags=['inventory']
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            inv_name: req.body.inv_name,
            inv_quantity: req.body.inv_quantity,
            inv_price: req.body.inv_price,
            inv_description: req.body.inv_description
        };
        const response = await mongodb.getDatabase().db().collection('inv').replaceOne({ _id: userId }, user);
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

const deleteInventory = async (req, res) => {
    //#swagger.tags=['inventory']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('inv').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Inventory item not found' });
        }
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        res.status(500).json({ message: 'Internal server error while deleting the inventory item' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createInventory,
    updateInventory,
    deleteInventory
};
