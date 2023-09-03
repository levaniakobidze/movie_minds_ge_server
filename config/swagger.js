const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation for your Node.js application",
    },
  },
  apis: ["./routes/*.js"], // Specify the path to your API route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
