const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const recordSale = asyncHandler(async (req, res) => {
  const { productId, quantity, totalAmount, businessUnit } = req.body;

  const sale = await prisma.sale.create({
    data: { productId, quantity, totalAmount, businessUnit },
  });

  await prisma.inventory.update({
    where: { id: productId },
    data: {
      quantity: { decrement: quantity },
    },
  });

  res.status(201).json(sale);
});

const getDailySales = asyncHandler(async (req, res) => {
  const { businessUnit } = req.query;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sales = await prisma.sale.findMany({
    where: {
      businessUnit,
      createdAt: {
        gte: today,
      },
    },
  });

  res.json(sales);
});

module.exports = { recordSale, getDailySales };
