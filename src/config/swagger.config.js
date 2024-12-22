import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Power Outage API",
      version: "1.0.0",
      description: "API para gestionar interrupciones de energía eléctrica",
    },
    servers: [
      {
        url: "http://localhost:8080/api/v1",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
