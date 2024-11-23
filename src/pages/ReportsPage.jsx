import axios from "axios";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Label } from "../components/ui/Label";
import { Select, SelectItem } from "../components/ui/Select";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import {
  AlertTriangle,
  DollarSign,
  Loader2,
  MessageSquare,
  RefreshCcw,
  ShoppingCart,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";

const businessUnits = ["All Units", "Bookshop", "Restaurant", "Water Industry"];

const ReportsPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedUnit, setSelectedUnit] = React.useState(null);
  const [report, setReport] = React.useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const getDailyReport = async (businessUnit = "") => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/reports/daily",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { businessUnit },
        }
      );

      console.log(response.data);
      setReport(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 rounded-lg p-3 overflow-auto hide-scrollbar bg-white h-full">
      <div className="mb-4">
        <h3 className="text-2xl font-bold">Daily Reports</h3>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>
            Select a business unit and date to generate a daily report.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessUnit">Business Unit</Label>
              <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                {/* <SelectTrigger id="businessUnit">
                  <SelectValue placeholder="Select business unit" />
                </SelectTrigger> */}
                {/* <SelectContent> */}
                {businessUnits.map((unit) => (
                  <SelectItem
                    key={unit}
                    value={unit == "All Units" ? null : unit}
                  >
                    {unit}
                  </SelectItem>
                ))}
                {/* </SelectContent> */}
              </Select>
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="reportDate">Report Date</Label>
              <Input
                id="reportDate"
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
              />
            </div> */}
            <div className="flex items-end">
              <Button
                onClick={() => getDailyReport(selectedUnit)}
                disabled={isLoading}
                className="flex gap-3 items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="mr-2 h-4 w-4" />
                )}
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {report && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sales
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₦{report.totalSales.toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sales Count
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{report.salesCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Low Stock Items
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {report.lowStockItems.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Feedback Count
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{report.feedbackCount}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
              <CardDescription>
                Items that are below their minimum stock level.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Current Quantity</TableHead>
                    <TableHead>Minimum Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.lowStockItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.minStock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
