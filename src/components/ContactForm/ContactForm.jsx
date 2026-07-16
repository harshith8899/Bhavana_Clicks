import { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", event: "", package: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-form__success">
        <span className="contact-form__success-icon">✦</span>
        <h3>Thank you, {form.name}!</h3>
        <p>
          I've received your enquiry and will get back to you within 24 hours.
          <br />
          In the meantime, follow along on{" "}
          <a href="https://instagram.com/bhavana.clicks" target="_blank" rel="noreferrer">
            @bhavana.clicks
          </a>
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__grid">
        <div className="contact-form__group">
          <label>Your Name *</label>
          <input name="name" placeholder="Priya Sharma" value={form.name} onChange={handleChange} required />
        </div>
        <div className="contact-form__group">
          <label>Email Address *</label>
          <input name="email" type="email" placeholder="priya@email.com" value={form.email} onChange={handleChange} required />
        </div>
        <div className="contact-form__group">
          <label>Phone Number</label>
          <input name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
        </div>
        <div className="contact-form__group">
          <label>Event Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="contact-form__group">
          <label>Event Type</label>
          <select name="event" value={form.event} onChange={handleChange}>
            <option value="">Select type</option>
            <option>Wedding Ceremony</option>
            <option>Engagement / Ring Ceremony</option>
            <option>Pre-Wedding Shoot</option>
            <option>Reception</option>
            <option>Elopement</option>
            <option>Other Event</option>
          </select>
        </div>
        <div className="contact-form__group">
          <label>Package Interest</label>
          <select name="package" value={form.package} onChange={handleChange}>
            <option value="">Select a package</option>
            <option>Elopement – ₹35,000</option>
            <option>Intimate Wedding – ₹75,000</option>
            <option>Destination – Custom</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>
      <div className="contact-form__group contact-form__group--full">
        <label>Tell Me About Your Day</label>
        <textarea
          name="message"
          rows={5}
          placeholder="Share your vision, venue, style, and anything else I should know..."
          value={form.message}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn--solid contact-form__submit">
        Send Enquiry ✦
      </button>
      <p className="contact-form__whatsapp">
        Or WhatsApp directly:{" "}
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
          +91 98765 43210
        </a>
      </p>
    </form>
  );
}
