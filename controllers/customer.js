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
    const user = {
        clientCode: req.body.clientCode,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        streetAdd: req.body.streetAdd,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country
    };
    const response = await mongodb.getDatabase().db().collection('customer').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while adding the user');
    };
};

const updateCustomer = async (reg, res) => {
    //#swagger.tags=['Customers']
    const userId = new ObjectId(reg.params.id);
    const user = {
        // update when we have the format
        clientCode: req.body.clientCode,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        streetAdd: req.body.streetAdd,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country
    };
    const response = await mongodb.getDatabase().db().collection('customer').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user');
    };
};

const deleteCustomer = async (reg, res) => {
    //#swagger.tags=['Customers']
    const userId = new ObjectId(reg.params.id);
    const response = await mongodb.getDatabase().db().collection('customer').deleteOne({_id: userId});
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