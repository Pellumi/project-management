import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table'
import axios from 'axios'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Button } from '../components/ui/Button';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Select, SelectItem } from '../components/ui/Select';
import toast from "react-hot-toast";

const Inventory = () => {
  const [inventory, setInventory] = React.useState([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [newItem, setNewItem] = React.useState({
    name: '',
    quantity: 0,
    unitPrice: 0,
    businessUnit: '',
    minStock: 0,
  });


  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const handleAddItem = async (e) => {
    e.preventDefault();
    const baseURL = "http://localhost:3000/api/inventory"

    try {
      const response = await axios.post(baseURL,
        {
          name: newItem.name,
          quantity: newItem.quantity,
          unitPrice: newItem.unitPrice,
          businessUnit: newItem.businessUnit,
          minStock: newItem.minStock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })

      if (response.status === 201) {
        toast.success("New Item Created", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        setNewItem({
          name: '',
          quantity: 0,
          unitPrice: 0,
          businessUnit: '',
          minStock: 0,
        })

        setIsDialogOpen(false);
        setInventory((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.log(error)
      toast.error(
        error.response.error || "An error occurred! Please try again.",
        {
          duration: 6000,
          icon: "🚨",
        }
      );
    }

    console.log('New Item:', newItem);
  };

  const fetchInventory = async (token, businessUnit = null) => {
    const baseURL = "http://localhost:3000/api/inventory"

    try {
      const response = await axios.get(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setInventory(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    fetchInventory(token);
  }, [token]);

  const filteredInventory = inventory.filter(item =>
    filter === '' || item.businessUnit.toLowerCase() === filter.toLowerCase()
  )

  return (
    <div className='flex-1 rounded-lg p-3 bg-white overflow-auto hide-scrollbar h-full'>
      <div className='mb-4'>
        <h3 className="text-2xl font-bold">Inventory Management</h3>
      </div>
      <div className="gap-4 flex">
        <Select className="w-[200px]" value={filter} onValueChange={setFilter}>
          <SelectItem value="">All</SelectItem>
          <SelectItem value="Bookshop">Bookshop</SelectItem>
          <SelectItem value="Restaurant">Restaurant</SelectItem>
          <SelectItem value="Water Industry">Water Industry</SelectItem>
        </Select>
        <DialogTrigger asChild onClick={setIsDialogOpen}>
          <Button className='mb-4 rounded-md'>Add New Item</Button>
        </DialogTrigger>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="unitPrice">Unit Price</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  value={newItem.unitPrice}
                  onChange={(e) =>
                    setNewItem({ ...newItem, unitPrice: parseFloat(e.target.value) })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="businessUnit">Business Unit</Label>
                <Select
                  value={newItem.businessUnit}
                  onValueChange={(value) => setNewItem({ ...newItem, businessUnit: value })}
                  required
                >
                  <SelectItem value=""></SelectItem>
                  <SelectItem value="Bookshop">Bookshop</SelectItem>
                  <SelectItem value="Restaurant">Restaurant</SelectItem>
                  <SelectItem value="Water Industry">Water Industry</SelectItem>
                </Select>
              </div>
              <div>
                <Label htmlFor="minStock">Minimum Stock</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={newItem.minStock}
                  onChange={(e) =>
                    setNewItem({ ...newItem, minStock: parseInt(e.target.value) })
                  }
                  required
                />
              </div>
              <Button type="submit">Add Item</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Business Unit</TableHead>
            <TableHead>Min Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unitPrice.toFixed(2)}</TableCell>
              <TableCell>{item.businessUnit}</TableCell>
              <TableCell>{item.minStock}</TableCell>
              <TableCell>
                {item.quantity <= item.minStock && (
                  <span style={{ color: "red" }}>Low Stock</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Inventory