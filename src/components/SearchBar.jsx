import { useState } from "react";

function SearchBar({ onSearch, onExplore }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (query.trim()) {
      onSearch(query.trim());
    } else {
      onExplore();
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label className="search-input-wrap">
        <span className="search-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 5 5" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Where would you like to go?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <button className="explore-submit" type="submit">
        Explore Campus <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

export default SearchBar;