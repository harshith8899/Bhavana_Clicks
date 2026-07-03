import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Couples.css";

export default function Couples() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    refs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* TESTIMONIAL */}
      <section className="testimonial">
        <div
          className="testimonial__inner fade-up"
          ref={(el) => (refs.current[0] = el)}
        >
          <span className="section-kicker">Kind Words</span>
          <blockquote className="testimonial__quote">
            "Amazing! Seriously, speechlessly stunning. It's rare to find a
            photographer where you love every single photo. Even a year later
            I still look at mine in complete awe of how they turned out."
          </blockquote>
          <p className="testimonial__author">— Meera &amp; Arjun, Coorg</p>
          <Link to="/about#testimonials" className="btn btn--text">
            Read More
          </Link>
        </div>
      </section>

      {/* BLOG FEATURE */}
      <section className="blog-feature">
        <div
          className="blog-feature__image slide-left"
          ref={(el) => (refs.current[1] = el)}
        >
          <img src="/images/blog-feature.jpg" alt="Himalayan elopement blog post" />
        </div>
        <div
          className="blog-feature__text slide-right"
          ref={(el) => (refs.current[2] = el)}
        >
          <span className="section-kicker">On the Blog</span>
          <h2 className="blog-feature__title">
            An epic elopement in the Himalayas
          </h2>
          <p className="blog-feature__quote">
            "We trekked through the morning mist to a quiet ridge overlooking
            the valley below. The clouds parted just as they exchanged vows —
            it was pure magic."
          </p>
          <Link to="/gallery" className="btn btn--text">
            Read More →
          </Link>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner" id="cta">
        <img src="/images/cta-bg.jpg" alt="Ready to book" className="cta-banner__bg" />
        <div className="cta-banner__overlay" />
        <div
          className="cta-banner__content fade-up"
          ref={(el) => (refs.current[3] = el)}
        >
          <span className="cta-banner__kicker">alrighty then</span>
          <h2 className="cta-banner__title">
            Ready to make your dream
            <br />
            wedding a reality?
          </h2>
          <p className="cta-banner__sub">
            Head on over to my contact page and let's make this thing happen!
          </p>
          <Link to="/contact" className="btn btn--solid-white">
            Let's Get Started
          </Link>
        </div>
      </section>

      {/* INSTAGRAM STRIP */}
      <section className="instagram">
        <div
          className="instagram__header fade-up"
          ref={(el) => (refs.current[4] = el)}
        >
          <p className="instagram__title">
            Follow me on Instagram{" "}
            <a
              href="https://instagram.com/bhavana.clicks"
              target="_blank"
              rel="noreferrer"
              className="instagram__handle"
            >
              @bhavana.clicks
            </a>
          </p>
        </div>
        <div className="instagram__grid">
          {/* Replace src with real instagram image URLs */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <a
              key={i}
              href="https://instagram.com/bhavana.clicks"
              target="_blank"
              rel="noreferrer"
              className="instagram__item"
            >
              <img src={`/images/insta-${i}.jpg`} alt={`Instagram post ${i}`} />
              <div className="instagram__hover" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
