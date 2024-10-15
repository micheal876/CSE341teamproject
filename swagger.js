const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341teamproject',
    description: 'Final CSE341 Project for group 9'
  },
  host: 'localhost:3000',
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