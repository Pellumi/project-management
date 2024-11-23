import axios from "axios";
import React from "react";
import { TabContent, TabList, Tabs, TabTrigger } from "../components/ui/Tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";

const BookShopPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [books, setBooks] = React.useState([]);
  const [purchases, setPurchases] = React.useState([]);
  // const [returns, setReturns] = React.useState([]);
  const [newBook, setNewBook] = React.useState({
    title: "",
    author: "",
    isbn: "",
    price: 0,
    quantity: 0,
  });
  const [newPurchase, setNewPurchase] = React.useState({
    bookId: "",
    quantity: 0,
    customerId: "",
  });
  const [newReturn, setNewReturn] = React.useState({
    purchaseId: "",
    reason: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const addBook = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/bookshop/books",
        {
          title: newBook.title,
          author: newBook.author,
          isbn: newBook.isbn,
          price: parseInt(newBook.price),
          quantity: parseInt(newBook.quantity),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Book added to shelf", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        setNewBook({
          title: "",
          author: "",
          isbn: "",
          price: 0,
          quantity: 0,
        });

        setBooks((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response.message || "An error occurred! Please try again.",
        {
          duration: 6000,
          icon: "🚨",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getBooks = async () => {
    const baseURL = "http://localhost:3000/api/bookshop/books";

    try {
      const response = await axios.get(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const processPurchase = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/bookshop/purchases",
        {
          bookId: newPurchase.bookId,
          quantity: parseInt(newPurchase.quantity, 10),
          customerId: newPurchase.customerId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Purchase processed successfully", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        setNewPurchase({
          bookId: "",
          quantity: 0,
          customerId: "",
        });

        setPurchases((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error(error);
      // console.log(error.response.status);
      if (error.response.status === 404) {
        toast.error(
          "Product not found in Inventory",
          {
            duration: 6000,
            icon: "🚨",
          }
        );
      } else {
        toast.error(
          error.response.message || "An error occurred! Please try again.",
          {
            duration: 6000,
            icon: "🚨",
          }
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPurchases = async () => {
    const baseURL = "http://localhost:3000/api/bookshop/purchases";

    try {
      const response = await axios.get(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPurchases(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const processReturn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/bookshop/returns",
        {
          purchaseId: newReturn.purchaseId,
          reason: newReturn.reason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Return processed successfully", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        setNewReturn({
          purchaseId: "",
          reason: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response.message || "An error occurred! Please try again.",
        {
          duration: 6000,
          icon: "🚨",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const getReturns = async () => {
  //   const baseURL = "http://localhost:3000/api/bookshop/returns";

  //   try {
  //     const response = await axios.get(baseURL, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setReturns(response.data);
  //     // console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  React.useEffect(() => {
    getBooks();
    getPurchases();
  }, []);

  return (
    <div className="flex-1 rounded-lg p-3 overflow-auto hide-scrollbar bg-white h-full">
      <div className="mb-4">
        <h3 className="text-2xl font-bold">BookShop Management</h3>
      </div>
      <Tabs defaultValue={"add-book"}>
        <TabList className="grid w-full grid-cols-3">
          <TabTrigger value="add-book">Add Book</TabTrigger>
          <TabTrigger value="process-purchase">Process Purchase</TabTrigger>
          <TabTrigger value="process-return">Process Return</TabTrigger>
        </TabList>
        <TabContent value="add-book">
          <Card>
            <CardHeader>
              <CardTitle>Add New Book</CardTitle>
              <CardDescription>
                Enter the details of the new book to add to inventory.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={addBook}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newBook.title}
                        onChange={(e) =>
                          setNewBook({ ...newBook, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={newBook.author}
                        onChange={(e) =>
                          setNewBook({ ...newBook, author: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="isbn">ISBN</Label>
                      <Input
                        id="isbn"
                        value={newBook.isbn}
                        onChange={(e) =>
                          setNewBook({ ...newBook, isbn: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newBook.price}
                        onChange={(e) =>
                          setNewBook({ ...newBook, price: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newBook.quantity}
                      onChange={(e) =>
                        setNewBook({ ...newBook, quantity: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <Button className="mt-4" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Book
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Book Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.isbn}</TableCell>
                      <TableCell>${book.price.toFixed(2)}</TableCell>
                      <TableCell>{book.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabContent>
        <TabContent value="process-purchase">
          <Card>
            <CardHeader>
              <CardTitle>Process Purchase</CardTitle>
              <CardDescription>
                Enter the details to process a book purchase.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={processPurchase}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bookId">Book ID</Label>
                    <Input
                      id="bookId"
                      value={newPurchase.bookId}
                      onChange={(e) =>
                        setNewPurchase({
                          ...newPurchase,
                          bookId: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processQuantity">Quantity</Label>
                    <Input
                      id="processQuantity"
                      type="number"
                      value={newPurchase.quantity}
                      onChange={(e) =>
                        setNewPurchase({
                          ...newPurchase,
                          quantity: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerId">Customer ID</Label>
                    <Input
                      id="customerId"
                      value={newPurchase.customerId}
                      onChange={(e) =>
                        setNewPurchase({
                          ...newPurchase,
                          customerId: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <Button className="mt-4" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Process Purchase
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Purchase Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Purchase Id</TableHead>
                    <TableHead>Book Id</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Customer Id</TableHead>
                    <TableHead>Purchase Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell>{purchase.id}</TableCell>
                      <TableCell>{purchase.bookId}</TableCell>
                      <TableCell>{purchase.quantity}</TableCell>
                      <TableCell>₦{purchase.totalAmount}</TableCell>
                      <TableCell>{purchase.customerId}</TableCell>
                      <TableCell>
                        {new Date(purchase.createdAt).toUTCString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabContent>
        <TabContent value="process-return">
          <Card>
            <CardHeader>
              <CardTitle>Process Return</CardTitle>
              <CardDescription>
                Enter the details to process a book return.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={processReturn}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="purchaseId">Purchase ID</Label>
                    <Input
                      id="purchaseId"
                      value={newReturn.purchaseId}
                      onChange={(e) =>
                        setNewReturn({
                          ...newReturn,
                          purchaseId: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Return</Label>
                    <Input
                      id="reason"
                      value={newReturn.reason}
                      onChange={(e) =>
                        setNewReturn({ ...newReturn, reason: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <Button className="mt-4" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Process Return
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabContent>
      </Tabs>
    </div>
  );
};

export default BookShopPage;
