import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Weddings.css";

export default function Weddings() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="weddings" id="weddings">
      {/* WEDDINGS */}
      <div className="weddings__panel fade-in" ref={leftRef}>
        <img src="/images/weddings-cover.jpg" alt="Wedding photography" />
        <div className="weddings__panel-overlay" />
        <div className="weddings__panel-text">
          <span className="weddings__panel-kicker">Portfolio</span>
          <h2 className="weddings__panel-title">Weddings</h2>
          <p className="weddings__panel-sub">
            Intimate ceremonies &amp; adventurous elopements
          </p>
          <Link to="/gallery?type=weddings" className="btn btn--outline-white">
            View Gallery
          </Link>
        </div>
      </div>

      {/* COUPLES */}
      <div className="weddings__panel fade-in delay-2" ref={rightRef}>
        <img src="/images/couples-cover.jpg" alt="Couples photography" />
        <div className="weddings__panel-overlay" />
        <div className="weddings__panel-text">
          <span className="weddings__panel-kicker">Portfolio</span>
          <h2 className="weddings__panel-title">Couples</h2>
          <p className="weddings__panel-sub">
            Engagements &amp; adventurous sessions
          </p>
          <Link to="/gallery?type=couples" className="btn btn--outline-white">
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
