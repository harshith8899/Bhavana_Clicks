import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Gallery from "../pages/Gallery/Gallery";
import Services from "../pages/Services/Services";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"         element={<Home />} />
      <Route path="/about"    element={<About />} />
      <Route path="/contact"  element={<Contact />} />
      <Route path="/gallery"  element={<Gallery />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  );
}