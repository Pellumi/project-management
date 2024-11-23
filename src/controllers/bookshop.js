const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const AppError = require("../utils/AppError");

const prisma = new PrismaClient();

const getBooks = asyncHandler(async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

const getPurchases = asyncHandler(async (req, res) => {
  const purchases = await prisma.bookPurchase.findMany({
    include: { book: true },
  });
  res.json(purchases);
});

const addBook = asyncHandler(async (req, res) => {
  const { title, author, isbn, price, quantity } = req.body;

  const bookWithInventory = await prisma.$transaction(async (tx) => {
    const book = await tx.book.create({
      data: { title, author, isbn, price, quantity },
    });

    const item = await tx.inventory.create({
      data: {
        name: book.id,
        quantity,
        unitPrice: price,
        businessUnit: "Bookshop",
        minStock: 10,
      },
    });

    return { book, item };
  });

  res.status(201).json(bookWithInventory.book);
});

const processPurchase = asyncHandler(async (req, res) => {
  const { bookId, quantity, customerId } = req.body;

  const purchase = await prisma.$transaction(async (tx) => {
    const book = await tx.book.update({
      where: { id: bookId },
      data: { quantity: { decrement: quantity } },
    });

    const inventory = await tx.inventory.findFirst({
      where: {
        name: book.id, 
        businessUnit: "Bookshop",
      },
    });

    if (!inventory) {
      throw new AppError("Inventory item not found", 404);
    }

    await tx.inventory.update({
      where: { id: inventory.id },
      data: { quantity: { decrement: quantity } },
    });

    const sale = await tx.sale.create({
      data: {
        productId: bookId, 
        quantity,
        totalAmount: book.price * quantity,
        businessUnit: "Bookshop",
      },
    });

    return tx.bookPurchase.create({
      data: {
        bookId,
        quantity,
        customerId,
        totalAmount: book.price * quantity,
      },
    });
  });

  res.status(201).json(purchase);
});

const processReturn = asyncHandler(async (req, res) => {
  const { purchaseId, reason } = req.body;

  const bookReturn = await prisma.$transaction(async (tx) => {
    const purchase = await tx.bookPurchase.findUnique({
      where: { id: purchaseId },
    });

    if (!purchase) {
      throw new AppError("Purchase not found", 404);
    }

    const book = await tx.book.update({
      where: { id: purchase.bookId },
      data: { quantity: { increment: purchase.quantity } },
    });

    await tx.book.update({
      where: { id: purchase.bookId },
      data: { quantity: { increment: purchase.quantity } },
    });

    return tx.bookReturn.create({
      data: {
        purchaseId,
        reason,
        status: "APPROVED",
      },
    });
  });

  res.status(201).json(bookReturn);
});

module.exports = {
  getBooks,
  getPurchases,
  addBook,
  processPurchase,
  processReturn,
};
