import { useEffect, useState } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import {
  getWebsiteImagesBySection,
  buildResponsiveImageUrl,
  buildSrcSet,
} from "../../services/mediaService";
import "./Contact.css";

export default function Contact() {
  const [images, setImages] = useState({});

  useEffect(() => {
    let cancelled = false;
    getWebsiteImagesBySection("contact").then((map) => {
      if (!cancelled) setImages(map);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const heroEntry = images.hero;
  const heroUrl = heroEntry?.imageUrl ? buildResponsiveImageUrl(heroEntry.imageUrl, { width: 1920 }) : null;

  return (
    <main className="contact-page">
      <div className="contact-page__hero">
        {heroUrl && (
          <img
            src={heroUrl}
            srcSet={buildSrcSet(heroEntry.imageUrl, [640, 1024, 1600, 1920])}
            sizes="100vw"
            alt={heroEntry.altText || "Contact Bhavana Clicks"}
          />
        )}
        <div className="contact-page__hero-overlay" />
        <div className="contact-page__hero-text">
          <span>Let's Connect</span>
          <h1>Get In Touch</h1>
        </div>
      </div>

      <div className="contact-page__body">
        <div className="contact-page__intro">
          <p className="section-kicker">Say Hello</p>
          <h2 className="contact-page__title">
            Let's make something <em>beautiful</em>
          </h2>
          <p className="contact-page__desc">
            Tell me about your day, your vision, and your love story. I'd
            love to hear from you and can't wait to chat about how we can
            create something magical together.
          </p>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
