class AppError extends Error {
  constructor(message, statusCode, name) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.name = name || "AppError";
  }

  static BadRequest(message) {
    return new AppError(message, 400, "ValidationError");
  }

  static Unauthenticated(message = "Authentication failed") {
    return new AppError(message, 401, "AuthenticationError");
  }

  static Unauthorized(message = "Not authorized to access this resource") {
    return new AppError(message, 403, "AuthorizationError");
  }

  static NotFound(resource) {
    return new AppError(`${resource} not found`, 404, "NotFoundError");
  }
}

module.exports = AppError;
