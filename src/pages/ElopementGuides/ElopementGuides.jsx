import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getWebsiteImagesBySection,
  buildResponsiveImageUrl,
  buildSrcSet,
} from "../../services/mediaService";
import { getPostsBySection } from "../../services/postsService";
import "./ElopementGuides.css";

export default function ElopementGuidesPage() {
  const [active, setActive] = useState("All");
  const [images, setImages] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getWebsiteImagesBySection("guides").then((map) => {
      if (!cancelled) setImages(map);
    });
    getPostsBySection("guides")
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = ["All", ...new Set(posts.map((p) => p.category).filter(Boolean))];
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  const heroEntry = images.hero;
  const heroUrl = heroEntry?.imageUrl ? buildResponsiveImageUrl(heroEntry.imageUrl, { width: 1920 }) : null;

  return (
    <main className="eg">
      <div className="eg__hero">
        {heroUrl && (
          <img
            src={heroUrl}
            srcSet={buildSrcSet(heroEntry.imageUrl, [640, 1024, 1600, 1920])}
            sizes="100vw"
            alt={heroEntry.altText || "Elopement Guides"}
          />
        )}
        <div className="eg__hero-overlay" />
        <div className="eg__hero-text">
          <p className="eg__hero-kicker">Info</p>
          <h1 className="eg__hero-title">Elopement Guides</h1>
        </div>
      </div>

      {categories.length > 1 && (
        <div className="eg__filters">
          <p className="eg__filters-label">Categories</p>
          <div className="eg__filters-tabs">
            {categories.map((filter) => (
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
      )}

      {!loading && posts.length === 0 && (
        <p className="eg__empty">More guides coming soon.</p>
      )}

      {filtered.length > 0 && (
        <div className="eg__grid">
          {filtered.map((guide) => (
            <Link key={guide.id} to={`/guides/${guide.id}`} className="eg__card">
              <div className="eg__card-img">
                <img
                  src={buildResponsiveImageUrl(guide.imageUrl, { width: 500 })}
                  srcSet={buildSrcSet(guide.imageUrl, [320, 500, 720])}
                  sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 33vw"
                  alt={guide.title}
                />
              </div>
              <p className="eg__card-cat">{guide.category}</p>
              <h2 className="eg__card-title">{guide.title}</h2>
              <span className="eg__card-link">Continue</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
