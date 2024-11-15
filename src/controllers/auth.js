const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const AppError = require("../utils/AppError");
const { generateToken } = require("../utils/jwt");

const prisma = new PrismaClient();

const register = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    throw AppError.BadRequest("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role },
  });

  res.status(201).json({
    id: user.id,
    email: user.email,
    role: user.role,
    token: generateToken(user.id, user.role),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw AppError.Unauthenticated("Invalid Credentials");
  }

  res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    token: generateToken(user.id, user.role),
  });
});

module.exports = { register, login };
