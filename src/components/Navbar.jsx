
import { useState } from "react";

function Navbar({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function navigate(page) {
    setMenuOpen(false);
    onNavigate(page);
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <button className="brand" onClick={() => navigate("home")} aria-label="Go to home">
          <span className="brand-icon" aria-hidden="true">
            <img src="/campus-logo.svg" alt="" />
          </span>
          <span>
            <strong>Smart Campus</strong>
            <small>NAVIGATOR</small>
          </span>
        </button>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button
            className={`nav-link ${currentPage === "home" ? "active" : ""}`}
            onClick={() => navigate("home")}
          >
            Home
          </button>

          <button
            className={`nav-link ${currentPage === "explore" ? "active" : ""}`}
            onClick={() => navigate("explore")}
          >
            Explore Campus
          </button>

          <button
            className={`nav-link ${currentPage === "about" ? "active" : ""}`}
            onClick={() => navigate("about")}
          >
            About
          </button>

          <button
            className={`nav-link ${currentPage === "contact" ? "active" : ""}`}
            onClick={() => navigate("contact")}
          >
            Contact
          </button>
        </div>

        <button
          className="nav-button"
          onClick={() => onNavigate("explore")}
        >
          Open campus map <span aria-hidden="true">→</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
