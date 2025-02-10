import express from "express"
import dotenv from "dotenv"
import catchAsync from "./app/utils/catchAsync.js";
import sendResponse from "./app/utils/sendResponse.js";
import router from "./app/routes/index.js";
import globalErrorHandler from "./app/middlewares/globalErrorhandler.js";
import notFound from "./app/middlewares/notFound.js";

const app = express();

dotenv.config()

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

// global error handler
app.use(globalErrorHandler);

// Not found route
app.use(notFound)

export default app;
