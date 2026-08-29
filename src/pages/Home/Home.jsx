import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import GalleryGrid from "../../components/GalleryGrid/GalleryGrid";
import Weddings from "../../components/Weddings/Weddings";
import Guides from "../../components/Guides/Guides";
import Pricing from "../../components/Pricing/Pricing";
import Couples from "../../components/Couples/Couples";
import {
  getWebsiteImagesBySection,
  buildResponsiveImageUrl,
  buildSrcSet,
} from "../../services/mediaService";
import "./Home.css";

export default function Home() {
  const refs = useRef([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    refs.current.forEach((r) => r && observer.observe(r));
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

  const heyImageUrl = images.heyImage?.imageUrl
    ? buildResponsiveImageUrl(images.heyImage.imageUrl, { width: 700 })
    : null;
  const cameraImageUrl = images.cameraImage?.imageUrl
    ? buildResponsiveImageUrl(images.cameraImage.imageUrl, { width: 700 })
    : null;

  return (
    <main className="home">

      {/* 1. HERO — fullscreen slider */}
      <Hero />

      {/* 2. REIMAGINE — big text intro */}
      <section className="home__reimagine" id="reimagine">
        <div className="home__reimagine-inner fade-up" ref={(el) => (refs.current[0] = el)}>
          <span className="section-kicker">reimagine</span>
          <h1 className="home__reimagine-title">
            your <em>wedding</em>
          </h1>
          <p className="home__reimagine-desc">
            You deserve the wildly unforgettable, meaningful, love-filled
            wedding of your dreams. I'm here to help make that happen — in
            Karnataka and across the world.
          </p>
          <Link to="/services" className="btn btn--outline">
            Experience →
          </Link>
        </div>
      </section>

      {/* 3. HEY YOU — photographer intro split */}
      <section className="home__hey" id="intro">
        <div className="home__hey-image slide-left" ref={(el) => (refs.current[1] = el)}>
          {heyImageUrl && (
            <img
              src={heyImageUrl}
              srcSet={buildSrcSet(images.heyImage.imageUrl, [400, 700, 1000])}
              sizes="(max-width: 900px) 90vw, 500px"
              alt={images.heyImage.altText || "Bhavana — wedding photographer"}
            />
          )}
        </div>
        <div className="home__hey-text slide-right" ref={(el) => (refs.current[2] = el)}>
          <span className="section-kicker">Hey you beautiful human!</span>
          <p className="home__hey-desc">
            If you're looking for something a little off the beaten path,
            you're in the right place. I'm Bhavana — a Karnataka-based
            wedding and elopement photographer who loves chasing golden hour,
            filter coffee, and couples who aren't afraid to be themselves.
            Let's create something beautiful, and uniquely yours.
          </p>
          <Link to="/about" className="btn btn--text">
            Get to Know Me
          </Link>
        </div>
      </section>

      {/* 4. FEATURED POSTS — 3 card gallery grid */}
      <GalleryGrid />

      {/* 5. GIRL BEHIND THE CAMERA — about teaser */}
      <section className="home__camera" id="about-teaser">
        <div className="home__camera-text slide-left" ref={(el) => (refs.current[3] = el)}>
          <span className="section-kicker">the camera</span>
          <h2 className="home__camera-title">
            The girl<br /><em>behind</em>
          </h2>
          <p className="home__camera-desc">
            Karnataka-based elopement and intimate wedding photographer
            capturing love stories across India and beyond. Can usually be
            found chasing golden hour, sipping filter coffee, or planning
            the next adventure shoot. I love photographing couples I adore in
            meaningful places — wherever that may be.
          </p>
          <Link to="/about" className="btn btn--text">
            Get To Know Me →
          </Link>
        </div>
        <div className="home__camera-image slide-right" ref={(el) => (refs.current[4] = el)}>
          {cameraImageUrl && (
            <img
              src={cameraImageUrl}
              srcSet={buildSrcSet(images.cameraImage.imageUrl, [400, 700, 1000])}
              sizes="(max-width: 900px) 90vw, 500px"
              alt={images.cameraImage.altText || "Bhavana — photographer"}
            />
          )}
        </div>
      </section>

      {/* 6. WEDDINGS + COUPLES — two panel split */}
      <Weddings />

      {/* 7. WEDDING GUIDES — full width banner */}
      <Guides />

      {/* 8. TESTIMONIAL + BLOG + CTA + INSTAGRAM */}
      <Couples />

    </main>
  );
}
