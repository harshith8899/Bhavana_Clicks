import { useState } from "react";
import { Link } from "react-router-dom";
import "./ElopementGuides.css";

const GUIDES = [
  { id: 1, image: "/images/guides/g1.jpg", category: "Elopement Guides", title: "20 Dog Friendly Elopement Locations in India" },
  { id: 2, image: "/images/guides/g2.jpg", category: "Elopement Guides", title: "All About Elopement Permits in India" },
  { id: 3, image: "/images/guides/g3.jpg", category: "Elopement Guides", title: "How to Tell Your Family You're Eloping" },
  { id: 4, image: "/images/guides/g4.jpg", category: "Elopement Guides", title: "The Ultimate Elopement Packing List" },
  { id: 5, image: "/images/guides/g5.jpg", category: "Elopement Guides", title: "The 10 Best Locations to Elope in India" },
  { id: 6, image: "/images/guides/g6.jpg", category: "Elopement Guides", title: "The Ultimate Elopement Checklist" },
  { id: 7, image: "/images/guides/g7.jpg", category: "Elopements / Weddings", title: "Eloping in Coorg? Here's 7 Places to Say I Do!" },
  { id: 8, image: "/images/guides/g8.jpg", category: "Elopements / Weddings", title: "How to Elope in Karnataka" },
  { id: 9, image: "/images/guides/g9.jpg", category: "Couples", title: "6 Tips to Rock Your Engagement Session" },
  { id: 10, image: "/images/guides/g10.jpg", category: "Couples", title: "What to Wear for Your Couples Session" },
];

const FILTERS = ["All", "Elopement Guides", "Elopements / Weddings", "Couples"];

export default function ElopementGuidesPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? GUIDES : GUIDES.filter((guide) => guide.category === active);

  return (
    <main className="eg">
      <div className="eg__hero">
        <img src="/images/guides-hero.jpg" alt="Elopement Guides" />
        <div className="eg__hero-overlay" />
        <div className="eg__hero-text">
          <p className="eg__hero-kicker">Info</p>
          <h1 className="eg__hero-title">Elopement Guides</h1>
        </div>
      </div>

      <div className="eg__filters">
        <p className="eg__filters-label">Categories</p>
        <div className="eg__filters-tabs">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`eg__filter ${active === filter ? "active" : ""}`}
              onClick={() => setActive(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="eg__grid">
        {filtered.map((guide) => (
          <Link key={guide.id} to={`/guides/${guide.id}`} className="eg__card">
            <div className="eg__card-img">
              <img src={guide.image} alt={guide.title} />
            </div>
            <p className="eg__card-cat">{guide.category}</p>
            <h2 className="eg__card-title">{guide.title}</h2>
            <span className="eg__card-link">Continue</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
