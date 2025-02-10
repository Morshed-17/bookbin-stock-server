import config from "../config/index.js";

const globalErrorHandler = (err, req, res, next) => {
  let message = "Internal server error";
  console.log(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || message,
    stack: config.node_env === "development" ? err.stack : null,
  });
};

export default globalErrorHandler;
