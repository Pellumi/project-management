const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addBook = asyncHandler(async (req, res) => {
  const { title, author, isbn, price, quantity } = req.body;
  const book = await prisma.book.create({
    data: { title, author, isbn, price, quantity },
  });
  res.status(201).json(book);
});

const processPurchase = asyncHandler(async (req, res) => {
  const { bookId, quantity, customerId } = req.body;

  const purchase = await prisma.$transaction(async (tx) => {
    const book = await tx.book.update({
      where: { id: bookId },
      data: { quantity: { decrement: quantity } },
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

module.exports = { addBook, processPurchase, processReturn };
