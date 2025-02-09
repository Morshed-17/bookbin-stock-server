const express = require("express");
const router = require("./app/routes");
const globalErrorHandler = require("./app/middlewares/globalErrorhandler");
const catchAsync = require("./app/utils/catchAsync");
const AppError = require("./app/error/AppError");

const app = express();

require("dotenv").config();

app.get(
  "/",
  catchAsync(async (req, res) => {
    throw new AppError(500, "User is not valid");
  })
);

app.use("/api", router);

app.use(globalErrorHandler);

module.exports = app;
