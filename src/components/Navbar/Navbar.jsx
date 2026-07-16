import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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

        {/* LEFT SIDE */}
        <ul className="navbar__list navbar__list--left">
          <li className="navbar__item navbar__item--dropdown">
            <span className="navbar__link">PORTFOLIO</span>
            <ul className="navbar__dropdown">
              <li><Link to="/weddings">Weddings</Link></li>
              <li><Link to="/couples">Couples</Link></li>
            </ul>
          </li>
          <li className="navbar__item navbar__item--dropdown">
            <span className="navbar__link">INFO</span>
            <ul className="navbar__dropdown">
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/elopement-guides">Elopement Guides</Link></li>
            </ul>
          </li>
        </ul>

        {/* CENTER LOGO */}
        <Link to="/" className="navbar__logo">
          Bhavana <em>Clicks</em>
        </Link>

        {/* RIGHT SIDE */}
        <ul className="navbar__list navbar__list--right">
          <li className="navbar__item">
            <Link to="/about" className="navbar__link">ABOUT ME</Link>
          </li>
          <li className="navbar__item">
            <Link to="/contact" className="navbar__link">CONTACT</Link>
          </li>
        </ul>

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
          <span onClick={() => goTo("/weddings")}>Weddings</span>
          <span onClick={() => goTo("/couples")}>Couples</span>
          <span onClick={() => goTo("/pricing")}>Pricing</span>
          <span onClick={() => goTo("/elopement-guides")}>Elopement Guides</span>
          <span onClick={() => goTo("/about")}>About Me</span>
          <span onClick={() => goTo("/contact")}>Contact</span>
        </div>
      )}
    </nav>
  );
}