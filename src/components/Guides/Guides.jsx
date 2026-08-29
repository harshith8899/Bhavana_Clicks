import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  getWebsiteImagesBySection,
  buildResponsiveImageUrl,
  buildSrcSet,
} from "../../services/mediaService";
import "./Guides.css";

export default function Guides() {
  const ref = useRef(null);
  const [images, setImages] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    getWebsiteImagesBySection("home").then((map) => {
      if (!cancelled) setImages(map);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const bgEntry = images.guidesBanner;
  const bgUrl = bgEntry?.imageUrl ? buildResponsiveImageUrl(bgEntry.imageUrl, { width: 1600 }) : null;

  return (
    <section className="guides" id="guides">
      {bgUrl && (
        <img
          src={bgUrl}
          srcSet={buildSrcSet(bgEntry.imageUrl, [640, 1024, 1600, 1920])}
          sizes="100vw"
          alt={bgEntry.altText || "Wedding planning guides"}
          className="guides__bg"
        />
      )}
      <div className="guides__overlay" />
      <div className="guides__content fade-up" ref={ref}>
        <span className="guides__kicker">Wedding Guides</span>
        <h2 className="guides__title">
          Need help planning
          <br />
          your big day?
        </h2>
        <p className="guides__desc">
          From hidden elopement spots in Coorg to permits for shooting on
          Goa's beaches — explore our free guides to plan a day that's
          entirely, beautifully yours.
        </p>
        <Link to="/services#guides" className="btn btn--outline-white">
          Read the Guides
        </Link>
      </div>
    </section>
  );
}
