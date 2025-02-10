import config from "../config/index.js";

const globalErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
    stack: config.node_env === "development" ? err.stack : null,
  });
};

export default globalErrorHandler;
