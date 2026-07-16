import { useState } from "react";
import { Link } from "react-router-dom";
import "./Weddings.css";

const POSTS = [
  { id: 1, image: "/images/weddings/w1.jpg", category: "Elopements / Weddings", title: "Coorg Forest Elopement | Meera & Arjun" },
  { id: 2, image: "/images/weddings/w2.jpg", category: "Elopements / Weddings", title: "Goa Beach Wedding | Diya & Karthik" },
  { id: 3, image: "/images/weddings/w3.jpg", category: "Elopements / Weddings", title: "Himalayan Vows | Sneha & Vikram" },
  { id: 4, image: "/images/weddings/w4.jpg", category: "Elopements / Weddings", title: "Kerala Backwaters | Priya & Rohan" },
  { id: 5, image: "/images/weddings/w5.jpg", category: "Elopements / Weddings", title: "Nandi Hills Sunrise | Anu & Dev" },
  { id: 6, image: "/images/weddings/w6.jpg", category: "Elopements / Weddings", title: "Mysore Palace Wedding | Kavya & Arun" },
];

const FILTERS = ["All", "Elopements / Weddings"];

export default function WeddingsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? POSTS : POSTS.filter(p => p.category === active);

  return (
    <main className="wp">

      {/* HERO */}
      <div className="wp__hero">
        <img src="/images/weddings-hero.jpg" alt="Weddings" />
        <div className="wp__hero-overlay" />
        <div className="wp__hero-text">
          <p className="wp__hero-kicker">Portfolio</p>
          <h1 className="wp__hero-title">Weddings</h1>
        </div>
      </div>

      {/* FILTERS */}
      <div className="wp__filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`wp__filter ${active === f ? "active" : ""}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="wp__grid">
        {filtered.map(post => (
          <Link key={post.id} to={`/weddings/${post.id}`} className="wp__card">
            <div className="wp__card-img">
              <img src={post.image} alt={post.title} />
            </div>
            <p className="wp__card-cat">{post.category}</p>
            <h2 className="wp__card-title">{post.title}</h2>
            <span className="wp__card-link">Continue</span>
          </Link>
        ))}
      </div>

    </main>
  );
}