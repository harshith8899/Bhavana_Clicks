import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Pricing.css";

const PACKAGES = [
  {
    name: "Elopement",
    price: "₹35,000",
    features: ["2–4 hours coverage", "1 location", "Full edited gallery", "Online delivery"],
  },
  {
    name: "Intimate Wedding",
    price: "₹75,000",
    tag: "Most Popular",
    features: ["Full day coverage", "2 photographers", "300+ edited photos", "Premium album"],
  },
  {
    name: "Destination",
    price: "Custom",
    features: ["Multi-day coverage", "Travel included", "Unlimited photos", "Luxury album & prints"],
  },
];

export default function Pricing() {
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
    <section className="pricing" id="pricing">
      <div className="pricing__header fade-up" ref={(el) => (refs.current[0] = el)}>
        <span className="section-kicker">Investment</span>
        <h2 className="pricing__title">Packages &amp; Pricing</h2>
        <p className="pricing__sub">
          Transparent pricing for every kind of love story
        </p>
      </div>

      <div className="pricing__grid">
        {PACKAGES.map((pkg, i) => (
          <div
            key={pkg.name}
            className={`pricing__card fade-up ${pkg.tag ? "pricing__card--featured" : ""}`}
            ref={(el) => (refs.current[i + 1] = el)}
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            {pkg.tag && <div className="pricing__tag">{pkg.tag}</div>}
            <h3 className="pricing__name">{pkg.name}</h3>
            <p className="pricing__price">{pkg.price}</p>
            <div className="pricing__divider" />
            <ul className="pricing__features">
              {pkg.features.map((f) => (
                <li key={f}><span>✦</span>{f}</li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn--outline">Enquire Now</Link>
          </div>
        ))}
      </div>

      <div className="pricing__footer fade-up" ref={(el) => (refs.current[4] = el)}>
        <p>Need something custom?</p>
        <Link to="/contact" className="btn btn--text">Request a custom quote →</Link>
      </div>
    </section>
  );
}
