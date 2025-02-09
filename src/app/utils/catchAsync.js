function catchAsync(fn) {
  return async function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log(error);
      next(error);
    });
  };
}

module.exports =catchAsync