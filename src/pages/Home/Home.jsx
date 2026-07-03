import { Link } from "react-router-dom";
import "./Home.css";

const PORTFOLIO_WEDDINGS = [
  { id: 1, title: "Coorg Forest Wedding", subtitle: "Karnataka, India" },
  { id: 2, title: "Goa Beach Elopement", subtitle: "Goa, India" },
  { id: 3, title: "Himalayan Mountain Vows", subtitle: "Himachal Pradesh" },
];

const PORTFOLIO_COUPLES = [
  { id: 1, title: "Sunset Engagement", subtitle: "Nandi Hills" },
  { id: 2, title: "Backwater Romance", subtitle: "Kerala" },
  { id: 3, title: "City Lights Session", subtitle: "Bengaluru" },
];

const FEATURED_POSTS = [
  {
    id: 1,
    label: "Coorg Forest Elopement",
    names: "Meera & Arjun",
    href: "#",
  },
  {
    id: 2,
    label: "Goa Sunset Wedding",
    names: "Diya & Karthik",
    href: "#",
  },
];

export default function Home() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__eyebrow">
            Intimate weddings
            <br />
            and elopements
            <br />
            in Karnataka and worldwide
          </p>
        </div>
        <div className="hero__bottom">
          <span className="hero__scroll" onClick={() => scrollTo("intro")}>
            Scroll
          </span>
        </div>
      </section>

      {/* REIMAGINE INTRO */}
      <section className="intro" id="intro">
        <p className="intro__kicker">reimagine</p>
        <h1 className="intro__title">
          your <em>wedding</em>
        </h1>
        <p className="intro__desc">
          You deserve the wildly unforgettable, meaningful, love-filled
          wedding of your dreams. I'm here to help make that happen.
        </p>
        <button className="btn btn--outline" onClick={() => scrollTo("pricing")}>
          Experience →
        </button>
      </section>

      {/* HEY YOU BEAUTIFUL HUMAN */}
      <section className="welcome">
        <div className="welcome__image" aria-hidden="true">
          <span>📷</span>
        </div>
        <div className="welcome__text">
          <p className="welcome__kicker">Hey you beautiful human!</p>
          <p className="welcome__desc">
            If you're looking for something a little off the beaten path,
            you're in the right place. Let's create something beautiful, and
            uniquely yours.
          </p>
        </div>
      </section>

      {/* FEATURED POSTS */}
      <section className="featured">
        <p className="featured__kicker">featured</p>
        <h2 className="featured__title">posts</h2>
        <div className="featured__grid">
          {FEATURED_POSTS.map((post) => (
            <a className="featured__card" href={post.href} key={post.id}>
              <div className="featured__image" aria-hidden="true">
                <span>🌿</span>
              </div>
              <div className="featured__caption">
                <p className="featured__label">{post.label}</p>
                <p className="featured__names">{post.names}</p>
                <span className="featured__link">View post</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ABOUT — THE GIRL/PERSON BEHIND THE CAMERA */}
      <section className="about" id="about">
        <div className="about__image" aria-hidden="true">
          <span>👤</span>
        </div>
        <div className="about__text">
          <p className="about__kicker">the camera</p>
          <h2 className="about__title">behind</h2>
          <p className="about__desc">
            Karnataka-based elopement and intimate wedding photographer
            capturing love stories across India and beyond. Can usually be
            found chasing golden hour, sipping filter coffee, or planning the
            next adventure shoot. I love photographing couples I adore in
            meaningful places — wherever that may be. Let's hang!
          </p>
          <Link to="/about" className="btn btn--text">
            Get to know me
          </Link>
        </div>
      </section>

      {/* PORTFOLIO — WEDDINGS */}
      <section className="portfolio" id="weddings">
        <div className="portfolio__header">
          <p className="portfolio__kicker">weddings</p>
          <h2 className="portfolio__title">
            Intimate weddings &amp; adventurous elopements
          </h2>
        </div>
        <div className="portfolio__grid">
          {PORTFOLIO_WEDDINGS.map((item) => (
            <div className="portfolio__card" key={item.id}>
              <div className="portfolio__image" aria-hidden="true">
                <span>💍</span>
              </div>
              <p className="portfolio__caption">{item.title}</p>
              <p className="portfolio__location">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO — COUPLES */}
      <section className="portfolio portfolio--alt" id="couples">
        <div className="portfolio__header">
          <p className="portfolio__kicker">couples</p>
          <h2 className="portfolio__title">
            Engagements &amp; adventurous sessions
          </h2>
        </div>
        <div className="portfolio__grid">
          {PORTFOLIO_COUPLES.map((item) => (
            <div className="portfolio__card" key={item.id}>
              <div className="portfolio__image" aria-hidden="true">
                <span>❤️</span>
              </div>
              <p className="portfolio__caption">{item.title}</p>
              <p className="portfolio__location">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="pricing" id="pricing">
        <p className="pricing__kicker">need help planning your big day?</p>
        <h2 className="pricing__title">Investment &amp; pricing guides</h2>
        <div className="pricing__grid">
          <div className="pricing__card">
            <h3>Elopement</h3>
            <p className="pricing__price">₹35,000</p>
            <p className="pricing__desc">2–4 hours, one location, full gallery</p>
          </div>
          <div className="pricing__card pricing__card--featured">
            <h3>Intimate wedding</h3>
            <p className="pricing__price">₹75,000</p>
            <p className="pricing__desc">Full day, two locations, album included</p>
          </div>
          <div className="pricing__card">
            <h3>Destination</h3>
            <p className="pricing__price">Custom</p>
            <p className="pricing__desc">Multi-day coverage, travel included</p>
          </div>
        </div>
      </section>

      {/* WEDDING GUIDES */}
      <section className="guides" id="guides">
        <div className="guides__image" aria-hidden="true">
          <span>🗺️</span>
        </div>
        <div className="guides__text">
          <p className="guides__kicker">wedding guides</p>
          <h2 className="guides__title">Need help planning your big day?</h2>
          <p className="guides__desc">
            From hidden elopement spots in Coorg to permits for shooting on
            Goa's beaches — explore our free guides to plan a day that's
            entirely, beautifully yours.
          </p>
          <button className="btn btn--outline">Read the guides →</button>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial">
        <p className="testimonial__kicker">kind words</p>
        <p className="testimonial__quote">
          "Amazing! Seriously, speechlessly stunning. It's rare to find a
          photographer that sends you final photos where you love and are
          impressed with every single one of them. Even a year later I still
          look at mine in complete awe of how they turned out."
        </p>
        <p className="testimonial__author">— Meera &amp; Arjun</p>
        <button className="btn btn--text">Read more</button>
      </section>

      {/* BLOG FEATURE */}
      <section className="blog">
        <div className="blog__image" aria-hidden="true">
          <span>⛰️</span>
        </div>
        <div className="blog__text">
          <p className="blog__kicker">on the blog</p>
          <h2 className="blog__title">An epic elopement in the Himalayas</h2>
          <p className="blog__desc">
            "We trekked through the morning mist to a quiet ridge overlooking
            the valley below. The clouds parted just as they exchanged vows —
            it was pure magic."
          </p>
          <button className="btn btn--text">Read more →</button>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta" id="contact">
        <div className="cta__overlay" />
        <p className="cta__kicker">alrighty then</p>
        <h2 className="cta__title">
          Ready to make your dream
          <br />
          wedding a reality?
        </h2>
        <p className="cta__desc">
          Head on over to my contact page to shoot me a message and let's
          make this thing happen!
        </p>
        <button className="btn btn--solid">Let's get married</button>
      </section>

      {/* INSTAGRAM STRIP */}
      <section className="instagram">
        <p className="instagram__title">
          Follow along on Instagram{" "}
          <a href="#" className="instagram__handle">
            @bhavana.clicks
          </a>
        </p>
        <div className="instagram__grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="instagram__item" key={i} aria-hidden="true">
              <span>📸</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p className="footer__tagline">
          Inclusive &amp; welcoming to all couples, all backgrounds, all love
          stories.
        </p>
        <p className="footer__name">
          Bhavana Clicks | Intimate Wedding &amp; Elopement Photography
        </p>
        <div className="footer__links">
          <a href="#contact">Contact me</a>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Pinterest</a>
        </div>
        <p className="footer__copyright">© 2026 Bhavana Clicks</p>
      </footer>
    </main>
  );
}
