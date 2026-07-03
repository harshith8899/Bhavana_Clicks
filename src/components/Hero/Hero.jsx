import { useState, useEffect } from "react";
import "./Hero.css";

// Replace these with your actual wedding photos in /public/images/
const SLIDES = [
  { id: 1, src: "/images/hero-1.jpg", alt: "Wedding ceremony in forest" },
  { id: 2, src: "/images/hero-2.jpg", alt: "Couple at sunset" },
  { id: 3, src: "/images/hero-3.jpg", alt: "Bridal portrait" },
  { id: 4, src: "/images/hero-4.jpg", alt: "Reception celebration" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollDown = () => {
    document.getElementById("reimagine")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="hero">
      {/* IMAGE SLIDES */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`hero__slide ${i === current ? "hero__slide--active" : ""}`}
        >
          <img src={slide.src} alt={slide.alt} />
        </div>
      ))}

      {/* DARK OVERLAY */}
      <div className="hero__overlay" />

      {/* TEXT */}
      <div className="hero__content">
        <p className="hero__eyebrow">
          Intimate weddings
          <br />
          and elopements
          <br />
          in Karnataka and worldwide
        </p>
      </div>

      {/* DOTS */}
      <div className="hero__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? "hero__dot--active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* SCROLL CTA */}
      <button className="hero__scroll" onClick={scrollDown}>
        scroll
      </button>
    </section>
  );
}
