const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hackachat API",
      version: "1.0.0",
      description: "Documentation de l'API Hackachat (Users, Posts, Comments, Auth, Tokens)",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [`${__dirname}/../routes/*.js`]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;