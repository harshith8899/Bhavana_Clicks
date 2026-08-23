import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import { getEnquiries } from "../../../services/enquiryService";
import "./AdminDashboard.css";

const COMING_SOON_SECTIONS = [
  { title: "Website Content", desc: "Manage text and images shown across the public website." },
  { title: "Gallery", desc: "Manage the photography portfolio and categories." },
];

export default function AdminDashboard() {
  const { user } = useAdminAuth();
  const [newCount, setNewCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getEnquiries()
      .then((enquiries) => {
        if (cancelled) return;
        setNewCount(enquiries.filter((e) => e.status === "new").length);
      })
      .catch((err) => {
        console.error("Failed to load enquiry count:", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="admin-dashboard">
      <span className="section-kicker">admin</span>
      <h1 className="admin-dashboard__title">
        Welcome back{user?.email ? `, ${user.email}` : ""}.
      </h1>

      <div className="admin-dashboard__grid">
        <Link to="/admin/enquiries" className="admin-dashboard__card admin-dashboard__card--link">
          <h2>Enquiries</h2>
          <p>Review enquiries submitted through the contact form.</p>
          <span className="admin-dashboard__count">
            {newCount === null ? "…" : newCount}
          </span>
          <span className="admin-dashboard__count-label">New</span>
        </Link>

        {COMING_SOON_SECTIONS.map((section) => (
          <div key={section.title} className="admin-dashboard__card">
            <h2>{section.title}</h2>
            <p>{section.desc}</p>
            <span className="admin-dashboard__soon">Coming Soon</span>
          </div>
        ))}
      </div>
    </div>
  );
}
