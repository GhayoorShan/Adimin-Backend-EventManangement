/**
 * Helper function to create standardized API responses.
 * @param {number} success - 1 for success, 0 for failure.
 * @param {string} message - A detailed message about the operation.
 * @param {Object|null} data - Additional data related to the operation (default is null).
 * @param {string|null} error - Error message or details if the operation fails (default is null).
 * @returns {Object} - Standardized response object.
 */
const createResponse = (success, message, data = null, error = null) => ({
  success,
  message,
  data,
  error,
});

export default createResponse;
