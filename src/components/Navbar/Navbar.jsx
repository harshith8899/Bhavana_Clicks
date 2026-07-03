import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">

        {/* LEFT LINKS */}
        <div className="navbar__side navbar__side--left">
          <div className="navbar__group">
            <span className="navbar__link">Portfolio</span>
            <div className="navbar__dropdown">
              <Link to="/gallery?type=weddings" onClick={() => setMenuOpen(false)}>Weddings</Link>
              <Link to="/gallery?type=couples" onClick={() => setMenuOpen(false)}>Couples</Link>
            </div>
          </div>
          <div className="navbar__group">
            <span className="navbar__link">Info</span>
            <div className="navbar__dropdown">
              <Link to="/services" onClick={() => setMenuOpen(false)}>Pricing</Link>
              <Link to="/services#guides" onClick={() => setMenuOpen(false)}>Wedding Guides</Link>
            </div>
          </div>
        </div>

        {/* CENTER LOGO */}
        <Link to="/" className="navbar__logo">
          Bhavana <em>Clicks</em>
        </Link>

        {/* RIGHT LINKS */}
        <div className="navbar__side navbar__side--right">
          <Link to="/about" className="navbar__link">About Me</Link>
          <Link to="/contact" className="navbar__link">Contact</Link>
        </div>

        {/* MOBILE BURGER */}
        <button
          className={`navbar__burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* MOBILE MENU */}
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
