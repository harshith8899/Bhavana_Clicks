import ContactForm from "../../components/ContactForm/ContactForm";
import "./Contact.css";

export default function Contact() {
  return (
    <main className="contact-page">
      <div className="contact-page__hero">
        <img src="/images/contact-bg.jpg" alt="Contact Bhavana Clicks" />
        <div className="contact-page__hero-overlay" />
        <div className="contact-page__hero-text">
          <span>Let's Connect</span>
          <h1>Get In Touch</h1>
        </div>
      </div>

      <div className="contact-page__body">
        <div className="contact-page__intro">
          <p className="section-kicker">Say Hello</p>
          <h2 className="contact-page__title">
            Let's make something <em>beautiful</em>
          </h2>
          <p className="contact-page__desc">
            Tell me about your day, your vision, and your love story. I'd
            love to hear from you and can't wait to chat about how we can
            create something magical together.
          </p>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
