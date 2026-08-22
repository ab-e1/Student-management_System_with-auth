const express = require("express");
const userRoutes = require("./route/userRoutes.js");
const studentRoutes = require("./route/studentRoutes.js");
const authRoute = require("./route/authRoute.js");
const logger = require("./middleware/logger.js");
const errorHandeler = require("./middleware/errorHandeler.js");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());

app.use(logger);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "student manegment system with jwt auth",
      version: "1.0.0",
      description: "",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "jwt",
        },
      },
      schemas: {
        student: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string" },
            age: { type: "integer" },
            course: { type: "string" },
            gpa: { type: "integer" },
            status: { type: "string", enum: ["active", "inactive"] },
          },
        },
        user: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["admin", "user"] },
          },
        },
        registerInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },

        loginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },

        TokenResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean" },
            data: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                email: { type: "string" },
                role: { type: "string" },
              },
            },
            token: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./route/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoute);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandeler);

module.exports = app;
