import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getWebsiteImagesBySection,
  buildResponsiveImageUrl,
  buildSrcSet,
} from "../../services/mediaService";
import { getPostsBySection } from "../../services/postsService";
import "./Couples.css";

export default function Couples() {
  const [active, setActive] = useState("All");
  const [images, setImages] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getWebsiteImagesBySection("couples").then((map) => {
      if (!cancelled) setImages(map);
    });
    getPostsBySection("couples")
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
    <main className="cp">

      {/* HERO */}
      <div className="cp__hero">
        {heroUrl && (
          <img
            src={heroUrl}
            srcSet={buildSrcSet(heroEntry.imageUrl, [640, 1024, 1600, 1920])}
            sizes="100vw"
            alt={heroEntry.altText || "Couples"}
          />
        )}
        <div className="cp__hero-overlay" />
        <div className="cp__hero-text">
          <p className="cp__hero-kicker">Portfolio</p>
          <h1 className="cp__hero-title">Couples</h1>
        </div>
      </div>

      {/* FILTERS */}
      {categories.length > 1 && (
        <div className="cp__filters">
          {categories.map(f => (
            <button
              key={f}
              className={`cp__filter ${active === f ? "active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* GRID */}
      {!loading && posts.length === 0 && (
        <p className="cp__empty">More couples sessions coming soon.</p>
      )}

      {filtered.length > 0 && (
        <div className="cp__grid">
          {filtered.map(post => (
            <Link key={post.id} to={`/couples/${post.id}`} className="cp__card">
              <div className="cp__card-img">
                <img
                  src={buildResponsiveImageUrl(post.imageUrl, { width: 500 })}
                  srcSet={buildSrcSet(post.imageUrl, [320, 500, 720])}
                  sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 33vw"
                  alt={post.title}
                />
              </div>
              <p className="cp__card-cat">{post.category}</p>
              <h2 className="cp__card-title">{post.location ? `${post.location} | ${post.title}` : post.title}</h2>
              <span className="cp__card-link">Continue</span>
            </Link>
          ))}
        </div>
      )}

    </main>
  );
}
