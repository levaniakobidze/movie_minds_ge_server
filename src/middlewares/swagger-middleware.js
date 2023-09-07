import SwaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const swaggerMiddleware = () => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "MovieMinds API",
        version: "1.0.0",
        description: "API documentation for MovieMinds",
      },
    },
    apis: ["../routes/*.js"],
  };

  const swaggerDocument = YAML.load("./src/config/swagger.yaml");
  return [SwaggerUI.serve, SwaggerUI.setup(swaggerDocument, options)];
};

export default swaggerMiddleware;
