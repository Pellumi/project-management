const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const submitFeedback = asyncHandler(async (req, res) => {
  const { message, businessUnit } = req.body;
  const { userId } = req.user;

  const feedback = await prisma.feedback.create({
    data: { userId, message, businessUnit },
  });

  res.status(201).json(feedback);
});

const getFeedback = asyncHandler(async (req, res) => {
  const { businessUnit } = req.query;
  const feedback = await prisma.feedback.findMany({
    where: businessUnit ? { businessUnit } : undefined,
    orderBy: { createdAt: "desc" },
  });

  res.json(feedback);
});

module.exports = { submitFeedback, getFeedback };
