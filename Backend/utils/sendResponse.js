/**
 * Standardize API Response Format
 */
const sendResponse = (res, { statusCode = 200, success = true, message = '', data = null, errors = null }) => {
  return res.status(statusCode).json({
    success,
    message,
    ...(data && { data }),
    ...(errors && { errors }),
  });
};

module.exports = sendResponse;