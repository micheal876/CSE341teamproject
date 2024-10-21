const express = require('express');
const passport = require('passport'); 
const router = express.Router();

router.use('/', require('./swagger'));

//route to the page 
router.use('/customer', require('./customer'));
router.use('/order', require('./order'));
router.use('/inventory', require('./inventory'));
router.use('/supplier', require('./supplier'));
router.get('/', (req, res) => {
    res.send('Home Page: Final CSE341 Project for group 9');
  });

module.exports = router;
