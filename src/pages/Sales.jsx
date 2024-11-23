import axios from 'axios';
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Select, SelectItem } from '../components/ui/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import toast from "react-hot-toast";

const Sales = () => {
  const [sales, setSales] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newSale, setNewSale] = React.useState({
    productId: '',
    quantity: 0,
    totalAmount: 0,
    businessUnit: '',
  });
  const [loading, setLoading] = React.useState(false)

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const recordSale = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/sales',
        {
          productId: newSale.productId,
          quantity: parseInt(newSale.quantity, 10),
          totalAmount: parseFloat(newSale.totalAmount),
          businessUnit: newSale.businessUnit,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Sale Recorded", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        setNewSale({
          productId: '',
          quantity: 0,
          totalAmount: 0,
          businessUnit: '',
        })

        setIsDialogOpen(false);
        setSales((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error(error);
      // console.log(error.status)
      if (error.status === 404){
        toast.error(
          "Note: Item not found in the inventory",
          {
            duration: 6000,
            icon: "🚨",
          }
        );

        setNewSale({
          productId: '',
          quantity: 0,
          totalAmount: 0,
          businessUnit: '',
        })
      }
    }
  };

  const fetchDailySales = async (token, businessUnit = null) => {
    try {
      const response = await axios.get('http://localhost:3000/api/sales/daily', {
        headers: { Authorization: `Bearer ${token}` },
        params: { businessUnit }
      });

      // console.log(response.data);
      setSales(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchDailySales(token)
  }, [token])

  const filteredSales = sales.filter(item =>
    filter === '' || item.businessUnit.toLowerCase() === filter.toLowerCase()
  )
  // console.log(filteredSales)

  return (
    <div className='flex-1 rounded-lg p-3 overflow-auto hide-scrollbar bg-white h-full'>
      <div className='mb-4'>
        <h3 className="text-2xl font-bold">Sales Management</h3>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record New Sale</DialogTitle>
          </DialogHeader>
          <form onSubmit={recordSale} className="space-y-4">
            <div>
              <Label htmlFor="productId">Product Id</Label>
              <Input
                id="productId"
                value={newSale.productId}
                onChange={(e) => setNewSale({ ...newSale, productId: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={newSale.quantity}
                onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="totalAmount">Total Amount</Label>
              <Input
                id="totalAmount"
                type='number'
                step="0.01"
                value={newSale.totalAmount}
                onChange={(e) => setNewSale({ ...newSale, totalAmount: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="businessUnit">Business Unit</Label>
              <Select
                value={newSale.businessUnit}
                onValueChange={(value) => setNewSale({ ...newSale, businessUnit: value })}
                required
              >
                <SelectItem value=""></SelectItem>
                <SelectItem value="Bookshop">Bookshop</SelectItem>
                <SelectItem value="Restaurant">Restaurant</SelectItem>
                <SelectItem value="Water Industry">Water Industry</SelectItem>
              </Select>
            </div>
            <Button type="submit" disabled={loading}>Report Sale</Button>
          </form>
        </DialogContent>
      </Dialog>
      <div className="mb-4 gap-4 flex">
        <Select className="w-[200px]" value={filter} onValueChange={setFilter}>
          <SelectItem value="">All</SelectItem>
          <SelectItem value="Bookshop">Bookshop</SelectItem>
          <SelectItem value="Restaurant">Restaurant</SelectItem>
          <SelectItem value="Water Industry">Water Industry</SelectItem>
        </Select>
        <DialogTrigger asChild onClick={setIsDialogOpen}>
          <Button>Record New Sale</Button>
        </DialogTrigger>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Id</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Business Unit</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSales.map((sale) => (
            <TableRow key={sales.id}>
              <TableCell>{sale.productId}</TableCell>
              <TableCell>{sale.quantity}</TableCell>
              <TableCell>{sale.totalAmount}</TableCell>
              <TableCell>{sale.businessUnit}</TableCell>
              <TableCell>{new Date(sale.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Sales