import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Gallery from "../pages/Gallery/Gallery";
import Services from "../pages/Services/Services";
import WeddingsPage from "../components/Weddings/Weddings";
import CouplesPage from "../components/Couples/Couples";
import PricingPage from "../components/Pricing/Pricing";
import ElopementGuidesPage from "../pages/ElopementGuides/ElopementGuides";
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";
import AdminLayout from "../pages/Admin/AdminLayout/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import AdminEnquiries from "../pages/Admin/AdminEnquiries/AdminEnquiries";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                 element={<Home />} />
      <Route path="/about"            element={<About />} />
      <Route path="/contact"          element={<Contact />} />
      <Route path="/gallery"          element={<Gallery />} />
      <Route path="/weddings"         element={<WeddingsPage />} />
      <Route path="/couples"          element={<CouplesPage />} />
      <Route path="/pricing"          element={<PricingPage />} />
      <Route path="/services"         element={<Services />} />
      <Route path="/elopement-guides" element={<ElopementGuidesPage />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="enquiries" element={<AdminEnquiries />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}