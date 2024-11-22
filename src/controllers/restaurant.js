const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getReservations = asyncHandler(async (req, res) => {
  const reservations = await prisma.reservation.findMany();
  res.json(reservations);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await prisma.restaurantOrder.findMany({
    include: { items: true },
  });
  res.json(orders);
});

const makeReservation = asyncHandler(async (req, res) => {
  const { customerName, date, time, tableNumber, guestCount } = req.body;
  const reservation = await prisma.reservation.create({
    data: { customerName, date, time, tableNumber, guestCount },
  });
  res.status(201).json(reservation);
});

const createOrder = asyncHandler(async (req, res) => {
  const { tableNumber, items, totalAmount } = req.body;
  const order = await prisma.restaurantOrder.create({
    data: {
      tableNumber,
      items: { create: items },
      totalAmount,
      status: "PENDING",
    },
  });
  res.status(201).json(order);
});

const processBill = asyncHandler(async (req, res) => {
  const { orderId, paymentMethod } = req.body;
  const bill = await prisma.restaurantBill.create({
    data: {
      orderId,
      paymentMethod,
      status: "PAID",
    },
  });
  res.status(201).json(bill);
});

module.exports = {
  getReservations,
  getOrders,
  makeReservation,
  createOrder,
  processBill,
};
