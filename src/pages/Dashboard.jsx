import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  Book,
  DollarSign,
  Droplet,
  MessageSquare,
  Package,
  Radar,
  ShoppingCart,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { TabContent, TabList, Tabs, TabTrigger } from "../components/ui/Tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Area,
  RadarChart,
  AreaChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
} from "recharts";

const salesData = {
  totalSales: 54093,
  totalOrders: 327,
  averageOrderValue: 165.42,
  customerCount: 215,
};

const inventoryData = {
  totalItems: 1250,
  lowStockItems: 23,
  outOfStockItems: 5,
};

const bookshopData = {
  totalBooks: 5000,
  salesThisMonth: 12500,
  topSellingBook: "The Great Gatsby",
};

const waterData = {
  productionToday: 15000,
  distributionPending: 8,
  qualityScore: 98,
};

const feedbackData = {
  totalFeedback: 150,
  positivePercentage: 85,
  recentFeedback: "Great service at the restaurant!",
};

const restaurantData = {
  reservationsToday: 45,
  averageRating: 4.7,
  popularDish: "Spaghetti Carbonara",
};

const Dashboard = () => {
  return (
    <div className="flex-1 rounded-lg p-3 overflow-auto hide-scrollbar bg-white h-full">
      <div className="mb-4">
        <h3 className="text-2xl font-bold">MaxHelp Dashboard</h3>
      </div>
      <div className="grid gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${salesData.totalSales.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.customerCount}</div>
            <p className="text-xs text-muted-foreground">+7% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Items
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryData.totalItems}</div>
            <p className="text-xs text-muted-foreground">
              {inventoryData.lowStockItems} low stock items
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabList>
          <TabTrigger value="overview">Overview</TabTrigger>
          <TabTrigger value="bookshop">Bookshop</TabTrigger>
          <TabTrigger value="restaurant">Restaurant</TabTrigger>
          <TabTrigger value="water">Water Industry</TabTrigger>
        </TabList>
        <TabContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={[
                      {
                        name: "Jan",
                        total: Math.floor(Math.random() * 5000) + 1000,
                      },
                      {
                        name: "Feb",
                        total: Math.floor(Math.random() * 5000) + 1000,
                      },
                      {
                        name: "Mar",
                        total: Math.floor(Math.random() * 5000) + 1000,
                      },
                      {
                        name: "Apr",
                        total: Math.floor(Math.random() * 5000) + 1000,
                      },
                      {
                        name: "May",
                        total: Math.floor(Math.random() * 5000) + 1000,
                      },
                      {
                        name: "Jun",
                        total: Math.floor(Math.random() * 5000) + 1000,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        New order received
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Order #1234 - $129.99
                      </p>
                    </div>
                    <div className="ml-auto font-medium">Just now</div>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        New feedback
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {feedbackData.recentFeedback}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">5m ago</div>
                  </div>
                  <div className="flex items-center">
                    <Droplet className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Water production completed
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Batch #5678 - 1000 liters
                      </p>
                    </div>
                    <div className="ml-auto font-medium">1h ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid mt-4 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Feedback Score
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {feedbackData.positivePercentage}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Positive feedback
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Water Quality
                </CardTitle>
                <Droplet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {waterData.qualityScore}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Average quality score
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Restaurant Rating
                </CardTitle>
                <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {restaurantData.averageRating}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average customer rating
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Book Sales
                </CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${bookshopData.salesThisMonth}
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
        </TabContent>
        <TabContent value="bookshop">
          <div className="flex gap-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Monthly Book Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={[
                      { month: "Jan", sales: 1200 },
                      { month: "Feb", sales: 1500 },
                      { month: "Mar", sales: 800 },
                      { month: "Apr", sales: 1700 },
                      { month: "May", sales: 1400 },
                      { month: "Jun", sales: 2000 },
                    ]}
                  >
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Book Genres Popularity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Fiction", value: 40 },
                        { name: "Non-fiction", value: 30 },
                        { name: "Mystery", value: 15 },
                        { name: "Science Fiction", value: 10 },
                        { name: "Others", value: 5 },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      label
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabContent>
        <TabContent value="restaurant" className="space-y-4">
          <div className="flex gap-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Weekly Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart
                    data={[
                      { day: "Mon", reservations: 10 },
                      { day: "Tue", reservations: 12 },
                      { day: "Wed", reservations: 15 },
                      { day: "Thu", reservations: 20 },
                      { day: "Fri", reservations: 25 },
                      { day: "Sat", reservations: 30 },
                      { day: "Sun", reservations: 18 },
                    ]}
                  >
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Area
                      type="monotone"
                      dataKey="reservations"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Customer Ratings Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    width={500}
                    height={300}
                    data={[
                      { category: "Food", rating: 4.8 },
                      { category: "Service", rating: 4.6 },
                      { category: "Ambiance", rating: 4.7 },
                      { category: "Cleanliness", rating: 4.9 },
                      { category: "Value", rating: 4.5 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Bar dataKey="rating" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabContent>
        <TabContent value="water" className="space-y-4">
          <div className="flex gap-4">
            <Card className={`flex-1`}>
              <CardHeader>
                <CardTitle>Daily Water Production</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart
                    data={[
                      { day: "Mon", production: 1200, distributed: 800 },
                      { day: "Tue", production: 1400, distributed: 1000 },
                      { day: "Wed", production: 1300, distributed: 900 },
                      { day: "Thu", production: 1500, distributed: 1200 },
                      { day: "Fri", production: 1600, distributed: 1100 },
                      { day: "Sat", production: 1800, distributed: 1500 },
                      { day: "Sun", production: 2000, distributed: 1700 },
                    ]}
                  >
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="production" fill="#8884d8" />
                    <Line
                      type="monotone"
                      dataKey="distributed"
                      stroke="#82ca9d"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
             
          </div>
        </TabContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
