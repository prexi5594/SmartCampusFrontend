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
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);

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
    setSelectedFacilityId(null);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }

  function handleViewLocation(facility) {
    handlePlaceSelect(facility.routeId);
  }

  function handlePlaceSelect(placeId) {
    setSearchQuery("");
    setSelectedFacilityId(placeId);
    setCurrentPage("explore");
  }

  function renderPage() {
    switch (currentPage) {
      case "explore":
        return (
          <ExploreCampusPage
            facilities={filteredFacilities}
            routeFacilities={facilities}
            selectedFacilityId={selectedFacilityId}
          />
        );

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
            onViewLocation={handleViewLocation}
            onPlaceSelect={handlePlaceSelect}
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