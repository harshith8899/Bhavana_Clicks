import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import "./styles/global.css";
import "./styles/animations.css";

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [footerNode, setFooterNode] = useState(null);
  const [footerHeight, setFooterHeight] = useState(0);

  // A callback ref (rather than useRef + a mount-only effect) so the
  // observer re-attaches every time <Footer> itself mounts/unmounts — which
  // happens on every transition between admin and public routes, since
  // admin routes don't render the public Footer at all. A mount-only effect
  // would only ever see whatever the footer node was on App's very first
  // render, and silently stop working for the rest of the session if that
  // first render happened to be on an admin route.
  const footerRef = useCallback((node) => {
    setFooterNode(node);
  }, []);

  useEffect(() => {
    if (!footerNode) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });

    observer.observe(footerNode);
    return () => observer.disconnect();
  }, [footerNode]);

  // Admin pages have their own self-contained layout (AdminLayout) and must
  // not inherit the public marketing Navbar/Footer chrome.
  if (isAdminRoute) {
    return <AppRoutes />;
  }

  return (
    <div style={{ margin: 0, padding: 0, width: "100%", overflowX: "hidden" }}>

      {/* Solid content layer — scrolls normally and covers the footer */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "#f7f4ed", // 👈 match your site's actual page background
        }}
      >
        <Navbar />
        <AppRoutes />
      </div>

      {/* Transparent spacer — reveals the fixed footer underneath as you scroll through it */}
      <div style={{ height: footerHeight }} aria-hidden="true" />

      <Footer ref={footerRef} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <AppShell />
      </AdminAuthProvider>
    </BrowserRouter>
  );
}