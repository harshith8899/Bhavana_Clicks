import { useState, useEffect } from "react";
import "./Hero.css";

const COLLAGE = [
  { id: 1, src: "/images/collage-1.jpg", alt: "Wedding couple" },
  { id: 2, src: "/images/collage-2.jpg", alt: "Bridal details" },
  { id: 3, src: "/images/collage-3.jpg", alt: "Couple portrait" },
];

export default function Hero() {
  const scrollDown = () => {
    document.getElementById("reimagine")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* FULLSCREEN HERO */}
      <section className="hero" id="hero">
        <div className="hero__bg" />
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
        {COLLAGE.map((p) => (
          <div key={p.id} className="collage__item">
            <img src={p.src} alt={p.alt} />
          </div>
        ))}
      </div>
    </>
  );
}