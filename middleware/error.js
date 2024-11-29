const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  // Ensure the error has a statusCode and message
  let error = { ...err, message: err.message };

  // Log the full error stack (useful during development)
  console.error(err.stack);

  // Customize known errors
  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found: ${err.value}`, 404);
  }
  if (err.code === 11000) {
    error = new ErrorResponse("Duplicate field value entered", 400);
  }
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(messages.join(", "), 400);
  }

  // Send response
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
