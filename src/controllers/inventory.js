const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addItem = asyncHandler(async (req, res) => {
  const { name, quantity, unitPrice, businessUnit, minStock } = req.body;
  const item = await prisma.inventory.create({
    data: { name, quantity, unitPrice, businessUnit, minStock },
  });
  res.status(201).json(item);
});

const getItems = asyncHandler(async (req, res) => {
  const { businessUnit } = req.query;
  const items = await prisma.inventory.findMany({
    where: businessUnit ? { businessUnit } : undefined,
  });
  res.json(items);
});

const updateStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const item = await prisma.inventory.update({
    where: { id },
    data: { quantity },
  });

  if (item.quantity <= item.minStock) {
    // TODO: Implement notification service
    console.log(`Low stock alert for ${item.name}`);
  }

  res.json(item);
});

const getInventorySummary = asyncHandler(async (req, res) => {
  const inventory = await prisma.inventory.findMany();

  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(
    (item) => item.quantity <= item.minStock,
  ).length;
  const outOfStockItems = inventory.filter(
    (item) => item.quantity === 0,
  ).length;

  const inventoryData = {
    totalItems,
    lowStockItems,
    outOfStockItems,
  };

  res.json(inventoryData);
});

module.exports = { addItem, getItems, updateStock, getInventorySummary };
