const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const recordProduction = asyncHandler(async (req, res) => {
  const { batchNumber, quantity, productionDate } = req.body;
  const production = await prisma.waterProduction.create({
    data: {
      batchNumber,
      quantity,
      productionDate,
      status: "COMPLETED",
    },
  });
  res.status(201).json(production);
});

const createDistributionOrder = asyncHandler(async (req, res) => {
  const { destination, quantity, deliveryDate } = req.body;
  const distribution = await prisma.waterDistribution.create({
    data: {
      destination,
      quantity,
      deliveryDate,
      status: "PENDING",
    },
  });
  res.status(201).json(distribution);
});

const updateDistributionStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const distribution = await prisma.waterDistribution.update({
    where: { id },
    data: { status },
  });
  res.status(200).json(distribution);
});

module.exports = {
  recordProduction,
  createDistributionOrder,
  updateDistributionStatus,
};
