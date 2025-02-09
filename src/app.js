const express = require("express");
const router = require("./app/routes");
const globalErrorHandler = require("./app/middlewares/globalErrorhandler");
const app = express();

require("dotenv").config();

app.get("/", (req, res) => {
  // for testing
  res.send("Hello World!");
});

app.use("/api", router);

app.use(globalErrorHandler)

module.exports = app;
