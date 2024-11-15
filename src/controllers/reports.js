const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const generateDailyReport = asyncHandler(async (req, res) => {
  const { businessUnit } = req.query;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [sales, inventory, feedback] = await Promise.all([
    prisma.sale.findMany({
      where: {
        businessUnit,
        createdAt: { gte: today },
      },
    }),
    prisma.inventory.findMany({
      where: { businessUnit },
    }),
    prisma.feedback.findMany({
      where: {
        businessUnit,
        createdAt: { gte: today },
      },
    }),
  ]);

  const totalSales = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const lowStockItems = inventory.filter(
    (item) => item.quantity <= item.minStock,
  );

  res.json({
    businessUnit,
    date: today,
    totalSales,
    salesCount: sales.length,
    lowStockItems,
    feedbackCount: feedback.length,
  });
});

module.exports = { generateDailyReport };
