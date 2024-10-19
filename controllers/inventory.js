const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (reg, res) => {
    //#swagger.tags=['inventory']
    const result = await mongodb.getDatabase().db().collection('inv').find(); 
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (reg, res) => {
    const userId = new ObjectId(reg.params.id);
    //#swagger.tags=['inventory']
    const result = await mongodb.getDatabase().db().collection('inv').find({_id: userId}); 
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createInventory = async (reg, res) => {
    //#swagger.tags=['inventory']
    const user = {
        inv_name: reg.body.inv_name,
        inv_quantity: reg.body.inv_quantity,
        inv_price: reg.body.inv_price,
        inv_description: reg.body.inv_description
    };
    const response = await mongodb.getDatabase().db().collection('inv').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while adding the user');
    };
};

const updateInventory = async (reg, res) => {
    //#swagger.tags=['inventory']
    const userId = new ObjectId(reg.params.id);
    const user = {
        inv_name: reg.body.inv_name,
        inv_quantity: reg.body.inv_quantity,
        inv_price: reg.body.inv_price,
        inv_description: reg.body.inv_description
    };
    const response = await mongodb.getDatabase().db().collection('inv').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user');
    };
};

const deleteInventory = async (reg, res) => {
    //#swagger.tags=['inventory']
    const userId = new ObjectId(reg.params.id);
    const response = await mongodb.getDatabase().db().collection('inv').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user');
    };
};


module.exports = {
    getAll,
    getSingle,
    createInventory,
    updateInventory,
    deleteInventory
};