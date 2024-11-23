import axios from "axios";
import React from "react";
import { TabContent, TabList, Tabs, TabTrigger } from "../components/ui/Tabs";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { LuLoader2 } from "react-icons/lu";
import { Input } from "../components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import { Loader2, Plus, Trash } from "lucide-react";
import { Select, SelectItem } from "../components/ui/Select";

const RestaurantPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderItems, setOrderItems] = React.useState([]);
  const [reservations, setReservations] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [newReservertion, setNewReservation] = React.useState({
    customerName: "",
    date: "",
    time: "",
    tableNumber: 0,
    guestCount: 0,
  });
  const [tableNumber, setTableNumber] = React.useState(0);
  const [newBill, setNewBill] = React.useState({
    orderId: "",
    paymentMethod: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const makeReservation = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/restaurant/reservations",
        {
          customerName: newReservertion.customerName,
          date: new Date(newReservertion.date).toISOString(),
          time: newReservertion.time,
          tableNumber: parseInt(newReservertion.tableNumber, 10),
          guestCount: parseInt(newReservertion.tableNumber, 10),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Reservation Created Successfully", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        setNewReservation({
          customerName: "",
          date: "",
          time: "",
          tableNumber: 0,
          guestCount: 0,
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

  const fetchReservation = async () => {
    const baseURL = "http://localhost:3000/api/restaurant/reservations";

    try {
      const response = await axios.get(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservations(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addOrderItem = (item) => {
    setOrderItems([...orderItems, { ...item, id: Date.now() }]);
  };

  const removeOrderItem = (id) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const createOrder = async () => {
    setIsLoading(true);
    try {
      const totalAmount = calculateTotal();

      const order = {
        tableNumber: parseInt(tableNumber, 10),
        items: orderItems.map(({ id, ...item }) => item),
        totalAmount: totalAmount,
      };

      const response = await axios.post(
        "http://localhost:3000/api/restaurant/orders",
        order,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Order Successfully Created", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        setTableNumber(0);
        setOrderItems([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrder = async () => {
    const baseURL = "http://localhost:3000/api/restaurant/orders";

    try {
      const response = await axios.get(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const processBill = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const bill = {
      orderId: newBill.orderId,
      paymentMethod: newBill.paymentMethod,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/restaurant/bills",
        bill,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Bill Processed", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        setNewBill({
          orderId: "",
          paymentMethod: "",
        });
      }

      // console.log(response.data);
      // console.log();
    } catch (error) {
      console.error(error);
      if (error.response.status === 500) {
        toast.error(error.response.message || "Invalid Order ID", {
          duration: 6000,
          icon: "🚨",
        });
      } else if (error.response.status === 400) {
        toast.error(error.response.message || "Bill already processed", {
          duration: 6000,
          icon: "🚨",
        });
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

  React.useEffect(() => {
    fetchReservation();
    fetchOrder();
  }, []);

  return (
    <div className="flex-1 rounded-lg overflow-auto hide-scrollbar p-3 bg-white h-full">
      <div className="mb-4">
        <h3 className="text-2xl font-bold">Restaurant Management</h3>
      </div>
      <Tabs defaultValue={"reservations"}>
        <TabList className="grid w-full grid-cols-3">
          <TabTrigger value="reservations">Reservations</TabTrigger>
          <TabTrigger value="orders">Orders</TabTrigger>
          <TabTrigger value="bills">Bills</TabTrigger>
        </TabList>
        <TabContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Make Reservation</CardTitle>
              <CardDescription>
                Enter the details to make a new reservation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={makeReservation}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input
                        id="customerName"
                        value={newReservertion.customerName}
                        onChange={(e) =>
                          setNewReservation({
                            ...newReservertion,
                            customerName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newReservertion.date}
                        onChange={(e) =>
                          setNewReservation({
                            ...newReservertion,
                            date: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newReservertion.time}
                        onChange={(e) =>
                          setNewReservation({
                            ...newReservertion,
                            time: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tableNumber">Table Number</Label>
                      <Input
                        id="tableNumber"
                        type="number"
                        value={newReservertion.tableNumber}
                        onChange={(e) =>
                          setNewReservation({
                            ...newReservertion,
                            tableNumber: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guestCount">Guest Count</Label>
                    <Input
                      id="guestCount"
                      type="number"
                      value={newReservertion.guestCount}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservertion,
                          guestCount: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <Button className="mt-4" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Make Reservation
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Table Number</TableHead>
                    <TableHead>Guest Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((res) => (
                    <TableRow key={res.id}>
                      <TableCell>{res.customerName}</TableCell>
                      <TableCell>{`${new Date(res.date).getDate()} - ${new Date(
                        res.date
                      ).getMonth()} - ${new Date(
                        res.date
                      ).getFullYear()}`}</TableCell>
                      <TableCell>{`${new Date(
                        res.date
                      ).getHours()} : ${parseInt(
                        new Date(res.date).getMinutes().toString(),
                        10
                      )}`}</TableCell>
                      <TableCell>{res.tableNumber}</TableCell>
                      <TableCell>{res.guestCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabContent>
        <TabContent value="orders">
          <Card className="">
            <CardHeader>
              <CardTitle>Create Order</CardTitle>
              <CardDescription>
                Add items to the order and submit.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              <div className="h-full">
                <Input
                  placeholder="Table Number"
                  id="tableNumber"
                  type="number"
                  value={tableNumber}
                  required
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-1/4 mb-4"
                />
                <div className="flex gap-3 mb-4">
                  <Input
                    placeholder="Item name"
                    id="itemName"
                    className="flex-1"
                  />
                  <Input
                    placeholder="Quantity"
                    type="number"
                    id="itemQuantity"
                    className="flex-1"
                  />
                  <Input
                    placeholder="Price"
                    type="number"
                    step="0.01"
                    id="itemPrice"
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      const name = document.getElementById("itemName").value;
                      const quantity = parseInt(
                        document.getElementById("itemQuantity").value
                      );
                      const price = parseFloat(
                        document.getElementById("itemPrice").value
                      );
                      if (name && quantity && price) {
                        addOrderItem({ name, quantity, price });
                        document.getElementById("itemName").value = "";
                        document.getElementById("itemQuantity").value = "";
                        document.getElementById("itemPrice").value = "";
                      }
                    }}
                    className="flex items-center justify-center gap-3"
                  >
                    <Plus size={20} />
                    Add Item
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>₦{item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          ₦{(item.quantity * item.price).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOrderItem(item.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="text-right font-bold mt-4">
                  Total: ₦{calculateTotal().toFixed(2)}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={createOrder}
                disabled={isLoading || orderItems.length === 0}
              >
                {isLoading && (
                  <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Order
              </Button>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Table Number</TableHead>
                    <TableHead>Item Number</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((od) => (
                    <TableRow key={od.id}>
                      <TableCell>{od.id}</TableCell>
                      <TableCell>{od.tableNumber}</TableCell>
                      <TableCell>{od.items.length}</TableCell>
                      <TableCell>{od.totalAmount}</TableCell>
                      <TableCell>{od.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabContent>
        <TabContent value="bills">
          <Card>
            <CardHeader>
              <CardTitle>Bills</CardTitle>
              <CardDescription>
                Enter details to process a bill.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={processBill}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orderId">Order ID</Label>
                    <Input
                      id="orderId"
                      value={newBill.orderId}
                      onChange={(e) =>
                        setNewBill({ ...newBill, orderId: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select
                      value={newBill.paymentMethod}
                      onValueChange={(value) =>
                        setNewBill({ ...newBill, paymentMethod: value })
                      }
                      required
                    >
                      {/* <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger> */}
                      {/* <SelectContent> */}
                      <SelectItem value=""></SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Debit Card">Debit Card</SelectItem>
                      <SelectItem value="Debit Card">Transfer</SelectItem>
                      {/* </SelectContent> */}
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="mt-4" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Process Bill
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabContent>
      </Tabs>
    </div>
  );
};

export default RestaurantPage;
