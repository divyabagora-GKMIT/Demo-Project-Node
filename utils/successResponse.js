const successResponse = (res, statusCode, message, data = {}, pagination = {}) => {
  res.status(statusCode).json({
    statusCode,
    message,
    data,
    // limit : pagination.limit,
    // count: pagination.count,
    // remaining : pagination.remaining.pages
  });
};

module.exports = {
  successResponse,
};
