const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Suppliers']
    try {
        const result = await mongodb.getDatabase().db().collection('supplier').find();
        const items = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ message: 'Internal server error while fetching suppliers' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Suppliers']
    try {
        const supplierId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('supplier').find({ _id: supplierId });
        const items = await result.toArray();
        if (items.length === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items[0]);
    } catch (error) {
        console.error('Error fetching supplier: ', error);
        res.status(500).json({ message: 'Internal server error while fetching the supplier' });
    }
};

const createSupplier = async (req, res) => {
    //#swagger.tags=['Suppliers']
    const supplier = {
        // Need to update with fields from supplier table
        inv_name: req.body.inv_name,
        inv_quantity: req.body.inv_quantity,
        inv_price: req.body.inv_price,
        inv_description: req.body.inv_description
    };

    try {
        const response = await mongodb.getDatabase().db().collection('supplier').insertOne(supplier);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Supplier entry created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Some error occurred while adding the supplier ' });
        }
    } catch (error) {
        console.error('Error creating inventory supplier:', error);
        res.status(500).json({ message: 'Internal server error while creating the supplier' });
    }
};

const updateSupplier = async (req, res) => {
    //#swagger.tags=['Suppliers']
    try {
        const supplierId = new ObjectId(req.params.id);
        const supplier = {
            // Need to update with fields from supplier table
            inv_name: req.body.inv_name,
            inv_quantity: req.body.inv_quantity,
            inv_price: req.body.inv_price,
            inv_description: req.body.inv_description
        };
        const response = await mongodb.getDatabase().db().collection('supplier').replaceOne({ _id: supplierId }, supplier);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Supplier not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating supplier', error);
        res.status(500).json({ message: 'Internal server error while updating the supplier' });
    }
};

const deleteSupplier = async (req, res) => {
    //#swagger.tags=['Suppliers']
    try {
        const supplierId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('supplier').deleteOne({ _id: supplierId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    } catch (error) {
        console.error('Error deleting supplier:', error);
        res.status(500).json({ message: 'Internal server error while deleting the supplier' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createSupplier,
    updateSupplier,
    deleteSupplier
};
