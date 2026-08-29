import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { buildResponsiveImageUrl, buildSrcSet } from "../../services/mediaService";
import { getPostsBySection } from "../../services/postsService";
import "./GalleryGrid.css";

export default function GalleryGrid() {
  const fadeRefs = useRef([]);
  const trackRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fade-up on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    fadeRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    getPostsBySection("home_featured")
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

  const scrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector(".gallery-grid__card");
    const step = firstCard ? firstCard.offsetWidth + 28 /* matches .gallery-grid__track gap */ : track.clientWidth * 0.8;
    track.scrollBy({ left: step, behavior: "smooth" });
  };

  // Optional section: while loading, or once loaded with nothing to show,
  // render nothing at all rather than an empty header or a placeholder
  // banner — this is a homepage teaser, not a dedicated page, so it
  // shouldn't announce itself until there's real content.
  if (loading || posts.length === 0) {
    return null;
  }

  return (
    <section className="gallery-grid" id="featured">
      <div className="gallery-grid__header fade-up" ref={(el) => (fadeRefs.current[0] = el)}>
        <span className="section-kicker">featured</span>
        <h2 className="gallery-grid__title">Posts</h2>
      </div>

      <div className="gallery-grid__scroll-row">
        <div className="gallery-grid__track" ref={trackRef}>
          {posts.map((post, i) => (
            <Link
              to={`/gallery/${post.id}`}
              key={post.id}
              className="gallery-grid__card fade-up"
              ref={(el) => (fadeRefs.current[i + 1] = el)}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="gallery-grid__img-wrap">
                <img
                  src={buildResponsiveImageUrl(post.imageUrl, { width: 500 })}
                  srcSet={buildSrcSet(post.imageUrl, [320, 500, 720])}
                  sizes="(max-width: 900px) 80vw, 380px"
                  alt={post.title}
                />
              </div>
              <div className="gallery-grid__caption">
                {post.location && <p className="gallery-grid__location">{post.location}</p>}
                <p className="gallery-grid__names">{post.title}</p>
                <span className="gallery-grid__view">View Post →</span>
              </div>
            </Link>
          ))}
        </div>

        {posts.length > 1 && (
          <button
            type="button"
            className="gallery-grid__next"
            onClick={scrollNext}
            aria-label="Show next posts"
          >
            →
          </button>
        )}
      </div>
    </section>
  );
}
