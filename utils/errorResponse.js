const errorResponse = (res, statusCode, message, error) => {
  res.status(statusCode).json({
    statusCode,
    message,
    error,
  });
};

const customError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = {
  customError,
  errorResponse,
};
