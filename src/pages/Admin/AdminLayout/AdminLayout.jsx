import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { logout } from "../../../services/authService";
import "./AdminLayout.css";

export default function AdminLayout() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <div className="admin-nav__logo">
          Bhavana <em>Clicks</em>
          <span className="admin-nav__tag">Admin</span>
        </div>

        <ul className="admin-nav__list">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `admin-nav__link${isActive ? " admin-nav__link--active" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/enquiries"
              className={({ isActive }) =>
                `admin-nav__link${isActive ? " admin-nav__link--active" : ""}`
              }
            >
              Enquiries
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/content"
              className={({ isActive }) =>
                `admin-nav__link${isActive ? " admin-nav__link--active" : ""}`
              }
            >
              Website Content
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/gallery"
              className={({ isActive }) =>
                `admin-nav__link${isActive ? " admin-nav__link--active" : ""}`
              }
            >
              Gallery
            </NavLink>
          </li>
        </ul>

        <Link to="/" className="admin-nav__view-site">
          View Website
        </Link>

        <button
          className="admin-nav__logout"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? "Signing Out..." : "Logout"}
        </button>
      </nav>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
