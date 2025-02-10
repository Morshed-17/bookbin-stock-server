const notFound = (req, res) => {
  let message = "Route not found";

  res.status(500).json({
    success: false,
    message: message,
  });
};

export default notFound;
