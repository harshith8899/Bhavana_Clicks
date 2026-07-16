import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer__logo">
        Bhavana <em>Clicks</em>
      </div>

      <p className="footer__inclusive">
        LGBTQ-friendly | BIPOC Inclusive | All skin colors & body sizes are welcomed
      </p>

      <p className="footer__studio">
        Bhavana Clicks | Intimate Wedding + Elopement + Engagement Photographer
        <br />Karnataka & Worldwide
      </p>

      <Link to="/contact" className="footer__contact">
        Contact Me
      </Link>

      <p className="footer__copy">
        @{new Date().getFullYear()} Bhavana Clicks
      </p>

      <div className="footer__social">
        <a href="https://instagram.com/bhavana.clicks" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
          </svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.138-1.867 3.138-4.562 0-2.387-1.715-4.057-4.163-4.057-2.836 0-4.498 2.126-4.498 4.322 0 .856.33 1.772.741 2.273a.3.3 0 0 1 .069.284c-.076.315-.245.995-.278 1.134-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
          </svg>
        </a>
      </div>

    </footer>
  );
}