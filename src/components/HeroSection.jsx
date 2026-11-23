import SearchBar from "./SearchBar";

function HeroSection({ onSearch, onExplore }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span>A smarter way to explore</span>
        </div>

        <h1>
          Find Your Way
          <span>Around Campus.</span>
        </h1>

        <p>
          Explore your campus with ease. Find the Science Center, laboratories,
          libraries and other facilities in just a few clicks.
        </p>

        <SearchBar onSearch={onSearch} onExplore={onExplore} />

        <div className="popular-searches">
          <span>Popular:</span>
          <button onClick={() => onSearch("Library")}>Library</button>
          <button onClick={() => onSearch("Science Center")}>Science Center</button>
        </div>
      </div>

    </section>
  );
}

export default HeroSection;