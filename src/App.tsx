import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/Auth/LoginPage";
import { RegisterPage } from "./pages/Auth/RegisterPage";
import { OverviewPage } from "./pages/Dashboard/OverviewPage";
import { OrdersPage } from "./pages/Dashboard/OrdersPage";
import { WarehousesPage } from "./pages/Dashboard/WarehousesPage";
import { DispatchPage } from "./pages/Dashboard/DispatchPage";
import { ShippersPage } from "./pages/Dashboard/ShippersPage";
import { ReportsPage } from "./pages/Dashboard/ReportsPage";
import { AdminPanelPage } from "./pages/Dashboard/AdminPanelPage";
import { CompanyProfilePage } from "./pages/Dashboard/CompanyProfilePage";
import { TrackingPage } from "./pages/TrackingPage";
import { DashboardLayout } from "./components/Layout/DashboardLayout";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tracking" element={<TrackingPage />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={
              <Navigate to="/dashboard/overview" replace />
            }
          />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route
            path="warehouses"
            element={<WarehousesPage />}
          />
          <Route path="dispatch" element={<DispatchPage />} />
          <Route path="shippers" element={<ShippersPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="profile" element={<CompanyProfilePage />} />
          <Route path="admin" element={<AdminPanelPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}