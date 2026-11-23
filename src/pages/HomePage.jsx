import HeroSection from "../components/HeroSection";
import CampusMap from "../components/CampusMap";
import FacilityGrid from "../components/FacilityGrid";

function HomePage({
  facilities,
  onSearch,
  onExplore,
  onViewLocation,
  onPlaceSelect,
}) {
  return (
    <>
      <HeroSection onSearch={onSearch} onExplore={onExplore} />

      <section className="section-container">
        <div className="section-heading">
          <div>
            <h2>Get to know your campus</h2>
          </div>
        </div>

        <CampusMap onPlaceSelect={onPlaceSelect} />
      </section>

      <section className="section-container facilities-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EVERYDAY DESTINATIONS</span>
            <h2>Everything you need,<br />right where you need it.</h2>
            <p>From your first lecture to your favourite lunch spot, find your place on campus.</p>
          </div>
        </div>

        <FacilityGrid
          facilities={facilities}
          onViewLocation={onViewLocation}
        />
      </section>

      <section className="help-section">
        <div>
          <h2>A little less searching.<br />A lot more campus.</h2>
          <p>Built for first days, everyday journeys and everything in between. Smart Campus Navigator helps students, staff and visitors feel right at home.</p>
        </div>
        <aside className="support-card">
          <strong>Need a hand finding your way?</strong>
          <p>Visit the welcome desk at USIU Gate A for campus information and accessible route guidance.</p>
          <a href="mailto:campus@example.edu">Contact campus support ↗</a>
        </aside>
      </section>
    </>
  );
}

export default HomePage;