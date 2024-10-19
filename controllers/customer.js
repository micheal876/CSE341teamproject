const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Customers']
    try {
        const result = await mongodb.getDatabase().db().collection('customer').find(); 
        const users = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Internal server error while fetching customers' });
    }
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    //#swagger.tags=['Customers']
    try {
        const result = await mongodb.getDatabase().db().collection('customer').find({_id: userId}); 
        const users = await result.toArray();
        if (users.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ message: 'Internal server error while fetching the customer' });
    }
};

const createCustomer = async (req, res) => { 
    //#swagger.tags=['Customers']
    const { customer_name, customer_phone, customer_address, customer_notes } = req.body;

    // Check for required fields
    if (!customer_name || !customer_phone || !customer_address) {
        return res.status(400).json({ error: 'customer_name, customer_phone, and customer_address are required' });
    }

    const customer = {
        customer_name,
        customer_phone,
        customer_address,
        customer_notes
    };

    try {
        const response = await mongodb.getDatabase().db().collection('customer').insertOne(customer);
        if (response.acknowledged) {
            return res.status(201).json({ message: 'Customer successfully added', customer });
        } else {
            return res.status(500).json({ message: response.error || 'Some error occurred while adding the Customer' });
        }
    } catch (error) {
        console.error('Error creating customer:', error);
        return res.status(500).json({ message: 'Internal server error while creating the customer' });
    }
};

const updateCustomer = async (req, res) => { 
    //#swagger.tags=['Customers']
    const customerId = new ObjectId(req.params.id);
    const { customer_name, customer_phone, customer_address, customer_notes } = req.body;

    // Check for required fields
    if (!customer_name || !customer_phone || !customer_address) {
        return res.status(400).json({ error: 'customer_name, customer_phone, and customer_address are required' });
    }

    const customer = {
        customer_name,
        customer_phone,
        customer_address,
        customer_notes
    };

    try {
        const response = await mongodb.getDatabase().db().collection('customer').replaceOne({_id: customerId}, customer);
        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: 'Customer successfully updated' });
        } else {
            return res.status(404).json({ message: 'Customer not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating customer:', error);
        return res.status(500).json({ message: 'Internal server error while updating the customer' });
    }
};

const deleteCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    const customerId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('customer').deleteOne({_id: customerId});
        if (response.deletedCount > 0) {
            return res.status(204).send(); // No Content
        } else {
            return res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error('Error deleting customer:', error);
        return res.status(500).json({ message: 'Internal server error while deleting the customer' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createCustomer,
    updateCustomer,
    deleteCustomer
};
