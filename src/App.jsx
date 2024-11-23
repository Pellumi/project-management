import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Main from "./components/Main";
import FeedBackPage from "./pages/FeedBackPage";
import WaterPage from "./pages/WaterPage";
import BookShopPage from "./pages/BookShopPage";
import RestaurantPage from "./pages/RestaurantPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  const { isExpired } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isExpired && location.pathname === "/dashboard") {
      navigate("/login");
    }
  }, [isExpired, navigate, location]);

  return (
    <div className="h-full">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={!isExpired ? "/dashboard" : "/login"} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={<ProtectedRoute component={Main} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="sales" element={<Sales />} />
          <Route path="restaurant" element={<RestaurantPage />} />
          <Route path="bookshop" element={<BookShopPage />} />
          <Route path="water" element={<WaterPage />} />
          <Route path="feedback" element={<FeedBackPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Routes>
    </div>
  );
}

const ProtectedRoute = ({ component: Component }) => {
  const { isExpired } = useAuth();
  return !isExpired ? <Component /> : <Navigate to="/login" />;
};

export default App