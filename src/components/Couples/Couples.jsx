import { useState } from "react";
import { Link } from "react-router-dom";
import "./Couples.css";

const POSTS = [
  { id: 1, image: "/images/couples/c1.jpg", category: "Couples", title: "Wildflower Session | Lara & Scottie" },
  { id: 2, image: "/images/couples/c2.jpg", category: "Couples", title: "Nandi Hills Engagement | Ash & Alex" },
  { id: 3, image: "/images/couples/c3.jpg", category: "Couples", title: "Adventurous Couples Shoot | Al & Ben" },
  { id: 4, image: "/images/couples/c4.jpg", category: "Couples", title: "Coorg Session | Mollie & Drew" },
  { id: 5, image: "/images/couples/c5.jpg", category: "Couples", title: "Sunrise Engagement | Emily & Dylan" },
  { id: 6, image: "/images/couples/c6.jpg", category: "Couples", title: "Kerala Session | Karen & Ben" },
];

const FILTERS = ["All", "Couples"];

export default function Couples() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? POSTS : POSTS.filter(p => p.category === active);

  return (
    <main className="cp">

      {/* HERO */}
      <div className="cp__hero">
        <img src="/images/couples-hero.jpg" alt="Couples" />
        <div className="cp__hero-overlay" />
        <div className="cp__hero-text">
          <p className="cp__hero-kicker">Portfolio</p>
          <h1 className="cp__hero-title">Couples</h1>
        </div>
      </div>

      {/* FILTERS */}
      <div className="cp__filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`cp__filter ${active === f ? "active" : ""}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="cp__grid">
        {filtered.map(post => (
          <Link key={post.id} to={`/couples/${post.id}`} className="cp__card">
            <div className="cp__card-img">
              <img src={post.image} alt={post.title} />
            </div>
            <p className="cp__card-cat">{post.category}</p>
            <h2 className="cp__card-title">{post.title}</h2>
            <span className="cp__card-link">Continue</span>
          </Link>
        ))}
      </div>

    </main>
  );
}