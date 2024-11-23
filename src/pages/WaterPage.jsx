import React from "react";
import { TabContent, TabList, Tabs, TabTrigger } from "../components/ui/Tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import { Select, SelectItem } from "../components/ui/Select";
import { FaDroplet } from "react-icons/fa6";
import axios from "axios";
import { Input } from "../components/ui/Input";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const WaterPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const [isLoading, setIsLoading] = React.useState(false);
  const [productionBatches, setProductionBatches] = React.useState([]);
  const [distributionOrders, setDistributionOrders] = React.useState([]);
  const [isAddBatchDialogOpen, setIsAddBatchDialogOpen] = React.useState(false);
  const [isAddOrderDialogOpen, setIsAddOrderDialogOpen] = React.useState(false);
  const [newBatch, setNewBatch] = React.useState({
    batchNumber: "",
    quantity: 0,
    productionDate: "",
  });
  const [newOrder, setNewOrder] = React.useState({
    destination: "",
    quantity: 0,
    deliveryDate: "",
  });

  const recordProduction = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/water/production",
        {
          batchNumber: newBatch.batchNumber,
          quantity: parseInt(newBatch.quantity, 10),
          productionDate: new Date(newBatch.productionDate).toISOString(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Production recorded successfully", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        setNewBatch({
          batchNumber: "",
          quantity: 0,
          productionDate: "",
        });

        setIsAddBatchDialogOpen(false);
        setProductionBatches((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred! Please try again.", {
        duration: 6000,
        icon: "🚨",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProduction = async () => {
    const baseURL = "http://localhost:3000/api/water/production";

    try {
      const response = await axios.get(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProductionBatches(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createDistributionOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/water/distribution",
        {
          destination: newOrder.destination,
          quantity: parseInt(newOrder.quantity, 10),
          deliveryDate: new Date(newOrder.deliveryDate).toISOString(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Production recorded successfully", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        setNewOrder({
          destination: "",
          quantity: 0,
          deliveryDate: "",
        });

        setIsAddBatchDialogOpen(false);
        setDistributionOrders((prev) => [...prev, response.data]);
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

  const fetchDistributiion = async () => {
    const baseURL = "http://localhost:3000/api/water/distribution";

    try {
      const response = await axios.get(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDistributionOrders(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDistributionStatus = async (distributionId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/water/distribution/${distributionId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Status Updated Successfully", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        fetchDistributiion();
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
    }
  };

  React.useEffect(() => {
    fetchProduction();
    fetchDistributiion();
  }, []);

  return (
    <div className="flex-1 rounded-lg p-3 overflow-auto hide-scrollbar bg-white h-full">
      <div className="mb-4">
        <h3 className="text-2xl font-bold">
          Water Production and Distribution
        </h3>
      </div>
      <Tabs defaultValue="production">
        <TabList className="grid w-full grid-cols-2">
          <TabTrigger value="production">Production</TabTrigger>
          <TabTrigger value="distribution">Distribution</TabTrigger>
        </TabList>
        <TabContent value="production">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Production Batches</h3>
            <DialogTrigger asChild onClick={setIsAddBatchDialogOpen}>
              <Button>Record New Batch</Button>
            </DialogTrigger>
            <Dialog
              open={isAddBatchDialogOpen}
              onOpenChange={setIsAddBatchDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Record New Production Batch</DialogTitle>
                </DialogHeader>
                <form onSubmit={recordProduction} className="space-y-4">
                  <div>
                    <Label htmlFor="batchNumber">Batch Number</Label>
                    <Input
                      id="batchNumber"
                      value={newBatch.batchNumber}
                      onChange={(e) =>
                        setNewBatch({
                          ...newBatch,
                          batchNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newBatch.quantity}
                      onChange={(e) =>
                        setNewBatch({
                          ...newBatch,
                          quantity: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="productionDate">Production Date</Label>
                    <Input
                      id="productionDate"
                      type="datetime-local"
                      value={newBatch.productionDate}
                      onChange={(e) =>
                        setNewBatch({
                          ...newBatch,
                          productionDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Record Batch
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch Number</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Production Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productionBatches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell>{batch.batchNumber}</TableCell>
                  <TableCell>{batch.quantity}</TableCell>
                  <TableCell>
                    {new Date(batch.productionDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FaDroplet
                        className={`h-4 w-4 ${
                          batch.status === "COMPLETED"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      />
                      <span>{batch.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabContent>
        <TabContent value="distribution">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Distribution Orders</h3>
            <DialogTrigger asChild onClick={setIsAddOrderDialogOpen}>
              <Button>Create New Order</Button>
            </DialogTrigger>
            <Dialog
              open={isAddOrderDialogOpen}
              onOpenChange={setIsAddOrderDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Distribution Order</DialogTitle>
                </DialogHeader>
                <form onSubmit={createDistributionOrder} className="space-y-4">
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      value={newOrder.destination}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          destination: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newOrder.quantity}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          quantity: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryDate">Delivery Date</Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={newOrder.deliveryDate}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          deliveryDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {" "}
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create Order
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Destination</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {distributionOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.destination}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    {new Date(order.deliveryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FaDroplet
                        className={`h-4 w-4 ${
                          order.status === "DELIVERED"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      />
                      <span>{order.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        updateDistributionStatus(order.id, value)
                      }
                    >
                      {/* <SelectTrigger>
                                                <SelectValue placeholder="Update Status" />
                                            </SelectTrigger> */}
                      {/* <SelectContent> */}
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                      {/* </SelectContent> */}
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabContent>
      </Tabs>
    </div>
  );
};

export default WaterPage;
