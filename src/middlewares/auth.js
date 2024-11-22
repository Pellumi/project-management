const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const { verifyToken } = require("../utils/jwt");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw AppError.Unauthenticated("No token provided");
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
    throw AppError.Unauthenticated("Invalid token");
  }
});

const authorize =
  (...roles) =>
  (req, res, next) => {
    // console.log("Allowed roles:", roles);
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw AppError.Unauthorized();
    }
    next();
  };

module.exports = { protect, authorize };
