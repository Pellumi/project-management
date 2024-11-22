const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.inventory.createMany({
    data: [
      {
        name: "Water Bottle",
        quantity: 100,
        unitPrice: 1.5,
        businessUnit: "Beverages",
        minStock: 20,
      },
      {
        name: "Juice",
        quantity: 200,
        unitPrice: 2.5,
        businessUnit: "Beverages",
        minStock: 30,
      },
      {
        name: "Soda",
        quantity: 150,
        unitPrice: 1.8,
        businessUnit: "Beverages",
        minStock: 25,
      },
      {
        name: "Apple",
        quantity: 50,
        unitPrice: 3.0,
        businessUnit: "Fruits",
        minStock: 10,
      },
      {
        name: "Orange",
        quantity: 60,
        unitPrice: 2.8,
        businessUnit: "Fruits",
        minStock: 15,
      },
      {
        name: "Banana",
        quantity: 120,
        unitPrice: 1.0,
        businessUnit: "Fruits",
        minStock: 20,
      },
      {
        name: "Milk",
        quantity: 100,
        unitPrice: 1.2,
        businessUnit: "Dairy",
        minStock: 10,
      },
      {
        name: "Cheese",
        quantity: 80,
        unitPrice: 4.0,
        businessUnit: "Dairy",
        minStock: 15,
      },
      {
        name: "Bread",
        quantity: 200,
        unitPrice: 1.0,
        businessUnit: "Bakery",
        minStock: 30,
      },
      {
        name: "Butter",
        quantity: 150,
        unitPrice: 3.5,
        businessUnit: "Dairy",
        minStock: 25,
      },
      {
        name: "Chicken",
        quantity: 80,
        unitPrice: 5.5,
        businessUnit: "Meat",
        minStock: 20,
      },
      {
        name: "Pork",
        quantity: 90,
        unitPrice: 6.0,
        businessUnit: "Meat",
        minStock: 25,
      },
      {
        name: "Beef",
        quantity: 70,
        unitPrice: 7.0,
        businessUnit: "Meat",
        minStock: 20,
      },
      {
        name: "Fish",
        quantity: 50,
        unitPrice: 4.5,
        businessUnit: "Seafood",
        minStock: 15,
      },
      {
        name: "Shrimp",
        quantity: 120,
        unitPrice: 8.0,
        businessUnit: "Seafood",
        minStock: 20,
      },
    ],
  });

  await prisma.sale.createMany({
    data: [
      {
        productId: "product1",
        quantity: 10,
        totalAmount: 15.0,
        businessUnit: "Beverages",
      },
      {
        productId: "product2",
        quantity: 5,
        totalAmount: 12.5,
        businessUnit: "Fruits",
      },
      {
        productId: "product3",
        quantity: 8,
        totalAmount: 14.4,
        businessUnit: "Dairy",
      },
      {
        productId: "product4",
        quantity: 20,
        totalAmount: 20.0,
        businessUnit: "Bakery",
      },
      {
        productId: "product5",
        quantity: 15,
        totalAmount: 22.5,
        businessUnit: "Meat",
      },
      {
        productId: "product6",
        quantity: 12,
        totalAmount: 18.0,
        businessUnit: "Seafood",
      },
      {
        productId: "product7",
        quantity: 25,
        totalAmount: 35.0,
        businessUnit: "Beverages",
      },
      {
        productId: "product8",
        quantity: 10,
        totalAmount: 28.0,
        businessUnit: "Fruits",
      },
      {
        productId: "product9",
        quantity: 18,
        totalAmount: 36.0,
        businessUnit: "Dairy",
      },
      {
        productId: "product10",
        quantity: 30,
        totalAmount: 45.0,
        businessUnit: "Bakery",
      },
      {
        productId: "product11",
        quantity: 22,
        totalAmount: 35.2,
        businessUnit: "Meat",
      },
      {
        productId: "product12",
        quantity: 17,
        totalAmount: 28.6,
        businessUnit: "Seafood",
      },
      {
        productId: "product13",
        quantity: 50,
        totalAmount: 75.0,
        businessUnit: "Beverages",
      },
      {
        productId: "product14",
        quantity: 30,
        totalAmount: 54.0,
        businessUnit: "Fruits",
      },
      {
        productId: "product15",
        quantity: 28,
        totalAmount: 56.0,
        businessUnit: "Dairy",
      },
    ],
  });

  await prisma.feedback.createMany({
    data: [
      {
        userId: "user1",
        message: "Great service!",
        businessUnit: "Customer Support",
      },
      {
        userId: "user2",
        message: "Product quality is awesome.",
        businessUnit: "Customer Support",
      },
      {
        userId: "user3",
        message: "Fast delivery.",
        businessUnit: "Customer Support",
      },
      {
        userId: "user4",
        message: "Very satisfied with my purchase.",
        businessUnit: "Customer Support",
      },
      {
        userId: "user5",
        message: "Excellent service!",
        businessUnit: "Customer Support",
      },
      {
        userId: "user6",
        message: "Great quality products.",
        businessUnit: "Customer Support",
      },
      {
        userId: "user7",
        message: "Good experience overall.",
        businessUnit: "Customer Support",
      },
      {
        userId: "user8",
        message: "Will definitely buy again.",
        businessUnit: "Customer Support",
      },
      {
        userId: "user9",
        message: "Highly recommend this service.",
        businessUnit: "Customer Support",
      },
      {
        userId: "user10",
        message: "Excellent packaging.",
        businessUnit: "Customer Support",
      },
      {
        userId: "user11",
        message: "Very happy with my order.",
        businessUnit: "Customer Support",
      },
      {
        userId: "user12",
        message: "Delivery was on time.",
        businessUnit: "Customer Support",
      },
      {
        userId: "user13",
        message: "Best online store.",
        businessUnit: "Customer Support",
      },
      {
        userId: "user14",
        message: "Satisfied with my order.",
        businessUnit: "Customer Support",
      },
      {
        userId: "user15",
        message: "Fast and reliable.",
        businessUnit: "Customer Support",
      },
    ],
  });

  await prisma.reservation.createMany({
    data: [
      {
        customerName: "John Doe",
        date: new Date(),
        time: "18:00",
        tableNumber: 1,
        guestCount: 2,
      },
      {
        customerName: "Jane Smith",
        date: new Date(),
        time: "19:00",
        tableNumber: 2,
        guestCount: 3,
      },
      {
        customerName: "Tom Brown",
        date: new Date(),
        time: "20:00",
        tableNumber: 3,
        guestCount: 4,
      },
      {
        customerName: "Alice White",
        date: new Date(),
        time: "21:00",
        tableNumber: 4,
        guestCount: 1,
      },
      {
        customerName: "Bob Green",
        date: new Date(),
        time: "18:30",
        tableNumber: 5,
        guestCount: 5,
      },
      {
        customerName: "Mary Black",
        date: new Date(),
        time: "19:30",
        tableNumber: 6,
        guestCount: 2,
      },
      {
        customerName: "James Blue",
        date: new Date(),
        time: "20:30",
        tableNumber: 7,
        guestCount: 3,
      },
      {
        customerName: "Sophia Red",
        date: new Date(),
        time: "21:30",
        tableNumber: 8,
        guestCount: 6,
      },
      {
        customerName: "William Gray",
        date: new Date(),
        time: "22:00",
        tableNumber: 9,
        guestCount: 2,
      },
      {
        customerName: "Olivia Silver",
        date: new Date(),
        time: "18:45",
        tableNumber: 10,
        guestCount: 4,
      },
      {
        customerName: "Lucas Gold",
        date: new Date(),
        time: "19:15",
        tableNumber: 11,
        guestCount: 1,
      },
      {
        customerName: "Mia Copper",
        date: new Date(),
        time: "20:15",
        tableNumber: 12,
        guestCount: 5,
      },
      {
        customerName: "Jack Emerald",
        date: new Date(),
        time: "21:45",
        tableNumber: 13,
        guestCount: 3,
      },
      {
        customerName: "Isabella Pearl",
        date: new Date(),
        time: "22:15",
        tableNumber: 14,
        guestCount: 4,
      },
      {
        customerName: "Henry Diamond",
        date: new Date(),
        time: "18:15",
        tableNumber: 15,
        guestCount: 2,
      },
    ],
  });

  await prisma.restaurantOrder.createMany({
    data: [
      {
        tableNumber: 1,
        totalAmount: 3.0,
        status: "Completed",
      },
      {
        tableNumber: 2,
        totalAmount: 6.5,
        status: "Completed",
      },
      {
        tableNumber: 3,
        totalAmount: 5.4,
        status: "In Progress",
      },
      {
        tableNumber: 4,
        totalAmount: 8.0,
        status: "Completed",
      },
      {
        tableNumber: 5,
        totalAmount: 2.2,
        status: "Pending",
      },
      {
        tableNumber: 6,
        totalAmount: 11.5,
        status: "Completed",
      },
      {
        tableNumber: 7,
        totalAmount: 11.0,
        status: "In Progress",
      },
      {
        tableNumber: 8,
        totalAmount: 10.5,
        status: "Completed",
      },
      {
        tableNumber: 9,
        totalAmount: 21.0,
        status: "Pending",
      },
      {
        tableNumber: 10,
        totalAmount: 16.0,
        status: "In Progress",
      },
      {
        tableNumber: 11,
        totalAmount: 3.0,
        status: "Completed",
      },
      {
        tableNumber: 12,
        totalAmount: 2.4,
        status: "Pending",
      },
      {
        tableNumber: 13,
        totalAmount: 3.0,
        status: "Completed",
      },
      {
        tableNumber: 14,
        totalAmount: 7.2,
        status: "In Progress",
      },
      {
        tableNumber: 15,
        totalAmount: 10.6,
        status: "Completed",
      },
    ],
  });

//   await prisma.restaurantBill.createMany({
//     data: [
//       { orderId: "order1", paymentMethod: "Cash", status: "Paid" },
//       { orderId: "order2", paymentMethod: "Card", status: "Pending" },
//       { orderId: "order3", paymentMethod: "Cash", status: "Paid" },
//       { orderId: "order4", paymentMethod: "Card", status: "Paid" },
//       { orderId: "order5", paymentMethod: "Cash", status: "Pending" },
//       { orderId: "order6", paymentMethod: "Card", status: "Paid" },
//       { orderId: "order7", paymentMethod: "Cash", status: "Pending" },
//       { orderId: "order8", paymentMethod: "Card", status: "Paid" },
//       { orderId: "order9", paymentMethod: "Cash", status: "Paid" },
//       { orderId: "order10", paymentMethod: "Card", status: "Pending" },
//       { orderId: "order11", paymentMethod: "Cash", status: "Paid" },
//       { orderId: "order12", paymentMethod: "Card", status: "Pending" },
//       { orderId: "order13", paymentMethod: "Cash", status: "Paid" },
//       { orderId: "order14", paymentMethod: "Card", status: "Pending" },
//       { orderId: "order15", paymentMethod: "Cash", status: "Paid" },
//     ],
//   });

  await prisma.book.createMany({
    data: [
      {
        title: "JavaScript The Good Parts",
        author: "Douglas Crockford",
        isbn: "978059651776754748",
        price: 30.0,
        quantity: 50,
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "97801323507676884",
        price: 40.0,
        quantity: 40,
      },
      {
        title: "Design Patterns",
        author: "Erich Gamma",
        isbn: "9780201657633610",
        price: 50.0,
        quantity: 30,
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        isbn: "97802012454616224",
        price: 35.0,
        quantity: 45,
      },
      {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        isbn: "978323230262033848",
        price: 80.0,
        quantity: 20,
      },
      {
        title: "Refactoring",
        author: "Martin Fowler",
        isbn: "93232780201485677",
        price: 60.0,
        quantity: 25,
      },
      {
        title: "Code Complete",
        author: "Steve McConnell",
        isbn: "97807356196732328",
        price: 45.0,
        quantity: 35,
      },
      {
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        isbn: "978142323291904244",
        price: 25.0,
        quantity: 50,
      },
      {
        title: "The Mythical Man-Month",
        author: "Fred Brooks",
        isbn: "9782320201835953",
        price: 55.0,
        quantity: 15,
      },
      {
        title: "Operating System Concepts",
        author: "Abraham Silberschatz",
        isbn: "97811180323263330",
        price: 65.0,
        quantity: 10,
      },
      {
        title: "Artificial Intelligence: A Modern Approach",
        author: "Stuart Russell",
        isbn: "978013462323210993",
        price: 90.0,
        quantity: 12,
      },
      {
        title: "Database Design for Mere Mortals",
        author: "Michael J. Hernandez",
        isbn: "978032123232884497",
        price: 40.0,
        quantity: 20,
      },
      {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        isbn: "97815233293279509",
        price: 25.0,
        quantity: 50,
      },
      {
        title: "The Art of Computer Programming",
        author: "Donald E. Knuth",
        isbn: "978074273627321751041",
        price: 120.0,
        quantity: 5,
      },
      {
        title: "Algorithms",
        author: "Robert Sedgewick",
        isbn: "978032447471573513",
        price: 70.0,
        quantity: 30,
      },
    ],
  });

//   await prisma.bookPurchase.createMany({
//     data: [
//       { bookId: "book1", quantity: 2, totalAmount: 60.0, customerId: "user1" },
//       { bookId: "book2", quantity: 1, totalAmount: 40.0, customerId: "user2" },
//       { bookId: "book3", quantity: 1, totalAmount: 50.0, customerId: "user3" },
//       { bookId: "book4", quantity: 3, totalAmount: 105.0, customerId: "user4" },
//       { bookId: "book5", quantity: 2, totalAmount: 160.0, customerId: "user5" },
//       { bookId: "book6", quantity: 4, totalAmount: 240.0, customerId: "user6" },
//       { bookId: "book7", quantity: 1, totalAmount: 45.0, customerId: "user7" },
//       { bookId: "book8", quantity: 1, totalAmount: 55.0, customerId: "user8" },
//       { bookId: "book9", quantity: 2, totalAmount: 90.0, customerId: "user9" },
//       {
//         bookId: "book10",
//         quantity: 1,
//         totalAmount: 65.0,
//         customerId: "user10",
//       },
//       {
//         bookId: "book11",
//         quantity: 3,
//         totalAmount: 75.0,
//         customerId: "user11",
//       },
//       {
//         bookId: "book12",
//         quantity: 1,
//         totalAmount: 60.0,
//         customerId: "user12",
//       },
//       {
//         bookId: "book13",
//         quantity: 1,
//         totalAmount: 25.0,
//         customerId: "user13",
//       },
//       {
//         bookId: "book14",
//         quantity: 2,
//         totalAmount: 50.0,
//         customerId: "user14",
//       },
//       {
//         bookId: "book15",
//         quantity: 1,
//         totalAmount: 120.0,
//         customerId: "user15",
//       },
//     ],
//   });

//   await prisma.bookReturn.createMany({
//     data: [
//       {
//         purchaseId: "purchase1",
//         reason: "Damaged",
//         status: "Returned",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase2",
//         reason: "Incorrect Item",
//         status: "Returned",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase3",
//         reason: "Changed Mind",
//         status: "Pending",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase4",
//         reason: "Damaged",
//         status: "Returned",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase5",
//         reason: "Incorrect Item",
//         status: "Pending",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase6",
//         reason: "Changed Mind",
//         status: "Returned",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase7",
//         reason: "Damaged",
//         status: "Pending",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase8",
//         reason: "Incorrect Item",
//         status: "Returned",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase9",
//         reason: "Changed Mind",
//         status: "Pending",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase10",
//         reason: "Damaged",
//         status: "Returned",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase11",
//         reason: "Incorrect Item",
//         status: "Pending",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase12",
//         reason: "Changed Mind",
//         status: "Returned",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase13",
//         reason: "Damaged",
//         status: "Pending",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase14",
//         reason: "Incorrect Item",
//         status: "Returned",
//         createdAt: new Date(),
//       },
//       {
//         purchaseId: "purchase15",
//         reason: "Changed Mind",
//         status: "Pending",
//         createdAt: new Date(),
//       },
//     ],
//   });

  await prisma.waterProduction.createMany({
    data: [
      {
        batchNumber: "BATCH001",
        quantity: 1000,
        productionDate: new Date(),
        status: "Completed",
      },
      {
        batchNumber: "BATCH002",
        quantity: 2000,
        productionDate: new Date(),
        status: "In Progress",
      },
      {
        batchNumber: "BATCH003",
        quantity: 1500,
        productionDate: new Date(),
        status: "Completed",
      },
      {
        batchNumber: "BATCH004",
        quantity: 1800,
        productionDate: new Date(),
        status: "Completed",
      },
      {
        batchNumber: "BATCH005",
        quantity: 1200,
        productionDate: new Date(),
        status: "In Progress",
      },
      {
        batchNumber: "BATCH006",
        quantity: 1600,
        productionDate: new Date(),
        status: "Completed",
      },
      {
        batchNumber: "BATCH007",
        quantity: 1400,
        productionDate: new Date(),
        status: "In Progress",
      },
      {
        batchNumber: "BATCH008",
        quantity: 1300,
        productionDate: new Date(),
        status: "Completed",
      },
      {
        batchNumber: "BATCH009",
        quantity: 1100,
        productionDate: new Date(),
        status: "In Progress",
      },
      {
        batchNumber: "BATCH010",
        quantity: 1700,
        productionDate: new Date(),
        status: "Completed",
      },
      {
        batchNumber: "BATCH011",
        quantity: 1900,
        productionDate: new Date(),
        status: "In Progress",
      },
      {
        batchNumber: "BATCH012",
        quantity: 1600,
        productionDate: new Date(),
        status: "Completed",
      },
      {
        batchNumber: "BATCH013",
        quantity: 1500,
        productionDate: new Date(),
        status: "Completed",
      },
      {
        batchNumber: "BATCH014",
        quantity: 2000,
        productionDate: new Date(),
        status: "In Progress",
      },
      {
        batchNumber: "BATCH015",
        quantity: 1300,
        productionDate: new Date(),
        status: "Completed",
      },
    ],
  });

  await prisma.waterDistribution.createMany({
    data: [
      {
        destination: "Warehouse A",
        quantity: 1000,
        deliveryDate: new Date(),
        status: "Delivered",
      },
      {
        destination: "Warehouse B",
        quantity: 1500,
        deliveryDate: new Date(),
        status: "In Progress",
      },
      {
        destination: "Warehouse C",
        quantity: 1200,
        deliveryDate: new Date(),
        status: "Delivered",
      },
      {
        destination: "Warehouse D",
        quantity: 1800,
        deliveryDate: new Date(),
        status: "In Progress",
      },
      {
        destination: "Warehouse E",
        quantity: 1400,
        deliveryDate: new Date(),
        status: "Delivered",
      },
      {
        destination: "Warehouse F",
        quantity: 1300,
        deliveryDate: new Date(),
        status: "In Progress",
      },
      {
        destination: "Warehouse G",
        quantity: 1600,
        deliveryDate: new Date(),
        status: "Delivered",
      },
      {
        destination: "Warehouse H",
        quantity: 1100,
        deliveryDate: new Date(),
        status: "In Progress",
      },
      {
        destination: "Warehouse I",
        quantity: 1700,
        deliveryDate: new Date(),
        status: "Delivered",
      },
      {
        destination: "Warehouse J",
        quantity: 1900,
        deliveryDate: new Date(),
        status: "In Progress",
      },
      {
        destination: "Warehouse K",
        quantity: 1600,
        deliveryDate: new Date(),
        status: "Delivered",
      },
      {
        destination: "Warehouse L",
        quantity: 1400,
        deliveryDate: new Date(),
        status: "In Progress",
      },
      {
        destination: "Warehouse M",
        quantity: 1500,
        deliveryDate: new Date(),
        status: "Delivered",
      },
      {
        destination: "Warehouse N",
        quantity: 1800,
        deliveryDate: new Date(),
        status: "In Progress",
      },
      {
        destination: "Warehouse O",
        quantity: 1300,
        deliveryDate: new Date(),
        status: "Delivered",
      },
    ],
  });

  console.log("Seeding done!");
}

async function deleteSeedData() {
  // Delete Inventory
  await prisma.inventory.deleteMany();

  // Delete Sales
  await prisma.sale.deleteMany();

  // Delete Feedback
  await prisma.feedback.deleteMany();

  // Delete Reservations
  await prisma.reservation.deleteMany();

  // Delete Restaurant Orders
  await prisma.restaurantOrder.deleteMany();

  // Delete Books
  await prisma.book.deleteMany();

  // Delete Water Production
  await prisma.waterProduction.deleteMany();

  // Delete Water Distribution
  await prisma.waterDistribution.deleteMany();
  console.log("Seeding deleted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
