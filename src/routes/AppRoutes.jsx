import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";

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

export default App;