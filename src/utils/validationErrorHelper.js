import createResponse from "./responseHelper.js";

const handleValidationError = (error) => {
  // Check if 'inner' exists and is an array
  if (error.inner && Array.isArray(error.inner)) {
    const formattedErrors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    return createResponse(0, null, null, formattedErrors);
  }

  // If no validation errors exist, return a generic error message
  return createResponse(0, "Validation failed", null, [
    { field: "unknown", message: "An unexpected validation error occurred" },
  ]);
};

export default handleValidationError;
