import { useEffect, useState } from "react";
import {
  getWebsiteImagesBySection,
  buildResponsiveImageUrl,
  buildSrcSet,
} from "../../services/mediaService";
import "./Hero.css";

const COLLAGE_POSITIONS = [
  { position: "collage1", alt: "Wedding couple" },
  { position: "collage2", alt: "Bridal details" },
  { position: "collage3", alt: "Couple portrait" },
];

export default function Hero() {
  const [images, setImages] = useState({});

  useEffect(() => {
    let cancelled = false;
    getWebsiteImagesBySection("home").then((map) => {
      if (!cancelled) setImages(map);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollDown = () => {
    document.getElementById("reimagine")?.scrollIntoView({ behavior: "smooth" });
  };

  const heroUrl = images.hero?.imageUrl
    ? buildResponsiveImageUrl(images.hero.imageUrl, { width: 1920, crop: "fill", gravity: "auto" })
    : null;

  return (
    <>
      {/* FULLSCREEN HERO */}
      <section className="hero" id="hero">
        <div
          className="hero__bg"
          style={heroUrl ? { backgroundImage: `url(${heroUrl})` } : undefined}
        />
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__line">Intimate weddings</p>
          <p className="hero__line">and elopements</p>
          <p className="hero__line">in Karnataka and worldwide</p>
        </div>
        <button className="hero__scroll" onClick={scrollDown}>SCROLL</button>
      </section>

      {/* 3-PHOTO COLLAGE */}
      <div className="collage">
        {COLLAGE_POSITIONS.map(({ position, alt }) => {
          const entry = images[position];
          const src = entry?.imageUrl ? buildResponsiveImageUrl(entry.imageUrl, { width: 640 }) : null;
          return (
            <div key={position} className="collage__item">
              {src && (
                <img
                  src={src}
                  srcSet={buildSrcSet(entry.imageUrl, [320, 480, 640, 960])}
                  sizes="(max-width: 900px) 33vw, 320px"
                  alt={entry.altText || alt}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
