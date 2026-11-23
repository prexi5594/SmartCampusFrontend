import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ExploreCampusPage from "./pages/ExploreCampusPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import facilities from "./data/facilities";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(query) {
    setSearchQuery(query);
    setCurrentPage("explore");
  }

  const filteredFacilities = facilities.filter((facility) =>
    `${facility.name} ${facility.category} ${facility.location}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  function navigateTo(page) {
    setSearchQuery("");
    setCurrentPage(page);
  }

  function renderPage() {
    switch (currentPage) {
      case "explore":
        return <ExploreCampusPage facilities={filteredFacilities} />;

      case "about":
        return <AboutPage />;

      case "contact":
        return <ContactPage />;

      case "home":
      default:
        return (
          <HomePage
            facilities={facilities}
            onSearch={handleSearch}
            onExplore={() => navigateTo("explore")}
          />
        );
    }
  }

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      <main>{renderPage()}</main>

      <Footer />
    </div>
  );
}

export default App;