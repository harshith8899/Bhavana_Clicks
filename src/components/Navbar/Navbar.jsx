import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <div className="navbar__links navbar__links--left">
          <div className="navbar__group">
            <span className="navbar__link">Portfolio</span>
            <div className="navbar__dropdown">
              <span onClick={() => scrollTo("weddings")}>Weddings</span>
              <span onClick={() => scrollTo("couples")}>Couples</span>
            </div>
          </div>
          <div className="navbar__group">
            <span className="navbar__link">Info</span>
            <div className="navbar__dropdown">
              <span onClick={() => scrollTo("pricing")}>Pricing</span>
              <span onClick={() => scrollTo("guides")}>Wedding guides</span>
            </div>
          </div>
        </div>

        <div className="navbar__logo" onClick={() => scrollTo("hero")}>
          Bhavana <em>Clicks</em>
        </div>

        <div className="navbar__links navbar__links--right">
          <Link to="/about" className="navbar__link">About me</Link>
          <span className="navbar__link" onClick={() => scrollTo("contact")}>Contact</span>
        </div>

        <button
          className="navbar__burger"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="navbar__mobile">
          <span onClick={() => goTo("/gallery?type=weddings")}>Weddings</span>
          <span onClick={() => goTo("/gallery?type=couples")}>Couples</span>
          <span onClick={() => goTo("/services")}>Pricing</span>
          <span onClick={() => goTo("/services#guides")}>Wedding Guides</span>
          <span onClick={() => goTo("/about")}>About Me</span>
          <span onClick={() => goTo("/contact")}>Contact</span>
        </div>
      )}
    </nav>
  );
}
