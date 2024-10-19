const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Supplier Management API',
    description: 'Final CSE341 Project for group 9'
  },
  host: 'https://cse341-final-project-6c89.onrender.com',
  //host: '',
  schemes: ['https','http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];



// recreate tge swagger.json file when you make changes
// node ./swagger.js 

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// dont forget to install 
// npm install swagger-ui-express
// npm install swagger-autogen
