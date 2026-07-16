import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./GalleryGrid.css";

// Replace with your real posts
const POSTS = [
  {
    id: 1,
    image: "/images/post-1.jpg",
    location: "Coorg Forest Elopement",
    names: "Meera & Arjun",
    slug: "/gallery/meera-arjun",
  },
  {
    id: 2,
    image: "/images/post-2.jpg",
    location: "Goa Beach Wedding",
    names: "Diya & Karthik",
    slug: "/gallery/diya-karthik",
  },
  {
    id: 3,
    image: "/images/post-3.jpg",
    location: "Nandi Hills Engagement",
    names: "Sneha & Vikram",
    slug: "/gallery/sneha-vikram",
  },
];

export default function GalleryGrid() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    refs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="gallery-grid" id="featured">
      <div className="gallery-grid__header fade-up" ref={(el) => (refs.current[0] = el)}>
        <span className="section-kicker">featured</span>
        <h2 className="gallery-grid__title">Posts</h2>
      </div>

      <div className="gallery-grid__grid">
        {POSTS.map((post, i) => (
          <Link
            to={post.slug}
            key={post.id}
            className="gallery-grid__card fade-up"
            ref={(el) => (refs.current[i + 1] = el)}
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className="gallery-grid__img-wrap">
              <img src={post.image} alt={post.names} />
            </div>
            <div className="gallery-grid__caption">
              <p className="gallery-grid__location">{post.location}</p>
              <p className="gallery-grid__names">{post.names}</p>
              <span className="gallery-grid__view">View Post →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
