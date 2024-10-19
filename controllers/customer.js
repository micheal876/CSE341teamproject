const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (reg, res) => {
    //#swagger.tags=['Customers']
    const result = await mongodb.getDatabase().db().collection('customer').find(); 
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (reg, res) => {
    const userId = new ObjectId(reg.params.id);
    //#swagger.tags=['Customers']
    const result = await mongodb.getDatabase().db().collection('customer').find({_id: userId}); 
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createCustomer = async (reg, res) => {
    //#swagger.tags=['Customers']
    const customer = {
        customer_name: req.body.customer_name,
        customer_phone: req.body.customer_phone,
        customer_address: req.body.customer_address,
        customer_notes: req.body.customer_notes
    };
    const response = await mongodb.getDatabase().db().collection('customer').insertOne(customer);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while adding the Customer');
    };
};

const updateCustomer = async (reg, res) => {
    //#swagger.tags=['Customers']
    const customerId = new ObjectId(reg.params.id);
    const customer = {
        customer_name: req.body.customer_name,
        customer_phone: req.body.customer_phone,
        customer_address: req.body.customer_address,
        customer_notes: req.body.customer_notes
    };
    const response = await mongodb.getDatabase().db().collection('customer').replaceOne({_id: customerId}, customer);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user');
    };
};

const deleteCustomer = async (reg, res) => {
    //#swagger.tags=['Customers']
    const customerId = new ObjectId(reg.params.id);
    const response = await mongodb.getDatabase().db().collection('customer').remove({_id: customerId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user');
    };
};


module.exports = {
    getAll,
    getSingle,
    createCustomer,
    updateCustomer,
    deleteCustomer
};