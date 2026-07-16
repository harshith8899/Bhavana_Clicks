import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import "./styles/global.css";
import "./styles/animations.css";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ margin: 0, padding: 0, width: "100%", overflowX: "hidden" }}>
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}