import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Gallery from "../pages/Gallery/Gallery";
import Services from "../pages/Services/Services";
import WeddingsPage from "../components/Weddings/Weddings";
import CouplesPage from "../components/Couples/Couples";
import PricingPage from "../components/Pricing/Pricing";
import ElopementGuidesPage from "../pages/ElopementGuides/ElopementGuides";

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
    </Routes>
  );
}