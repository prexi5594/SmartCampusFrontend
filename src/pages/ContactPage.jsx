
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
