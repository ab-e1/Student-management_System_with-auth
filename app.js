const express = require("express");
const userRoutes = require("./route/userRoutes.js");
const studentRoutes = require("./route/studentRoutes.js");
const authRoute = require("./route/authRoute.js");
const logger = require("./middleware/logger.js");
const errorHandeler = require("./middleware/errorHandeler.js");

const app = express();
app.use(express.json());

app.use(logger);

app.use("/api/auth", authRoute);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandeler);

module.exports = app;
