const express = require("express");
const router = require("./app/routes");
const globalErrorHandler = require("./app/middlewares/globalErrorhandler");
const catchAsync = require("./app/utils/catchAsync");
const AppError = require("./app/error/AppError");
const sendResponse = require("./app/utils/sendResponse");

const app = express();

require("dotenv").config();

app.get(
  "/",
  catchAsync(async (req, res) => {

    

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Data feteched successfully",
      data: [],
    });
  })
);

app.use("/api", router);

app.use(globalErrorHandler);

module.exports = app;
