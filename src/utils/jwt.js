const jwt = require("jsonwebtoken");
require('dotenv').config();

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

const generateToken = (userId, role) =>
  jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = { generateToken, verifyToken };
