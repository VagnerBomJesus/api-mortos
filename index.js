// to allow the use of .env file variables
require("dotenv").config();

// import web framework package
const express = require("express");

// import mongoose connection
const mongoose = require("./database/index");

// import routes
let routes = require("./routes");

// import cors cross origin
// const cors = require("cors");

// create an instance of express app
const app = express();

// middleware
//app.use(cors()); // allow cors (interaction between frontend and backend) (different ports)
app.use(express.json()); // allow access to req.body
app.use(express.urlencoded({ extended: false })); // if false the values can be a string or array


// swagger
const swaggerJSDoc = require('swagger-jsdoc'); // to integrate Swagger using JSDoc comments in the code
const swaggerUi = require('swagger-ui-express'); // to serve auto-generated swagger-ui generated API docs from express
// use v5 because it's before ecmascript modules (import "")
const swaggerDefinition = {
  openapi: '3.0.0',
  
  info: {
    title: "API REST  Mortos Portugal",
    version: "1.0.0",
    description: " API com informação de mortes do ano 2021",
    license: {
      name: "Vagner Bom Jesus",
      url: "https://github.com/VagnerBomJesus/api-mortos/"
    }
    
  },
  servers: [
    {
      url: 'http://localhost:3030 ',
      description: ' Development server'
    },
    {
      url: 'https://api-morto.azurewebsites.net/',
      description: 'Production sever Cloud Azure'
    }
  ],
  host: "",
  basePath: "/",
  tags: [
    {
      "name": "User Requests",
      "description": "Pedidos Disponíveis",
      "externalDocs": {
        "description": "Operações sobre o User",
        "url": ""
      }
    },
    {
      "name": "Mortos Requests",
      "description": "Pedidos Disponíveis",
      "externalDocs": {
        "description": "Operações sobre o Mortos",
        "url": ""
      }
    },
  ]
};

const options = {
  swaggerDefinition,
  // paths to files containing OpenAPI definitions such as the annotations above
  apis: ['./swagger/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// routes
// mount routes
//Rotas para acessar as operações
require('./routes/index')(app);

// storing the value of the environment variable PORT in port
const port = process.env.PORT || 3030;

// tell the express app to listen on a specific port
app.listen(port, () => {
  console.log(' Server is up and listening on port ' + port);
});
