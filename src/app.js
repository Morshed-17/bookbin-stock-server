import express from "express";
import dotenv from "dotenv";
import catchAsync from "./app/utils/catchAsync.js";
import sendResponse from "./app/utils/sendResponse.js";
import router from "./app/routes/index.js";
import globalErrorHandler from "./app/middlewares/globalErrorhandler.js";
import notFound from "./app/middlewares/notFound.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.get(
  "/",
  catchAsync(async (req, res) => {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Wellcome to bookbin api",
      data: null,
    });
  })
);

app.use("/api", router);

// global error handler
app.use(globalErrorHandler);

// Not found route
app.use(notFound);

export default app;
