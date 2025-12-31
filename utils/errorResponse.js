const logger = require("../logger");
const errorResponse = (res, statusCode, message, error) => {
  logger.error(message)
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
