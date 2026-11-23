
import { useState } from "react";

import CampusMap from "../components/CampusMap";
import ExploreSidebar from "../components/ExploreSidebar";
import FacilityGrid from "../components/FacilityGrid";
import RoutePlanner from "../components/RoutePlanner";

function ExploreCampusPage({ facilities }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFacilities =
    selectedCategory === "All"
      ? facilities
      : facilities.filter(
          (facility) => facility.category === selectedCategory
        );

  return (
    <main className="page-container">
      <div className="page-heading">
        <span className="eyebrow">CAMPUS DIRECTORY</span>

        <h1>Explore Campus</h1>

        <p>
          Discover facilities and plan where you want to go.
        </p>
      </div>

      <CampusMap />

      <div className="explore-layout">
        <ExploreSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <section className="explore-results">
          <h2>{selectedCategory} Facilities</h2>

          <FacilityGrid facilities={filteredFacilities} />
        </section>
      </div>

      <RoutePlanner facilities={facilities} />
    </main>
  );
}

export default ExploreCampusPage;
