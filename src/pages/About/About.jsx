import "./About.css";
import useAboutAnimations from "./useAboutAnimations";
import { useEffect, useState } from "react";
import {
  getWebsiteImagesBySection,
  buildResponsiveImageUrl,
  buildSrcSet,
} from "../../services/mediaService";

// Small helper so JSX below can just do url(topImage) / srcSet(aboutImage, ...)
// instead of repeating the optional-chaining + fallback dance at every call site.
function urlFor(imageMap, position, transform) {
  const entry = imageMap[position];
  if (!entry?.imageUrl) return null;
  return buildResponsiveImageUrl(entry.imageUrl, transform);
}

function srcSetFor(imageMap, position, widths) {
  const entry = imageMap[position];
  if (!entry?.imageUrl) return undefined;
  return buildSrcSet(entry.imageUrl, widths);
}

function altFor(imageMap, position, fallback) {
  return imageMap[position]?.altText || fallback;
}

// Original ids/animation-direction classes preserved exactly as they were
// (photo-from-top / photo-from-bottom + #ptop1 etc.) so the existing
// scroll-animation CSS/JS in useAboutAnimations keeps working unchanged.
const GALLERY_TILES = [
  { position: "gallery1", id: "ptop1", direction: "top" },
  { position: "gallery2", id: "pbot1", direction: "bottom" },
  { position: "gallery3", id: "ptop2", direction: "top" },
  { position: "gallery4", id: "pbot2", direction: "bottom" },
  { position: "gallery5", id: "pbot3", direction: "bottom" },
  { position: "gallery6", id: "ptop3", direction: "top" },
  { position: "gallery7", id: "pbot4", direction: "bottom" },
];

function About() {

  useAboutAnimations();

  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      const map = await getWebsiteImagesBySection("about");
      if (!cancelled) setImageMap(map);
    }

    loadImages();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="intro-screen">
        <div className="intro-logo" id="introLogo">
          BHAVANA
        </div>
      </div>

      <div className="paper">

        <header>

          <div className="logo-container">
            <div className="logo">
              BHAVANA
            </div>
          </div>

          <nav>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Gallery</a>
            <a href="#">Resources</a>
            <a href="#">Shop</a>
            <a href="#">Contact</a>
          </nav>

        </header>

        <section className="split-wrapper">

          {/* ── Top hero image ── pulled from Cloudinary via Firestore */}
          <div
            className="top-image"
            style={
              urlFor(imageMap, "topImage", { width: 1920, crop: "fill", gravity: "auto" })
                ? { backgroundImage: `url(${urlFor(imageMap, "topImage", { width: 1920, crop: "fill", gravity: "auto" })})` }
                : {}
            }
          ></div>

          <div className="about-section">

            <div className="about-container">

              <div className="about-content-wrapper">

                <h2 className="about-title">
                  ABOUT ME
                </h2>

                <div className="about-image-wrapper">
                  {/* ── Portrait / about image ── */}
                  {urlFor(imageMap, "aboutImage", { width: 340 }) ? (
                    <img
                      src={urlFor(imageMap, "aboutImage", { width: 340 })}
                      srcSet={srcSetFor(imageMap, "aboutImage", [170, 340, 500])}
                      sizes="(max-width: 768px) 140px, 170px"
                      alt={altFor(imageMap, "aboutImage", "About")}
                      className="about-image"
                    />
                  ) : (
                    <div className="about-image about-image--empty" aria-hidden="true" />
                  )}
                </div>

              </div>

              <div className="about-paragraphs">
                <p>
                  As a photographer and creative director,
                  I combine technical expertise with visual storytelling.As a photographer and creative director,
                  I combine technical expertise with visual storytelling.
                </p>
              </div>

            </div>

          </div>

          <div
            className="bottom-section"
            id="bottomSection"
          >

            {/* ── Parallax background image ── */}
            <div
              className="bottom-bg"
              id="bottomBg"
              style={
                urlFor(imageMap, "bottomBg", { width: 1920, crop: "fill", gravity: "auto" })
                  ? { backgroundImage: `url(${urlFor(imageMap, "bottomBg", { width: 1920, crop: "fill", gravity: "auto" })})` }
                  : {}
              }
            ></div>

            <div className="parallax-text-layer">
              <div
                className="parallax-text"
                id="parallaxText"
              >
                <span>RESULT WORKS</span>
              </div>
            </div>

            {/* ── Full-width overlay image ──
                This layer sits (via z-index) directly above the photo
                grid below, so when there's no overlay image it must
                render nothing at all rather than an opaque placeholder —
                an opaque fallback here would hide the whole grid behind it. */}
            <div className="overlay-image-wrapper">
              {urlFor(imageMap, "overlay", { width: 1600 }) && (
                <img
                  src={urlFor(imageMap, "overlay", { width: 1600 })}
                  srcSet={srcSetFor(imageMap, "overlay", [640, 1024, 1600, 1920])}
                  sizes="100vw"
                  alt={altFor(imageMap, "overlay", "")}
                  className="overlay-image"
                />
              )}
            </div>

            {/* ── Photo grid — all 7 images from Cloudinary ── */}
            <div className="photo-grid">
              {GALLERY_TILES.map(({ position, id, direction }) => {
                const src = urlFor(imageMap, position, { width: 640 });
                return (
                  <div key={position} className={`photo-item photo-from-${direction}`} id={id}>
                    {src ? (
                      <img
                        src={src}
                        srcSet={srcSetFor(imageMap, position, [320, 480, 640, 960])}
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        alt={altFor(imageMap, position, "")}
                      />
                    ) : (
                      <div className="photo-item__empty" aria-hidden="true" />
                    )}
                  </div>
                );
              })}
            </div>

          </div>


          <section className="experience-section">

            <div className="experience-container">

              <div className="experience-heading">
                EXPERIENCE
              </div>

              <div className="experience-content">

                <div className="experience-item">

                  <div className="year">
                    2020 - Present
                  </div>

                  <div className="details">
                    <h3>Creative Photographer</h3>
                    <p>
                      Creating visual stories through portrait,
                      fashion and editorial photography.
                    </p>
                  </div>

                </div>

                <div className="experience-item">

                  <div className="year">
                    2018 - 2020
                  </div>

                  <div className="details">
                    <h3>Freelance Photographer</h3>
                    <p>
                      Worked with brands and individuals
                      to create premium visual content.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </section>

        </section>

      </div>
    </>
  );
}

export default About;
