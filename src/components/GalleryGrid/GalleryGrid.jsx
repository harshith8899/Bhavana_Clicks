import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./GalleryGrid.css";

// Replace with your real posts
const POSTS = [
  { id: 1, image: "/images/post-1.jpg", location: "Coorg Forest Elopement", names: "Meera & Arjun", slug: "/gallery/meera-arjun" },
  { id: 2, image: "/images/post-2.jpg", location: "Goa Beach Wedding", names: "Diya & Karthik", slug: "/gallery/diya-karthik" },
  { id: 3, image: "/images/post-3.jpg", location: "Nandi Hills Engagement", names: "Sneha & Vikram", slug: "/gallery/sneha-vikram" },
  { id: 4, image: "/images/post-4.jpg", location: "Udaipur Palace Wedding", names: "Ananya & Rohan", slug: "/gallery/ananya-rohan" },
  { id: 5, image: "/images/post-5.jpg", location: "Kerala Backwaters Elopement", names: "Priya & Aditya", slug: "/gallery/priya-aditya" },
  { id: 6, image: "/images/post-6.jpg", location: "Chikmagalur Coffee Estate", names: "Kavya & Nikhil", slug: "/gallery/kavya-nikhil" },
  { id: 7, image: "/images/post-7.jpg", location: "Jaipur Fort Sangeet", names: "Isha & Rahul", slug: "/gallery/isha-rahul" },
  { id: 8, image: "/images/post-8.jpg", location: "Alibaug Sunset Vows", names: "Riya & Aryan", slug: "/gallery/riya-aryan" },
];

const MOBILE_BREAKPOINT = 900;

// Walk up from an element to find whichever ancestor is the real scroll container.
// Falls back to `window` if nothing scrollable is found (the normal case).
function findScrollParent(el) {
  let node = el?.parentElement;
  while (node && node !== document.body) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    const canScroll = (overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight;
    if (canScroll) return node;
    node = node.parentElement;
  }
  return window; // default: the page itself scrolls
}

export default function GalleryGrid() {
  const fadeRefs = useRef([]);
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null); // tall spacer, provides the scroll distance
  const trackRef = useRef(null);   // the row of cards, gets translateX

  const [progress, setProgress] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_BREAKPOINT : false
  );

  // fade-up on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    fadeRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  // scroll-driven horizontal movement
  useEffect(() => {
  const wrapper = wrapperRef.current;
  const track = trackRef.current;
  const section = sectionRef.current;
  if (!wrapper || !track || !section) return;

  const scrollParent = findScrollParent(wrapper);
  let rafId = null;
  let localMax = 0;
  let startY = 0;

  function measure() {
    const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
    setIsMobile(mobile);

    if (mobile) {
      wrapper.style.height = "auto";
      section.style.minHeight = "auto";
      setMaxTranslate(0);
      return;
    }

    const trackWidth = track.scrollWidth;
    const viewportWidth = Math.max(track.parentElement?.clientWidth ?? window.innerWidth - 96, 1);
    localMax = Math.max(trackWidth - viewportWidth + 96, 0);
    setMaxTranslate(localMax);

    // scroll room needed = 1 viewport (to bring it into place) + horizontal distance to travel
    const spacerHeight = window.innerHeight + localMax;
    wrapper.style.height = `${spacerHeight}px`;
    section.style.minHeight = `${spacerHeight}px`;
    startY = wrapper.getBoundingClientRect().top + window.scrollY;
  }

  function update() {
    rafId = null;
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      setProgress(0);
      setIsLocked(false);
      return;
    }

    const scrollY = window.scrollY;
    const raw = (scrollY - startY) / Math.max(localMax, 1);
    const progressValue = Math.min(Math.max(raw, 0), 1);

    setProgress(progressValue);
    setIsLocked(progressValue > 0 && progressValue < 1);
  }

  function onScroll() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(update);
  }

  measure();
  const t = window.setTimeout(measure, 300);
  update();

  scrollParent.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);

  return () => {
    clearTimeout(t);
    if (rafId) cancelAnimationFrame(rafId);
    scrollParent.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", measure);
    window.removeEventListener("load", measure);
  };
}, []);

  return (
    <section className="gallery-grid" id="featured" ref={sectionRef}>
      <div className="gallery-grid__header fade-up" ref={(el) => (fadeRefs.current[0] = el)}>
        <span className="section-kicker">featured</span>
        <h2 className="gallery-grid__title">Posts</h2>
      </div>

      <div className="gallery-grid__pin-wrapper" ref={wrapperRef}>
        <div className={`gallery-grid__pin ${isMobile ? "gallery-grid__pin--static" : "gallery-grid__pin--active"} ${isLocked ? "gallery-grid__pin--locked" : ""}`}>
          <div
            className="gallery-grid__track"
            ref={trackRef}
            style={isMobile ? undefined : { transform: `translateX(-${progress * maxTranslate}px)` }}
          >
            {POSTS.map((post, i) => (
              <Link
                to={post.slug}
                key={post.id}
                className="gallery-grid__card fade-up"
                ref={(el) => (fadeRefs.current[i + 1] = el)}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="gallery-grid__img-wrap">
                  <img src={post.image} alt={post.names} />
                </div>
                <div className="gallery-grid__caption">
                  <p className="gallery-grid__location">{post.location}</p>
                  <p className="gallery-grid__names">{post.names}</p>
                  <span className="gallery-grid__view">View Post →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}