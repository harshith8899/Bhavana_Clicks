import "./About.css";
import useAboutAnimations from "./useAboutAnimations";
import { useEffect, useState } from "react";
import { getImages } from "../../services/getImages";

function About() {

  useAboutAnimations();

  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    async function loadImages() {
      const data = await getImages();
      const map = {};

      data.forEach((img) => {
        map[img.position] = img.imageUrl;
      });

      setImageMap(map);
    }

    loadImages();
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
              imageMap.topImage
                ? { backgroundImage: `url(${imageMap.topImage})` }
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
                  <img
                    src={imageMap.aboutImage || ""}
                    alt="About"
                    className="about-image"
                  />
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
                imageMap.bottomBg
                  ? { backgroundImage: `url(${imageMap.bottomBg})` }
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

            {/* ── Full-width overlay image ── */}
            <div className="overlay-image-wrapper">
              <img
                src={imageMap.overlay || ""}
                alt=""
                className="overlay-image"
              />
            </div>

            {/* ── Photo grid — all 7 images from Cloudinary ── */}
            <div className="photo-grid">

              <div
                className="photo-item photo-from-top"
                id="ptop1"
              >
                <img src={imageMap.gallery1 || ""} alt="" />
              </div>

              <div
                className="photo-item photo-from-bottom"
                id="pbot1"
              >
                <img src={imageMap.gallery2 || ""} alt="" />
              </div>

              <div
                className="photo-item photo-from-top"
                id="ptop2"
              >
                <img src={imageMap.gallery3 || ""} alt="" />
              </div>

              <div
                className="photo-item photo-from-bottom"
                id="pbot2"
              >
                <img src={imageMap.gallery4 || ""} alt="" />
              </div>

              <div
                className="photo-item photo-from-bottom"
                id="pbot3"
              >
                <img src={imageMap.gallery5 || ""} alt="" />
              </div>

              <div
                className="photo-item photo-from-top"
                id="ptop3"
              >
                <img src={imageMap.gallery6 || ""} alt="" />
              </div>

              <div
                className="photo-item photo-from-bottom"
                id="pbot4"
              >
                <img src={imageMap.gallery7 || ""} alt="" />
              </div>

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
