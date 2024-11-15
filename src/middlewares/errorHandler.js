const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {
  // Log error for debugging
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Prisma error handling
  if (err.code === "P2002") {
    return res.status(400).json({
      status: "fail",
      message: "Duplicate entry",
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      status: "fail",
      message: "Record not found",
    });
  }

  // Default error
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });

  return next();
};
