import { useState } from "react";
import { Link } from "react-router-dom";
import "./Pricing.css";

const FAQS = [
  { id: 1, q: "Where are you based and do you travel?", a: "I'm based in Bengaluru, Karnataka, and I'm always down to travel! I've shot weddings across India — from Coorg to Kerala, Goa to the Himalayas. Wherever your love story takes you, I'll be there." },
  { id: 2, q: "Do we have to do a long hike to get great photos?", a: "Absolutely not! An adventure shoot doesn't have to mean trekking miles through the wilderness. I know plenty of gorgeous spots, both well known and hidden gems. Whether you envision eloping in the mountains or in the backyard of your family home, I'll capture every emotion." },
  { id: 3, q: "What if we're awkward in front of the camera?", a: "Nobody knows what to do in front of a camera — and that's where the magic comes in. I'm not here to capture stiff forced poses. I'm here to create real moments with you so we can capture FEELINGS. I'll direct you every step of the way and you won't even notice the camera." },
  { id: 4, q: "When will we receive our photos?", a: "You'll receive a sneak peek within 1 week of your wedding day. Your full gallery of beautifully edited images will be delivered within 6–8 weeks via an online gallery where you can download, share, and order prints." },
  { id: 5, q: "How do I officially book you?", a: "Once we've chatted and confirmed the date, I'll send a contract and invoice for the deposit to get you officially on the calendar. It's as simple as that!" },
];

const PACKAGES = [
  {
    id: 1,
    image: "/images/pricing-1.jpg",
    title: "Karnataka Weddings & Elopements",
    sub: "Customized Packages Available",
    features: ["Full day coverage anywhere in Karnataka", "100+ page elopement resource guide", "Custom vendor recommendation guide", "Lodging recommendations", "Unlimited communication", "Timeline crafting guidance", "Location scouting"],
    price: "₹45,000",
  },
  {
    id: 2,
    image: "/images/pricing-2.jpg",
    title: "All India Weddings & Elopements",
    sub: "Customized Packages Available",
    features: ["Full day coverage anywhere in India", "100+ page elopement resource guide", "Custom vendor recommendation guide", "Lodging recommendations", "Unlimited communication", "Timeline crafting guidance", "Travel fee included"],
    price: "₹85,000",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className="pp">

      {/* HERO */}
      <div className="pp__hero">
        <img src="/images/pricing-hero.jpg" alt="Pricing" />
        <div className="pp__hero-overlay" />
        <div className="pp__hero-text">
          <h1 className="pp__hero-title">pricing &</h1>
          <p className="pp__hero-sub">frequently asked questions</p>
        </div>
      </div>

      {/* INTRO */}
      <div className="pp__intro">
        <p>OKAY FRIENDS. SO YOU'VE LOOKED OVER MY PAGE, YOU'VE DECIDED YOU LIKE MY PHOTOGRAPHY STYLE, AND YOU WANT TO KNOW EXACTLY WHAT YOU'RE GETTING YOURSELF INTO. LET'S GET DOWN TO THE NITTY GRITTIES. WE'LL TALK PRICING AND WHAT YOU CAN EXPECT FROM ME. SOUND GOOD? LET'S DO THIS.</p>
      </div>

      {/* WHAT TO EXPECT */}
      <div className="pp__expect">
        <div className="pp__expect-text">
          <h2 className="pp__expect-title">What To Expect</h2>
          <p>I am passionate about elopements. I fully believe that the smallest weddings can be the best ones, and so I specialize in elopements and intimate weddings. Whether it's running off to Coorg or saying your vows at that gorgeous lake by your house, I would love to capture the intimacy, emotion, and happiness of your day.</p>
          <p>I'm not here to capture stiff forced poses. I'm here to create real moments so we can capture FEELINGS. I pinky promise to make our time together as easy and fun as possible.</p>
          <Link to="/contact" className="pp__btn">Let's Talk</Link>
        </div>
        <div className="pp__expect-img">
          <img src="/images/pricing-expect.jpg" alt="What to expect" />
        </div>
      </div>

      {/* FAQ */}
      <div className="pp__faq">
        <div className="pp__faq-marquee">
          <span>QUESTIONS & ANSWERS &nbsp;&nbsp;&nbsp;&nbsp; QUESTIONS & ANSWERS &nbsp;&nbsp;&nbsp;&nbsp; QUESTIONS & ANSWERS &nbsp;&nbsp;&nbsp;&nbsp; QUESTIONS & ANSWERS &nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div className="pp__faq-list">
          {FAQS.map(faq => (
            <div key={faq.id} className={`pp__faq-item ${openFaq === faq.id ? "open" : ""}`}>
              <button className="pp__faq-q" onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}>
                <span className="pp__faq-num">{String(faq.id).padStart(2, "0")}</span>
                <span className="pp__faq-qtext">{faq.q}</span>
                <span className="pp__faq-icon">{openFaq === faq.id ? "−" : "+"}</span>
              </button>
              {openFaq === faq.id && <p className="pp__faq-a">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* THE PROCESS */}
      <div className="pp__process">
        <h2 className="pp__process-title">The Process</h2>
        <div className="pp__process-grid">
          <div className="pp__process-step">
            <span className="pp__process-num">01</span>
            <p>CHECK OUT MY PRICING BELOW AND REACH OUT THROUGH MY CONTACT PAGE. WE'LL CHAT AND MAKE SURE WE'RE A GOOD FIT.</p>
          </div>
          <div className="pp__process-step">
            <span className="pp__process-num">02</span>
            <p>ONCE WE'VE NAILED DOWN A DATE AND LOCATION, I'LL SEND A CONTRACT AND DEPOSIT INVOICE TO GET YOU ON THE CALENDAR!</p>
          </div>
          <div className="pp__process-step">
            <span className="pp__process-num">03</span>
            <p>WE MAKE YOUR BIG DAY HAPPEN! YOU'LL GO HOME WITH GREAT MEMORIES AND PERFECTLY EDITED PHOTOS. LIFE IS GOOD.</p>
          </div>
        </div>
        <Link to="/contact" className="pp__btn">I'm So Ready</Link>
      </div>

      {/* PACKAGES */}
      <div className="pp__packages">
        <h2 className="pp__packages-title">Investment</h2>
        {PACKAGES.map((pkg, i) => (
          <div key={pkg.id} className={`pp__package ${i % 2 !== 0 ? "pp__package--reverse" : ""}`}>
            <div className="pp__package-img">
              <img src={pkg.image} alt={pkg.title} />
            </div>
            <div className="pp__package-body">
              <h3 className="pp__package-title">{pkg.title}</h3>
              <p className="pp__package-sub">{pkg.sub}</p>
              <ul className="pp__package-list">
                {pkg.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <p className="pp__package-from">Starting at:</p>
              <p className="pp__package-price">{pkg.price}</p>
              <Link to="/contact" className="pp__btn">Contact</Link>
            </div>
          </div>
        ))}
      </div>

      {/* A LA CARTE */}
      <div className="pp__alacarte">
        <h2 className="pp__alacarte-title">A La Carte</h2>
        <div className="pp__alacarte-grid">
          <div className="pp__alacarte-item">
            <h3>Engagements</h3>
            <p>Get all dressed up and do photos somewhere beautiful before or after the wedding day!</p>
            <p className="pp__alacarte-price">Starting at ₹8,000</p>
          </div>
          <div className="pp__alacarte-item">
            <h3>Portraits</h3>
            <p>Senior photos, professional headshots, personal branding portraits — you name it!</p>
            <p className="pp__alacarte-price">Starting at ₹6,000</p>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="pp__cta">
        <Link to="/weddings" className="pp__cta-item">
          <img src="/images/cta-weddings.jpg" alt="Weddings" />
          <div className="pp__cta-overlay" />
          <div className="pp__cta-text"><p>Portfolio</p><span>Weddings</span></div>
        </Link>
        <Link to="/contact" className="pp__cta-item">
          <img src="/images/cta-contact.jpg" alt="Contact" />
          <div className="pp__cta-overlay" />
          <div className="pp__cta-text"><p>Let's Talk</p><span>Contact</span></div>
        </Link>
        <Link to="/about" className="pp__cta-item">
          <img src="/images/cta-about.jpg" alt="About" />
          <div className="pp__cta-overlay" />
          <div className="pp__cta-text"><p>Get to Know</p><span>About Me</span></div>
        </Link>
      </div>

    </main>
  );
}