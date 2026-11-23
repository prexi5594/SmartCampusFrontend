
import { useState } from "react";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="simple-page contact-page">
      <span className="eyebrow">GET IN TOUCH</span>

      <h1>Contact Us</h1>

      <p>Have a question or suggestion? Send us a message.</p>

      <section className="security-support-card" aria-labelledby="security-support-title">
        <div>
          <h2 id="security-support-title">Lost or need help on campus?</h2>
          <p>Call campus security for assistance.</p>
          <strong>+254 768 015 640</strong>
        </div>
        <a
          className="security-call-button"
          href="tel:+254768015640"
          aria-label="Call campus security at +254 768 015 640"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 4h3l2 5-2 1.5a15 15 0 0 0 5.5 5.5L15 14l5 2v3c0 1.1-.9 2-2 2C10.3 21 3 13.7 3 5c0-1.1.9-2 2-2Z" />
          </svg>
          Call Campus Security
        </a>
      </section>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="message">Your message</label>
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write your message..."
          required
        />

        <button type="submit" className="primary-button">
          Send Message
        </button>

        {submitted && (
          <p className="route-message">
            Thank you, {name}! Your message has been recorded in this demo.
          </p>
        )}
      </form>
    </main>
  );
}

export default ContactPage;
