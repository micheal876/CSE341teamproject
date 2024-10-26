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

// can use this to log into get hub
router.get('/login', passport.authenticate('github'), (req, res) => {});

// use this to clear our session and remove access  
router.get('/logout', function(req, res, next) {
  req.logout(function(err){
    if (err) { 
      return next(err);
    }
    // Clear the session user data to ensure the user is logged out
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
});


module.exports = router;
