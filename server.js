const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

const customerController = require('./controllers/customer');

app.use(bodyParser.json());

// This is for Swagger to help out routes will work across site - Need to make sure we can pass headers back and forth GET, POST, PUT, DELETE 
// so we dont get cross site scripting errors
app.use((reg, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
  next();
});


app.use('/', require('./routes'));


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
