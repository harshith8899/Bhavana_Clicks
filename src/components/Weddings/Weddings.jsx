import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getWebsiteImagesBySection,
  buildResponsiveImageUrl,
  buildSrcSet,
} from "../../services/mediaService";
import { getPostsBySection } from "../../services/postsService";
import "./Weddings.css";

export default function WeddingsPage() {
  const [active, setActive] = useState("All");
  const [images, setImages] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getWebsiteImagesBySection("weddings").then((map) => {
      if (!cancelled) setImages(map);
    });
    getPostsBySection("weddings")
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
    <main className="wp">

      {/* HERO */}
      <div className="wp__hero">
        {heroUrl && (
          <img
            src={heroUrl}
            srcSet={buildSrcSet(heroEntry.imageUrl, [640, 1024, 1600, 1920])}
            sizes="100vw"
            alt={heroEntry.altText || "Weddings"}
          />
        )}
        <div className="wp__hero-overlay" />
        <div className="wp__hero-text">
          <p className="wp__hero-kicker">Portfolio</p>
          <h1 className="wp__hero-title">Weddings</h1>
        </div>
      </div>

      {/* FILTERS */}
      {categories.length > 1 && (
        <div className="wp__filters">
          {categories.map(f => (
            <button
              key={f}
              className={`wp__filter ${active === f ? "active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* GRID */}
      {!loading && posts.length === 0 && (
        <p className="wp__empty">More wedding stories coming soon.</p>
      )}

      {filtered.length > 0 && (
        <div className="wp__grid">
          {filtered.map(post => (
            <Link key={post.id} to={`/weddings/${post.id}`} className="wp__card">
              <div className="wp__card-img">
                <img
                  src={buildResponsiveImageUrl(post.imageUrl, { width: 500 })}
                  srcSet={buildSrcSet(post.imageUrl, [320, 500, 720])}
                  sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 33vw"
                  alt={post.title}
                />
              </div>
              <p className="wp__card-cat">{post.category}</p>
              <h2 className="wp__card-title">{post.location ? `${post.location} | ${post.title}` : post.title}</h2>
              <span className="wp__card-link">Continue</span>
            </Link>
          ))}
        </div>
      )}

    </main>
  );
}
